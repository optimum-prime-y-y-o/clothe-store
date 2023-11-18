from fastapi import FastAPI, Query
from typing import Optional
from datetime import date
from pydantic import BaseModel

from app.items.router import router as router_bookings
from app.cart.router import router as router_cart

from starlette.middleware.sessions import SessionMiddleware

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(router_bookings)
app.include_router(router_cart)

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# app.add_middleware(SessionMiddleware, secret_key="some-random-string", max_age=None)
