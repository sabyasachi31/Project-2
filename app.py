import sqlalchemy
import json
from flask import Flask, render_template
from sqlalchemy import create_engine, func
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

#Route 2
@app.route("/heat.html")
def heat():
    return render_template("heat.html")

#Route 3
@app.route("/bubble.html")
def bubble():
    return render_template("bubble.html")

#Route 4
@app.route("/map.html")
def map():
    return render_template("map.html")


if __name__ == "__main__":
    app.run(debug=True)