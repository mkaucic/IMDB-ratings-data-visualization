function firstGraph()
{
    var margin = { top: 10, left: 100, bottom: 30, right: 50 },
           width = 1024 - margin.left - margin.right,
           height = 768 - margin.top - margin.bottom;
 
       var x = function(d) { return d.rating; },
           y = function(d) { return d.genre; },
           area = function(d) { return d.budget; };
 
       var xScale = d3.scale.linear()
             .domain([0, 10])
             .range([0, width]),
           yScale = d3.scale.ordinal()
             .domain(["Western","War","Thriller","Sport","Sci-Fi","Romance","Mystery","Musical","Music","Horror","History","Fantasy","Family","Drama","Documentary","Crime","Comedy","Biography","Animation","Adventure","Action"])
             .rangeBands([height, 0]),
           areaScale = d3.scale.linear().range([0, 125]),
           colorScale = d3.scale.quantize()
            .domain([0, 10])
            .range(["#AB879C","#928EAB","#6C97B0","#3E9EA7","#1BA38F",
                    "#37A46C","#62A145","#8D991C","#B98A00","#E07423"]);
 
       var xValue = function(d) { return xScale(x(d)); },
           yValue = function(d) { return yScale(y(d)) + yScale.rangeBand()/2; },
           rValue = function(d) {
             var A = areaScale(area(d));
             return Math.sqrt(A / Math.PI);
           },
           colorValue = function(d) { return colorScale(x(d)); };
 
       var xAxis = d3.svg.axis().scale(xScale).orient("bottom"),
           yAxis = d3.svg.axis().scale(yScale).orient("left");
 
       var dollarFormat = d3.format("$,");
       var thousandFormat = d3.format(",");
 
       var bubbleChart = d3.forceChart()
        .size([width, height])
        .x(xValue)
        .y(yValue)
        .r(rValue)
        .xGravity(3)    // make the x-position more accurate
        .yGravity(1/3); // ...and the y-position more flexible
 
        var body = d3.select("body");
 
        var svg = body.append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
        var tooltip = body.append("div")
          .attr("class", "tooltip")
          .classed("hidden", true);
 
       d3.json("movies_pravi.json", function(error, movies) {
         if (error) throw error;
 
         areaScale.domain([0,d3.max(movies, area)]);
 
         // Draw axes
         svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
          .append("text")
            .attr("dx", width)
            .attr("dy", -6)
            .style("text-anchor", "end")
            .text("IMDB Rating");
 
         svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
          .selectAll(".tick line")
            .attr("x2", width)
            .attr("stroke-dasharray", "1, 2")
            .style("stroke", "grey");
 
         // Draw legend
         svg.append("g").call(legend);
 
         // Draw bubbles
         svg.append("g").call(bubbleChart, movies)
            .attr("class", "bubbles")
          .selectAll(".node").append("circle")
            .attr("r", function(d) { return d.r0; })
            .attr("fill", colorValue)
            .attr("stroke", "grey")
            .on("mousemove", function(d){
            tooltip
              .attr("style", "left:" + (d3.event.pageX) + "px;top:" + d3.event.pageY + "px;")
              .style("display", "inline-block")
              .html("Title: " + (d.title) + "<br>" + "IMDB rating: " + (d.rating) + "<br>" + "My rating: " + (d.my_rating)  + "<br>" + "Number of votes: " + thousandFormat(d.votes) + "<br>" + "Mpaa: " + (d.mpaa) + "<br>" + "Budget: " + dollarFormat(d.budget));
        })
    		.on("mouseout", function(d){ tooltip.style("display", "none");});
       });
 
       function legend(selection) {
         var legendData = [
           { budget: 300000000, text: "$300 million", dy: 0 },
           { budget: 200000000, text: "$200 million", dy: 20 },
           { budget: 100000000, text: "$100 million", dy: 40 },
           { budget: 50000000, text: "$50 million", dy: 60 },
           { budget: 10000000, text: "$10 million", dy: 80 }
         ];
 
         var legend = selection
            .attr("class", "legend")
            .attr("transform", "translate(" + xScale(9.5) + "," + (height/2 - 30) + ")");
 
         legend.append("text")
          .attr("dx", -6)
          .attr("dy", -16)
          .text("Budget");
 
         legend.selectAll(".item").data(legendData)
          .enter().append("g")
            .attr("transform", function(d) { return "translate(0," + d.dy + ")"; })
            .each(function(d) {
              d3.select(this).append("circle")
                .attr("r", rValue(d))
                .style("fill", "none")
                .style("stroke", "slategrey");
              d3.select(this).append("text")
                .attr("dx", 10)
                .attr("dy", 4)
                .text(d.text);
            });
       }
}