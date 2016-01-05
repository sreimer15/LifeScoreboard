angular.module('userGraphController',[])
.controller('userGraphController', function($scope){

  console.log('userGraphController');

  $scope.addDataPoint = function(){
    var retrievedObject = localStorage.getItem('testing');
    var parsedObject = JSON.parse(retrievedObject);
    var userDate = parsedObject.date;
    var userHappiness = parsedObject.happiness;

    userDate.push($scope.entry.date);
    userHappiness.push($scope.entry.happiness);

    localStorage.setItem('testing', JSON.stringify(parsedObject));
    var logging = localStorage.getItem('testing');
    console.log('retrievedObject: ', JSON.parse(logging));

  }

  // $scope.reset = function() {
  //   var retrievedObject = localStorage.getItem('testing');
  //   var parsedObject = JSON.parse(retrievedObject);
  //   parsedObject.date = [];
  //   parsedObject.happiness = [];
  //   localStorage.setItem('testing', JSON.stringify(parsedObject));

  // }

  $scope.initialize = function(){


    var margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 270 - margin.top - margin.bottom;

    // Parse the date / time
    var parseDate = d3.time.format("%d-%b-%y").parse;
    


    // Set the ranges
    var x = d3.time.scale().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    // Define the axes
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(5);

    var yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(5);

    // Define the line
    var valueline = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.happiness); });
        
    // Adds the svg canvas

    var svg = d3.select("#userGraph")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", 
                  "translate(" + margin.left + "," + margin.top + ")");

    // Get the data

    var lineSvg = svg.append("g");

    var focus = svg.append("g") 
        .style("display", "none");



        // This need to be changed in order to be dynamic
    var retrievedObject = localStorage.getItem('testing');
    var parsedObject = JSON.parse(retrievedObject);
    var userDate = parsedObject.date;
    var userHappiness = parsedObject.happiness;

    var data = [];
    // at some point should sort the array
    for (var i = 0; i < userDate.length; i++){

      var currentObj = {};
      currentObj.date = Date.parse(userDate[i]);
      console.log(currentObj.date)
      currentObj.happiness = userHappiness[i];
      data.push(currentObj);
    }

        console.log(data[0].date);
        

      // Scale the range of the data
      x.domain(d3.extent(data, function(d) { return d.date; }));
      y.domain([0, d3.max(data, function(d) { return d.happiness; })]);

      // Add the valueline path.
      svg.append("path")
          .attr("class", "line")
          .attr("d", valueline(data));

      // Add the X Axis
      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      // Add the Y Axis
      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);


  // css doesn't work in stylesheet so we have to usejquery
      $('.line').css('stroke', 'steelblue');
      $('.line').css('stroke-width', '2');
      $('.line').css('fill', 'none');
  }

  $scope.initialize();

});  