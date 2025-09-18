# User Management

A simple app to view, add and delete users.

## Usage

### tl;dr
Run `docker-compose up -d` from the project root to start all containers, then head to http://localhost:5173/ and start playing around.

### Components

#### Backend

A FastAPI web server running on `localhost:8000` providing a basic API for getting, creating and (soft) deleting users.

It uses [uv](https://docs.astral.sh/uv/) for package management because it is great.

Spool it up then see http://localhost:8000/docs for API details.

#### Frontend

React frontend powered by Vite running on `localhost:5173`.

#### Postgres

Containerised postgres database running on `localhost:5432`.

## Local/dev setup
Run the handy script at `scripts/dev-setup.sh` to set up local venv for the backend. It also sets up some slightly clunky pre-commit hooks; they're not everyone's cup of tea but I like them.

Once everything is installed you can run the frontend and backend directly (without using Docker):
- start the postgres container with `docker-compose up -d postgres` from the project root
- if you don't already have `uv` installed on your system you'll need to activate the backend venv with `source ./backend/.venv/bin/activate`
- with `backend` as your working directory, start the backend with `uv run fastapi dev src/tmc/main.py`
- in a new terminal with the `frontend` as your working directory, run `npm run dev`

### Unit tests

#### Backend

The backend tests use Pytest and an in-memory SQLite database to not interfere with users you've created in Postgres.

Run `uv run pytest` from `backend`.

#### Frontend

The frontend tests use Jest, simply run `npm test` from `frontend`.
