from fastapi import APIRouter, Request 
from app.items.schemas import SItem, SCat
from app.items.dao import ItemDAO, CategoryDAO

router = APIRouter(
    prefix="/catalog",
    tags=["Товары"],
)

@router.get("")
async def get_catalog(
    request: Request, 
    ) -> list[SItem]:

    temp = await ItemDAO.find_all()
    return temp

@router.get("/{product_id}")
async def get_item(
    product_id: int,
    ) -> SItem:

    return await ItemDAO.find_one_or_none(id=product_id)

@router.get("/get_categories/")
async def get_item() -> list[SCat]:
    temp = await CategoryDAO.find_all()
    return temp

@router.post("/upload/")
async def upload_product(
    name: str,
    description: str,
    price: float,
    category_id: int,
    image: str,
):
    '''
    добавить новый товар
    '''
    await ItemDAO.upload(name, description, price, category_id, image)

@router.post("/delete/{product_id}")
async def delete_product(
    product_id:int,
):
    '''
    удалить товар
    '''
    await ItemDAO.delete_by_id(product_id)

@router.post("/update")
async def update_product(
    product:SItem,
):
    '''
    обновить данные по существующему товару
    '''
    await ItemDAO.update_by_id(product)