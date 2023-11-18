from pydantic import BaseModel

class SCat(BaseModel):
    name: str
    id: int

class SItem(BaseModel):
    description: str
    price: float
    name: str
    id: int
    category_id: int
    image:str
    
class SItemCatalog(BaseModel):
    id: int
    count: int
    size_id: int
    name: str
    image: str
    category_id: int
    