"""initialises postgres db"""

import logging
import os
from typing import Annotated
from fastapi import Depends
from sqlmodel import Session, SQLModel, create_engine

# pylint: disable=unused-import
from tmc.models.user import User

_logger = logging.getLogger(__name__)

DB_NAME = "tmc"


def db_url():
    """get postgres connection url with development defaults"""
    user = os.getenv("POSTGRES_USER", "postgres")
    password = os.getenv("POSTGRES_PASSWORD", "postgresP")
    port = os.getenv("POSTGRES_PORT", "5432")
    return f"postgresql://{user}:{password}@localhost:{port}/{DB_NAME}"


engine = create_engine(db_url())


def init_db() -> None:
    """initialize database with configured tables"""
    _logger.info("initialising database and tables")
    SQLModel.metadata.create_all(engine)


def get_session():
    """get db session"""
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]
