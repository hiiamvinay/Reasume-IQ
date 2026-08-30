from dotenv import load_dotenv
from sqlalchemy import create_engine, text
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)

with engine.connect() as connection:
    result = connection.execute(text("SELECT 1"))
    print(result.scalar())

print("Database connection successful!")