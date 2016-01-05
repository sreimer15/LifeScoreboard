angular.module('defaultPageController',[])
.controller('defaultPageController', function($scope){


var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.time.format("%d-%b-%y").parse;
var bisectDate = d3.bisector(function(d) { return d.date; }).left;


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
var svg = d3.select(".center-block")
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


d3.csv("data/mainPageSample.csv", function(error, data) {
    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.happiness = +d.happiness;
        d.keyEvent = d.keyEvent
    });

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


        // append the circle at the intersection 
  //   focus.append("circle")
  //       .attr("class", "y")
  //       .style("fill", "none")
  //       .style("stroke", "blue")
  //       .attr("r", 4);
    
  //   // append the rectangle to capture mouse
  //   svg.append("rect")
  //       .attr("width", width)
  //       .attr("height", height)
  //       .style("fill", "none")
  //       .style("pointer-events", "all")
  //       .on("mouseover", function() { focus.style("display", null); })
  //       .on("mouseout", function() { focus.style("display", "none"); })
  //       .on("mousemove", mousemove);

  //   function mousemove() {
  //   var x0 = x.invert(d3.mouse(this)[0]);
  //   // console.log(x0)
  //   var i = bisectDate(data, x0, 1);
  //   // console.log(i)
  //   console.log(i)
  //   var d1 = data[i];
  //   var d = x0 - d1

    
  //   console.log(data[i]);

  //   focus.select("circle.y")
  //       .attr("transform",
  //             "translate(" + x(d1.date) + "," +
  //                            y(d1.happiness) + ")");
  // }


// css doesn't work in stylesheet so we have to usejquery
    $('.line').css('stroke', 'steelblue');
    $('.line').css('stroke-width', '2');
    $('.line').css('fill', 'none');


});

})