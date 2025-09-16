"""common test setup"""

from fastapi.testclient import TestClient
import pytest

from tmc.main import app as app_


@pytest.fixture(scope="session")
def app():
    """test FastAPI app fixture"""
    return TestClient(app_)
