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


  
var svg = d3.select("#scatter")
    .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);
  
var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("assets/data/data.csv").then(function(statesData) {

  console.log(statesData);



statesData.forEach(function(data) {
    data.age = +data.age;
    data.smokes = +data.smokes;
  });

  var xTimeScale = d3.scaleTime()
  .range([0, chartWidth])
  .domain(d3.extent(statesData, data => data.age));

// Configure a linear scale with a range between the chartHeight and 0
// Set the domain for the xLinearScale function
var yLinearScale = d3.scaleLinear()
  .range([chartHeight, 0])
  .domain([0, d3.max(statesData, data => data.smokes)]);

// Create two new functions passing the scales in as arguments
// These will be used to create the chart's axes
var bottomAxis = d3.axisBottom(xTimeScale);
var leftAxis = d3.axisLeft(yLinearScale);

// Configure a drawLine function which will use our scales to plot the line's points
var drawLine = d3
  .line()
  .x(data => xTimeScale(data.age))
  .y(data => yLinearScale(data.smokes));

// Append an SVG path and plot its points using the line function
chartGroup.append("path")
  // The drawLine function returns the instructions for creating the line for milesData
  .attr("d", drawLine(statesData))
  .classed("line", true);

// Append an SVG group element to the SVG area, create the left axis inside of it
chartGroup.append("g")
  .classed("axis", true)
  .call(leftAxis);

// Append an SVG group element to the SVG area, create the bottom axis inside of it
// Translate the bottom axis to the bottom of the page
chartGroup.append("g")
  .classed("axis", true)
  .attr("transform", "translate(0, " + chartHeight + ")")
  .call(bottomAxis);
}).catch(function(error) {

});

