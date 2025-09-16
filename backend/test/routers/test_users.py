"""tests for routers/users.py module"""

import json
import uuid
from fastapi.testclient import TestClient
from fastapi import status
from sqlmodel import Session, select

from tmc.models.user import User

NUM_PUBLIC_USER_KEYS = 4


class TestUsersRouter:
    """test user handlers"""

    def new_user_data(self):
        """get valid new user data"""
        return {
            "firstname": "Test",
            "lastname": "uSEr",
            "date_of_birth": "2001-02-03",
        }

    def test_get_all_users_none_created(self, app: TestClient):
        """test get all users when none exist"""
        response = app.get("/users")
        assert response.text == "[]"

    def test_get_all_users(self, app: TestClient):
        """test get all users"""

        num_users = 3

        for i in range(num_users):
            app.post(
                "/users/create",
                json={"user": {**self.new_user_data(), "firstname": f"user{i}"}},
            )

        response = app.get("/users")

        users = json.loads(response.text)
        assert len(users) == num_users
        assert [u["firstname"] for u in users] == ["user0", "user1", "user2"]

        for user in users:
            # check only contains above expected keys
            assert len(user) == NUM_PUBLIC_USER_KEYS

    def test_create_user_success(self, app: TestClient):
        """test create a user"""

        response = app.post("/users/create", json={"user": self.new_user_data()})

        assert response.status_code == 200

        new_user = json.loads(response.text)
        assert new_user["firstname"] == "Test"
        assert new_user["lastname"] == "uSEr"
        assert new_user["date_of_birth"] == "2001-02-03"
        assert uuid.UUID(new_user["id"]).version == 4

        # check only contains above expected keys
        assert len(new_user) == NUM_PUBLIC_USER_KEYS

    def test_create_user_fail_if_id_in_request(self, app: TestClient):
        """test create a user"""

        user_data = {
            **self.new_user_data(),
            "id": str(uuid.uuid4()),
        }

        response = app.post("/users/create", json={"user": user_data})

        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

        assert "extra_forbidden" in response.text
        assert user_data["id"] in response.text

    def test_delete_user(self, app: TestClient, session: Session):
        """test delete a user"""

        create_response = app.post("/users/create", json={"user": self.new_user_data()})

        assert create_response.status_code == 200
        assert len(session.exec(select(User)).all()) == 1

        new_user_id = json.loads(create_response.text)["id"]

        delete_response = app.delete(f"/user/{new_user_id}")

        assert delete_response.status_code == status.HTTP_204_NO_CONTENT
        assert not session.exec(select(User)).all()

    def test_delete_user_invalid_id_format(self, app: TestClient):
        """test delete a user"""

        response = app.delete("/user/123")

        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    def test_delete_user_unknown_id(self, app: TestClient):
        """test delete a user"""

        response = app.delete(f"/user/{uuid.uuid4()}")

        assert response.status_code == status.HTTP_204_NO_CONTENT
