// set the dimensions and margins of the graph
var margin = {top: 80, right: 25, bottom: 30, left: 40},
  width = 450 - margin.left - margin.right,
  height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

//Connect to database not the CSV
// engine = create_engine("sqlite:///Jupyter_Notebooks/restaurants.db",connect_args={'check_same_thread': False}) 
// Base = automap_base()
// Base.prepare(engine,reflect=True)

//Add the tables
//restaurants=Base.classes.restaurants
//Read the data

d3.csv("Data/combo-michelin-restaurants-stars.csv", function(data) {
  // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
  // get variables from separate Pandas dataframe
  console.log(data)

  var myStars = d3.map(data, function(d){return d.Stars;}).keys()
  console.log(myStars)
  var myPrice = d3.map(data, function(d){return d.price;}).keys()
  console.log(myPrice)
  //var myRegion = d3.map(data, function(d){return d.region;}).keys()

  var StarPriceCount = d3.map(data, function(d){return d.price;}).keys()

  // Build X scales and axis:
  var xscale = d3.scaleBand()
    .range([ 0, width ])
    .domain(myStars)
    .padding(0.05);
  svg.append("g")
    .style("font-size", 15)
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSize(0))
    .select(".domain").remove()

  // Build Y scales and axis:
  var yscale = d3.scaleBand()
    .range([ height, 0 ])
    .domain(myPrice)
    .padding(0.05);
  svg.append("g")
    .style("font-size", 15)
    .call(d3.axisLeft(y).tickSize(0))
    .select(".domain").remove()

  // Build color scale
  var myColor = d3.scaleSequential()
    .interpolator(d3.interpolateInferno)
    .domain([1,100])


  // create a tooltip
  var tooltip = d3.select("#my_dataviz")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    tooltip
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  }
  var mousemove = function(d) {
    tooltip
      .html("Number of restaurants with combination of stars & price<br>: " + d.region)
      .style("left", (d3.mouse(this)[0]+70) + "px")
      .style("top", (d3.mouse(this)[1]) + "px")
  }
  var mouseleave = function(d) {
    tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8)
  }

  // add the squares
  svg.selectAll()
    .data(data, function(d) {return d.Stars+':'+d.price;})
    .enter()
    .append("rect")
      .attr("x", function(d) { return xscale(d.Stars) })
      .attr("y", function(d) { return yscale(d.price) })
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("width", xscale.bandwidth() )
      .attr("height", yscale.bandwidth() )
      .style("fill", function(d) { return myColor(d.StarPriceCount)} )
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
})


// Add title to graph
svg.append("text")
        .attr("x", 0)
        .attr("y", -50)
        .attr("text-anchor", "left")
        .style("font-size", "22px")
        .text("Heatmap using d3.js");

// Add subtitle to graph
svg.append("text")
        .attr("x", 0)
        .attr("y", -20)
        .attr("text-anchor", "left")
        .style("font-size", "14px")
        .style("fill", "grey")
        .style("max-width", 400)
        .text("Comparing price and Michelin stars within regions.");