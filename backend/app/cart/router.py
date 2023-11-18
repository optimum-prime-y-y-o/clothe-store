
from fastapi import APIRouter, Depends, Request
from app.cart.schemas import SOrder

from app.cart.service import OrderDao, OrderItemsDao
from datetime import datetime

router = APIRouter(
    prefix="/cart",
    tags=["Корзина & Заказы"],
)

@router.post("/buy")
async def buy_cart(
    request: Request,
    items: SOrder, 
    ):

    order_id = await OrderDao.add(
        Pnumber=items.phoneNumber,
        address=items.address,
        email=items.email,
        date = datetime.now()
    )

    order_items = items.order_data
    for product in order_items:
        result = await OrderItemsDao.add(
            orders_id = order_id,
            item_id = product.id,
            count = product.quantity,
            sum_price = product.price,
            size = product.size,
        )
        # result2 = await ItemDAO.update_count(product)

    return {"buy": True}
