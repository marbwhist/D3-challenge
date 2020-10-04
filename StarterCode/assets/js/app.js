// @TODO: YOUR CODE HERE!
// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;


d3.csv("data.csv").then(function(data) {

    // Print the Data
    console.log(data);
  
var svg = d3.select(".chart")
    .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);
  

  Data.forEach(function(data) {
    data.age = +data.age;
    data.smokes = +data.smokes;
  });