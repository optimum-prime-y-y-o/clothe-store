from app.database import async_session_maker
from sqlalchemy import delete, insert, select, update

class BaseDao:
    model = None

    @classmethod
    async def find_by_id(cls, model_id:int):
        async with async_session_maker() as session:
            query = select(cls.model).filter_by(id=model_id)
            result = await session.execute(query)
            return result.scalar_one_or_none()

    @classmethod
    async def find_one_or_none(cls, **filter_by):
        async with async_session_maker() as session:
            query = select(cls.model).filter_by(**filter_by)
            result = await session.execute(query)
            return result.scalar_one_or_none()

    @classmethod
    async def find_all(cls, **filter_by):
        async with async_session_maker() as session:
            query = select(cls.model).filter_by(**filter_by)
            result = await session.execute(query)
            return result.scalars().all()
        
    @classmethod
    async def add(cls, **data):
        async with async_session_maker() as session:
            query = insert(cls.model).values(**data)
            result = await session.execute(query)
            await session.commit()
            # print(result.scalar())
            return result.inserted_primary_key[0]
        
    @classmethod
    async def delete_by_id(cls, model_id:int):
        async with async_session_maker() as session:

            # print(model_id)
            query =  delete(cls.model).where(cls.model.id == model_id)
            result = await session.execute(query)
            await session.commit()
            # print(result)
            return result
        
    # @classmethod
    # async def update_by_id(cls, model_id:int, item_data):
    #     async with async_session_maker() as session:
    #         query = select(cls.model).filter_by(id=model_id)
    #         result = await session.execute(query)
    #         row = result.scalar()

    #         if row:
    #             update_query = update(cls.model).where(cls.model.id == model_id).values(
    #                 #значения
    #             )

    #             await session.execute(update_query)
    #         await session.commit()

            # # print(model_id)
            # query =  select(cls.model).\
            #     filter(cls.model.id == model_id).\
            #     update({'no_of_logins': item_data}).\
            #     # where(cls.model.id == model_id)
            # result = await session.execute(query)
            # await session.commit()
            # print(result)
            return result  