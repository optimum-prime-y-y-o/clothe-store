from typing import Dict
from pydantic import BaseModel

class SItemBuy(BaseModel):
    id: int
    name: str
    price: float
    quantity: float
    size: str

class SOrder(BaseModel):
    phoneNumber: str
    email: str
    address: str
    order_data: list[SItemBuy]

