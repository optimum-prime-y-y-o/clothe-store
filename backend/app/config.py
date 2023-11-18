from typing import Literal
from pydantic_settings import BaseSettings
from pydantic import root_validator

#uvicorn app.main:app

class Settings(BaseSettings):
    MODE: Literal["DEV", "TEST"]

    DB_HOST: str
    DB_PORT: int
    DB_USER: str
    DB_PASS: str
    DB_NAME: str

    @root_validator(skip_on_failure=True)
    def get_databse_url(cls, v):
        v["DATABASE_URL"] = f"postgresql+asyncpg://{v['DB_USER']}:{v['DB_PASS']}@{v['DB_HOST']}:{v['DB_PORT']}/{v['DB_NAME']}"
        return v
    
    TEST_DB_HOST: str
    TEST_DB_PORT: int
    TEST_DB_USER: str
    TEST_DB_PASS: str
    TEST_DB_NAME: str


    # @root_validator(skip_on_failure=True)
    # def get_test_databse_url(cls, v):
    #     v["TEST_DATABASE_URL"] = f"postgresql+asyncpg://{v['TEST_DB_USER']}:{v['TEST_DB_PASS']}@{v['TEST_DB_HOST']}:{v['TEST_DB_PORT']}/{v['TEST_DB_NAME']}"
    #     return v
    
    SECRET_KEY: str
    ALGORITHM: str

    class Config:
        env_file = ".env"
        print(env_file)


settings = Settings()