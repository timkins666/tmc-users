"""common test setup"""

from fastapi.testclient import TestClient
import pytest
from sqlmodel import delete, Session

from tmc.db import get_session
from tmc.main import app
from tmc.models.user import User


@pytest.fixture(name="app", scope="session")
def _app():
    """test FastAPI app fixture"""
    return TestClient(app)


@pytest.fixture(name="session", scope="session")
def _session():
    """db session"""
    return next(get_session())


@pytest.fixture(autouse=True)
def pre_cleanup(session: Session):
    """delete any users in the db before each test"""
    session.exec(delete(User))
    session.commit()


def create_user(user: User):
    """create a user in the db"""
    session = next(get_session())
    session.add(user)
    session.commit()
    session.refresh(user)
    return user
