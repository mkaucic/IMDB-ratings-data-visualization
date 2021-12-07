<!DOCTYPE html>
<html>
  <head>
      <link rel="shortcut icon" href="#" />
      <meta charset="utf-8">
      <title>Data Visualization Project</title>
      <link rel="stylesheet" href="styles.css">
      <script src="prvi.js"></script>
      <script src="drugi.js"></script>
      <script src="treci.js"></script>
      <script src="cetvrti.js"></script>
      <script src="https://d3js.org/d3.v3.min.js"></script>
      <script src="force-chart.js"></script>
  </head>
  <body>
  
     <h1 class="col-xs-8 text-center">IMDB ratings</h1>

     <p style="text-align:center" id="graph1_title">IMDB movie ratings in relation to their genre and budget</p>
    <div id="prvi_graf">
     
     <script>
       firstGraph();
     </script>
     </div>

     <div id="drugi_graf">
      <p style="text-align:center" id="graph2_title">My IMDB ratings</p>
      <script>
        secondChart();
      </script>
     </div>
     <div class="row">
      <div class="column">
        <p style="text-align:center">Number of movies by MPAA category</p>
        <script>
          thirdChart();
        </script>
      </div>
      <div class="column">
        <p style="text-align:center">Number of movies by genre</p>
        <script>
          fourthChart();
        </script>
      </div>
    </div>
     
  </body>
</html>