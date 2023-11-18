from sqlalchemy import Column, Float, ForeignKey, Integer, String
from app.database import Base


class Items(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True)
    category_id = Column(ForeignKey("categories.id"))
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    image = Column(String)

class Categories(Base):
    __tablename__ = "categories"
    
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)





