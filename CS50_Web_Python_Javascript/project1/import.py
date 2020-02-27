import os

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from datetime import datetime
import csv

#conn = psycopg2.connect(dbname=mydb, user=username, password=password)
#engine = create_engine(os.getenv("DATABASE_URL"))
engine = create_engine("postgresql://mydb")
db = scoped_session(sessionmaker(bind=engine))


db.execute("CREATE TABLE users (id SERIAL PRIMARY KEY, username VARCHAR NOT NULL, hash VARCHAR NOT NULL)")

db.execute("CREATE TABLE books(title VARCHAR NOT NULL, author VARCHAR NOT NULL, year INTEGER NOT NULL, isbn VARCHAR UNIQUE NOT NULL, review_count INTEGER, average_score NUMERIC)")

db.execute("CREATE TABLE reviews(user_id INTEGER NOT NULL, book_isbn VARCHAR NOT NULL, rates INTEGER NOT NULL, review VARCHAR, recorded date NOT NULL DEFAULT CURRENT_DATE)")

db.execute("CREATE TABLE QAs( user_id INTEGER NOT NULL, book_isbn VARCHAR NOT NULL, qa_question VARCHAR NOT NULL, recorded date NOT NULL DEFAULT CURRENT_DATE)")

db.execute("CREATE TABLE responses(user_id INTEGER NOT NULL, book_isbn VARCHAR NOT NULL, qa_id VARCHAR NOT NULL, response VARCHAR NOT NULL, recorded date NOT NULL DEFAULT CURRENT_DATE)")

# make something where user can ask about the book and get answer from other

db.execute("CREATE TABLE stores(book_isbn VARCHAR NOT NULL, store_name VARCHAR NOT NULL, store_link VARCHAR NOT NULL)")


f = open("books.csv")
reader = csv.reader(f)
for isbn, title, author, year in reader:
    db.execute("INSERT INTO books (title, author, year, isbn) VALUES(?, ?, ?, ?)",
               title, author, year, isbn)
    db.commit()
