"""user classes"""

from datetime import datetime, date
import uuid
from sqlmodel import Field, SQLModel


class UserBase(SQLModel):
    """common properties"""

    firstname: str = Field(min_length=1, max_length=100)
    lastname: str = Field(min_length=1, max_length=100)
    date_of_birth: date


class UserCreate(UserBase):
    """fields required to create a new user"""


class UserPublic(UserBase):
    """user data returned to client"""

    id: uuid.UUID

    @property
    def age(self):
        """returns user's age at current date using system time"""
        return (date.today() - self.date_of_birth).days // 365


class User(UserBase, table=True):
    """full User entity"""

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.now, primary_key=True)
