"""tests for main.py"""

from fastapi.testclient import TestClient


def test_ok(app: TestClient):
    """test root pseudo-helthcheck url"""
    response = app.get("/", timeout=1)
    assert response.status_code == 200
    assert response.text == '"OK :)"'
