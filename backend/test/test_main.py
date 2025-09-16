"""tests for main.py"""


def test_ok(app):
    """test root pseudo-helthcheck url"""
    response = app.get("/")
    assert response.status_code == 200
    assert response.text == '"OK :)"'
