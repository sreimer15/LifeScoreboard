angular.module('userGraphController',[])
.controller('userGraphController', function($scope, Authentication){

  console.log(Authentication.authStorage)
  
  $scope.addDataPoint = function(){
    var userkey = Authentication.authStorage.username;
    var retrievedObject = localStorage.getItem(userkey);
    var parsedObject = JSON.parse(retrievedObject);
    var userDate = parsedObject.date;
    var userHappiness = parsedObject.happiness;

    userDate.push($scope.entry.date);
    userHappiness.push($scope.entry.happiness);

    localStorage.setItem(userkey, JSON.stringify(parsedObject));


    alert('added!')

  }

  
  $scope.insertionSortArrayOnePriority = function(array,array2) {


  var sorted = false;

  while(!sorted){
    sorted = true;
    for (var i = 0; i < array.length; i++){
        if(array[i+1] <= array[i] ){
          var b = array[i+1];
          var c = array2[i+1]
          array[i+1] = array[i];
          array2[i+1] = array2[i];
          array[i] = b;
          array2[i] = c;
          sorted = false;
      }
    }
  }
   
    return [array,array2];
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
    var userkey = Authentication.authStorage.username;
    var retrievedObject = localStorage.getItem(userkey);

    var parsedObject = JSON.parse(retrievedObject);
    var userDate = parsedObject.date;
    var userHappiness = parsedObject.happiness;

    var data = [];
    // at some point should sort the array
    var tempArray = $scope.insertionSortArrayOnePriority(userDate,userHappiness);
    console.log('temparray is ', tempArray)
    var sortedDate = tempArray[0];
    var sortedHappiness = tempArray[1];

    console.log(sortedDate);
    console.log(sortedHappiness);

    // create data array with objects
    for (var i = 0; i < userDate.length; i++){
      var currentObj = {};
      
      currentObj.date = Date.parse(sortedDate[i]);
      currentObj.happiness = sortedHappiness[i];
    
      data.push(currentObj);
    }

        

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