import sqlalchemy
import json
from flask import Flask, jsonify, render_template
#from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
# from sqlalchemy.ext.automap import automap_base

# from sqlalchemy import Column, Integer, String, Float

# import numpy as np
import pandas as pd


#Flask Setup
app = Flask(__name__)

#Routes
@app.route("/")
def home():

    return render_template("index.html")

#Route 1
@app.route("/read_data")
def read_data():
    database_path = "Jupyter_Notebooks/restaurants.db"
    engine = create_engine(f"sqlite:///{database_path}")
    conn = engine.connect()
    data = pd.read_sql("SELECT * FROM restaurants", conn)

    x=data.to_json()
    return x

#List of stations
@app.route("/cuisine")
def cuisine():
    database_path = "Jupyter_Notebooks/bubble.db"
    engine = create_engine(f"sqlite:///{database_path}")
    conn = engine.connect()
    data = pd.read_sql("SELECT * FROM bubble_db", conn)

    x=data.to_json()
    return x


if __name__ == "__main__":
    app.run(debug=True)