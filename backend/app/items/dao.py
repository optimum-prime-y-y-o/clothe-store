import os
from app.dao.base import BaseDao
from .models import Items, Categories
from app.database import async_session_maker
from sqlalchemy import insert, select, update

class CategoryDAO(BaseDao):
    model = Categories

class ItemDAO(BaseDao):
    model = Items

    async def upload(name, description, price:float, category_id, image):
        async with async_session_maker() as session:
            print(image)

            query = insert(Items).values(
                name=name,
                description=description,
                price = price,
                category_id =category_id,
                image=image,
            )
            
            result = await session.execute(query)
            await session.commit()
            return result
        
    @classmethod
    async def update_by_id(cls, item_data):
        async with async_session_maker() as session:
            query = select(cls.model).filter_by(id=item_data.id)
            result = await session.execute(query)
            row = result.scalar()

            if row:
                update_query = update(cls.model).where(cls.model.id == item_data.id).values(
                    id = item_data.id,
                    category_id = item_data.category_id,
                    name = item_data.name,
                    description = item_data.description,
                    price = item_data.price,
                    image = item_data.image
                )

                await session.execute(update_query)
            await session.commit()
    
        
    async def upload_with_image(name, description, price:float, category_id, image):
        async with async_session_maker() as session:
            print(image)
            image_data = image.file.read()

            query = insert(Items).values(
                name=name,
                description=description,
                price = price,
                category_id =category_id,
                image=image.filename,
            )
            
            result = await session.execute(query)
            await session.commit()

            directory = "uploaded_images"
            if not os.path.exists(directory):
                os.makedirs(directory)

            with open(f"uploaded_images/{image.filename}.jpg", 'wb') as f:
                f.write(image_data)

            return result
        
