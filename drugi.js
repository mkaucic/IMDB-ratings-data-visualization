function secondChart()
{
    // set the dimensions of the canvas
var margin = {top: 20, right: 20, bottom: 70, left: 400},
width = 1024 - margin.left - margin.right,
height = 300 - margin.top - margin.bottom;


// set the ranges
var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);

// define the axis
var xAxis = d3.svg.axis()
.scale(x)
.orient("bottom")

var yAxis = d3.svg.axis()
.scale(y)
.orient("left")
.ticks(10);

var body = d3.select("body");

// add the SVG element
var svg = d3.select("body").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", 
      "translate(" + margin.left + "," + margin.top + ")");

var tooltip = body.append("div")
          .attr("class", "tooltip")
          .classed("hidden", true);

// load the data
d3.json("movies-broj.json", function(error, data) {

data.forEach(function(d) {
    d.ocjena = d.ocjena;
    d.broj_filmova = +d.broj_filmova;
});

// scale the range of the data
x.domain(data.map(function(d) { return d.ocjena; }));
y.domain([0, d3.max(data, function(d) { return d.broj_filmova; })]);

// add axis
svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis)
.selectAll("text")
  .style("text-anchor", "end")
  .attr("dx", "-.8em")
  .attr("dy", "1em");

svg.append("g")
  .attr("class", "y axis")
  .call(yAxis)
.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 5)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .text("Number of movies")
  


// Add bar chart
svg.selectAll("bar")
  .data(data)
.enter().append("rect")
  .attr("class", "bar")
  .attr("x", function(d) { return x(d.ocjena); })
  .attr("width", x.rangeBand())
  .attr("y", function(d) { return y(d.broj_filmova); })
  .attr("height", function(d) { return height - y(d.broj_filmova); })
  .on("mousemove", function(d){
    tooltip
      .attr("style", "left:" + (d3.event.pageX) + "px;top:" + d3.event.pageY + "px;")
      .style("display", "inline-block")
      .html("Number of movies: " + (d.broj_filmova) + "<br>" + "Average IMDB rating: " + (d.imdb_rating));
    })
  .on("mouseout", function(d){ tooltip.style("display", "none");});
    });
}