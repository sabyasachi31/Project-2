from flask import Flask, jsonify
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import sqlalchemy
import statistics as st
import numpy as np
import datetime as dt


#Database Setup
engine=create_engine("sqlite:///Jupyter_Notebooks/restaurants.db",connect_args={'check_same_thread': False})
Base=automap_base()
Base.prepare(engine,reflect=True)

#Add the tables
restaurants=Base.classes.restaurants

#Flask Setup
app = Flask(__name__)

session=Session(engine)


#Routes
@app.route("/")
def home():
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/route1<br/>"
        f"/api/v1.0/route2<br/>"

#Route 1
@app.route("/api/v1.0/route1")
def route1():

    prp_data=session.query(measurement.date, measurement.prcp).\
    filter(measurement.date >= x_date).all()
    dt_data={}
    
    for row in prp_data:
        dt_data[row.date]=row.prcp
  
    return jsonify()

#List of stations
@app.route("/api/v1.0/route2")
def route2():
    stns=session.query(station.station)
    stn_list=[]
    for stn in stns:
        stn_list.append(stn.station)
    
    return jsonify()


if __name__ == "__main__":
    app.run(debug=True)