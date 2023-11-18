from typing import Annotated
from fastapi import Path
from sqlalchemy import select
from app.cart.models import Order_items, Orders
from app.dao.base import BaseDao
from app.items.dao import ItemDAO
from datetime import datetime

secret_key='cart'

class OrderItemsDao(BaseDao):
    model = Order_items

class OrderDao(BaseDao):
    model = Orders
