function fourthChart()
{
    var dataset = [
        {genre:"Action", value:42, imdb_rating: 7.2,  color:"#dfeb8f"},
        {genre:"Adventure", value:46, imdb_rating: 7.3, color:"#bfeb8f"},
        {genre:"Animation", value:15, imdb_rating: 7.9, color:"#9aeb8f"},
        {genre:"Biography", value:19, imdb_rating: 7.9, color:"#8febbb"},
        {genre:"Comedy", value:150, imdb_rating: 7.1, color:"#8febe0"},
        {genre:"Crime", value:74, imdb_rating: 7.6, color:"#8fe3eb"},
        {genre:"Documentary", value:2, imdb_rating: 8.4, color:"#8fd1eb"},
        {genre:"Drama", value:200, imdb_rating: 7.7, color:"#8fbeeb"},
        {genre:"Family", value:17, imdb_rating: 7.4, color:"#8fa7eb"},
        {genre:"Fantasy", value:31, imdb_rating: 7.5, color:"#8f90eb"},
        {genre:"History", value:9, imdb_rating: 7.9, color:"#aa8feb"},
        {genre:"Horror", value:34, imdb_rating: 6.9, color:"#bc8feb"},
        {genre:"Music", value:21, imdb_rating: 7.6, color:"#d88feb"},
        {genre:"Musical", value:8, imdb_rating: 7.4, color:"#e18feb"},
        {genre:"Mystery", value:57, imdb_rating: 7.5, color:"#eb8fe2"},
        {genre:"Romance", value:60, imdb_rating: 7.5, color:"#eb8fbd"},
        {genre:"Sci-Fi", value:45, imdb_rating: 7.4, color:"#eb8fab"},
        {genre:"Sport", value:7, imdb_rating: 7.1, color:"#eb8f9d"},
        {genre:"Thriller", value:92, imdb_rating: 7.5, color:"#eb8f8f"},
        {genre:"War", value:14, imdb_rating: 8.0, color:"#eba88f"},
        {genre:"Western", value:5, imdb_rating: 7.5, color:"#ebba8f"},
        ];

        var width = 750;
        var height = 500;
        var outerRadius = 200;
        var innerRadius = 100;

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
            .outerRadius(outerRadius);

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
              .html("Number of movies: " + (d.data.value)+ "<br>" + "Average IMDB rating: " + (d.data.imdb_rating));
            })
        .on("mouseout", function(d){ tooltip.style("display", "none");});
    
    g.append("text")
    .attr("transform", function(d) {
        d.outerRadius = outerRadius + 75;
        d.innerRadius = outerRadius + 75;
        return "translate(" + arc.centroid(d)+ ") ";})
        .style("text-anchor", "middle")
        .style("baseline-shift", "20px")
        .text(function(d) { return d.data.genre; });     
}