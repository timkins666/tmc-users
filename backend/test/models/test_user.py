"""User class tests"""

from contextlib import nullcontext
from datetime import date
from unittest import mock
from tmc.models import user as sut
import pytest
from fastapi import HTTPException


class TestUserCreate:
    """Tests for UserCreate"""

    def test_validate_success(self):
        """validate with valid data"""
        user = sut.UserCreate(firstname="x", lastname="y", dateOfBirth=date(2000, 1, 1))

        assert sut.User.model_validate(user)

    @pytest.mark.parametrize(
        "dob, valid", [(date(1899, 12, 31), False), (date(1900, 1, 1), True)]
    )
    def test_validate_too_old(self, dob: date, valid: bool):
        """validate with dob before 1900"""
        user = sut.UserCreate(firstname="x", lastname="y", dateOfBirth=dob)

        with (
            pytest.raises(HTTPException, match=r"01/01/1900")
            if not valid
            else nullcontext()
        ):
            result = sut.User.model_validate(user)

        if valid:
            assert result.date_of_birth == dob

    @pytest.mark.parametrize(
        "birth_date, valid",
        [
            (1, True),
            (2, False),
        ],
    )
    @mock.patch.object(sut, "date")
    def test_validate_too_young(self, mock_date, birth_date: int, valid: bool):
        """validate with age < 16"""
        mock_date.today.return_value = date(2016, 1, 1)
        mock_date.side_effect = date

        user = sut.UserCreate(
            firstname="x", lastname="y", dateOfBirth=date(2000, 1, birth_date)
        )

        with (
            pytest.raises(HTTPException, match=r"at least 16")
            if not valid
            else nullcontext()
        ):
            result = sut.User.model_validate(user)

        if valid:
            assert result.date_of_birth == user.date_of_birth
