"""user http handlers"""

from typing import Annotated
import uuid
from fastapi import APIRouter, Body, Path

from tmc.models.user import UserPublic, UserCreate

router = APIRouter()


@router.get(
    "/users",
    response_model=list[UserPublic],
    summary="Return all users from the database",
)
async def get_all_users():
    """get all users"""
    raise NotImplementedError("Not implemented yet")


@router.post("/users/create", response_model=UserPublic, summary="Create a new user")
async def create_user(user: Annotated[UserCreate, Body(embed=True)]):
    """
    Create a user by supplying required fields in a `user` body property:
    - firstname
    - lastname
    - date_of_birth
    """
    raise NotImplementedError("Not implemented yet")


@router.delete("/user/{user_id}", summary="Delete the specified user id")
async def delete_user(
    user_id: Annotated[uuid.UUID, Path(title="The ID of the user to delete")],
):
    """deletes a user"""
    raise NotImplementedError("Not implemented yet")
