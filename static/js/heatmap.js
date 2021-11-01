// set the dimensions and margins of the graph
var margin = {top: 80, right: 100, bottom: 30, left: 100},
  width = 600 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


d3.csv("static/heat_data/PriceStar.csv")
  .then(function(data) {
  // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
  // get variables from separate Pandas dataframe
  console.log(data)

  var myStars = d3.map(data, function(d){return d.Stars;}).keys()
  console.log(myStars)
  var myPrice = d3.map(data, function(d){return d.price;}).keys()
  console.log(myPrice)
  var myCount = d3.map(data, function(d){return parseInt(d.Count);}).keys()
  console.log(myCount[0])
  var StarPriceCount = d3.map(data, function(d){return d.price;}).keys()

  // Build X scales and axis:
  var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(myStars)
    .padding(0.05);

  svg.append("g")
    .style("font-size", 15)
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSize(0))
    .select(".domain").remove()

  // Build Y scales and axis:
  var y = d3.scaleBand()
    .range([ height, 0 ])
    .domain(myPrice)
    .padding(0.05);

  svg.append("g")
    .style("font-size", 15)
    .call(d3.axisLeft(y).tickSize(0))
    .select(".domain").remove()

  // Build color scale
  // var myColor = d3.scaleSequential()
  //   .interpolator(d3.interpolateInferno)
  //   .domain([d3.min(myCount),d3.max(myCount)])

   var myColor = d3.scaleOrdinal()
        .domain(myCount)
        .range(
["#ffffe5","#fee89b","#fee79a","#fee698","#fece66","#fecd64","#fecc63","#fecb61","#fec95f","#fec85d","#fec75b","#fec65a","#fec558","#fec456","#fec355","#fec253","#fec051","#febf50","#febe4e","#febd4d","#febc4b","#feba4a","#feb948","#feb847","#feb746","#feb544","#feb443","#feb341","#feb240","#feb03f","#feaf3e","#feae3c","#feac3b","#fdab3a","#fdaa39","#fda938","#fda737","#fda635","#fda534","#c14904","#c04804","#be4704","#bd4604","#bb4504","#ba4504","#b84404","#b74304","#b54203","#b44103","#b24103","#b14003","#af3f03","#ae3e03","#ac3e03","#ab3d03","#a03804","#9e3704","#9c3704","#9b3604","#993604","#983504","#963404","#943404","#933304","#913304","#903204","#8e3104","#8c3104","#8b3005","#893005","#882f05","#862f05","#842e05","#832e05","#812d05","#802d05","#7e2c05","#7c2c05","#7b2b05","#792b05","#782a05","#762a05","#742905","#732905","#712806","#702806","#6e2706","#6c2706","#6b2606","#692606","#682506","#662506"]
        )

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
      .html(`Number of restaurants<br>with ${d.Stars} Stars & a Pricing Level of ${d.price} is ${d.Count}`)
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
      .attr("x", function(d) { return x(d.Stars) })
      .attr("y", function(d) { return y(d.price) })
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("width", x.bandwidth() )
      .attr("height", y.bandwidth() )
      .style("fill", function(d) { return myColor(d.Count)} )
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