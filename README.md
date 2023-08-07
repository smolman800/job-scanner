# Job Scanner

## _The Job Listing Everbody Deserves_

The purpose of this project is to provide a one stop solution for viewing job listings from 
multiple sites in one place instead of having to browse through multiple websites

## Backend

### Development Setup

#### Prerequisites
- [Python](https://github.com/pyenv/pyenv)
- Create a local copy of this Git repository (clone)

#### Setup
- Run `pip install -r backend/requirements.txt`
- Run `uvicorn backend.main:app --reload`
- Open http://localhost:8000/health/

#### Test
- Run `pytest`