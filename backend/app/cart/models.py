from sqlalchemy import Column, Date, Float, ForeignKey, Integer, String, DateTime
from app.database import Base

class Orders(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True)
    # users_id = Column(ForeignKey("users.id"))
    date = Column(DateTime)
    email = Column(String)
    address = Column(String)
    Pnumber = Column(String)

class Order_items(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True)
    orders_id = Column(ForeignKey("orders.id"))
    item_id = Column(ForeignKey("items.id"))
    count = Column(Integer, nullable=False)
    sum_price = Column(Float, nullable=False)
    size = Column(String)