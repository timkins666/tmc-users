"""user http handlers"""

from typing import Annotated
import uuid
from fastapi import APIRouter, Body, Path, status
from sqlmodel import select

from tmc.db import SessionDep
from tmc.models.user import User, UserCreate, UserPublic

router = APIRouter()


@router.get(
    "/users",
    response_model=list[UserPublic],
    summary="Return all users from the database",
)
async def get_all_users(session: SessionDep):
    """get all users"""
    return session.exec(select(User)).all()


@router.post("/users/create", response_model=UserPublic, summary="Create a new user")
async def create_user(
    user: Annotated[UserCreate, Body(embed=True)], session: SessionDep
):
    """
    Create a user
    """
    db_user = User.model_validate(user)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


@router.delete(
    "/user/{user_id}",
    summary="Delete the specified user id",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_user(
    user_id: Annotated[uuid.UUID, Path(title="The ID of the user to delete")],
    session: SessionDep,
):
    """deletes a user"""
    statement = select(User).where(User.id == user_id)
    results = session.exec(statement)
    user = results.first()

    if not user:
        return

    session.delete(user)
    session.commit()
