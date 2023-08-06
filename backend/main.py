from datetime import datetime
from typing import List

from fastapi import FastAPI
from pydantic import BaseModel, HttpUrl

app = FastAPI()

class JobDTO(BaseModel):
    url: HttpUrl
    id: int
    vendor_id: int
    job_id: str
    page_url: HttpUrl
    salary_min: float
    salary_max: float
    currency: str
    job_title: str
    company: str
    post_date: datetime
    job_description: str
    job_requirements: str
    benefits: str
    industry: str

class JobListDTO(BaseModel):
    count: int
    next: HttpUrl
    previous: HttpUrl
    results: List[JobDTO]

@app.get("/jobs/", response_model=JobListDTO)
def list_jobs():
    return {
        "count": 1,
        "next": "http://localhost:8000/jobs/?page=2",
        "previous": None,
        "results": []
    }

@app.get("/jobs/{job_id}", response_model=JobDTO)
def retrieve_job(job_id: int):
    return {}
