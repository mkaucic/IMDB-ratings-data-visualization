function thirdChart()
{
    var dataset = [
        {mpaa:"R", value:537, imdb_rating: 7.6, color:"#8a659f"},
        {mpaa:"PG-13", value:432, imdb_rating: 7.2, color:"#e77c97"},
        {mpaa:"PG", value:165, imdb_rating: 7.5, color:"#fdb75e"},
        ];

    var width = 750;
    var height = 500;
    var radius = 200;

    var body = d3.select("body");

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var tooltip = body.append("div")
        .attr("class", "tooltip")
        .classed("hidden", true);

    var arc = d3.svg.arc()
            .outerRadius(radius)
            .innerRadius(100);

    var pie = d3.layout.pie()
            .sort(null)
            .value(function(d){ return d.value; });
            

    var g = svg.selectAll(".fan")
            .data(pie(dataset))
            .enter()
            .append("g")
            .attr("class", "fan")

    g.append("path")
        .attr("d", arc)
        .attr("fill", function(d){ return d.data.color; })
        .on("mousemove", function(d){
            tooltip
              .attr("style", "left:" + (d3.event.pageX) + "px;top:" + d3.event.pageY + "px;")
              .style("display", "inline-block")
              .html("Number of movies: " + (d.data.value) + "<br>" + "Average IMDB rating: " + (d.data.imdb_rating));
            })
        .on("mouseout", function(d){ tooltip.style("display", "none");});
    
    g.append("text")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
        .style("text-anchor", "middle")
        .text(function(d) { return d.data.mpaa; });
}