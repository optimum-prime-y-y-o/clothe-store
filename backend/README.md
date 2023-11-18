# Документация по Бэкенду (FastAPI)

![Схема базы данных](db.png)

### Структура проекта

```
backend/

|-- app/
|	|-- cart/
|	|-- tests/
|	|-- items/
|	|-- dao/
|	|-- users/
|   |-- config.py
|   |-- conftest.py
|   |-- database.py
|   |-- exceptions.py
|   |-- main.py
|-- requirements.txt
|-- pytest.ini
|-- alembic.ini
|-- README.md
```

### Установка зависимостей

Перед запуском, убедитесь, что зависимости установлены. В директории `backend`, выполните:

```bash
pip install -r requirements.txt
```

### Запуск

Для запуска используйте следующую команду:

```bash
uvicorn app.main:app --reload
```

API будет доступен по адресу [http://localhost:8000](http://localhost:8000).

### Использование API

API предоставляет ряд эндпоинтов, которые могут быть использованы фронтендом. Документация по API доступна в интерфейсе Swagger по адресу [http://localhost:8000/docs](http://localhost:8000/docs).