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

  var xLinearScale = d3.scaleLinear()
  .range([0, chartWidth])
  .domain(d3.extent(statesData, data => data.age));

// Configure a linear scale with a range between the chartHeight and 0
// Set the domain for the xLinearScale function
var yLinearScale = d3.scaleLinear()
  .range([chartHeight, 0])
  .domain([0, d3.max(statesData, data => data.smokes)]);

// Create two new functions passing the scales in as arguments
// These will be used to create the chart's axes
var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);

// Configure a drawLine function which will use our scales to plot the line's points


chartGroup.append("g")
.attr("transform", `translate(0, ${chartHeight})`)
.call(bottomAxis);

chartGroup.append("g")
.call(leftAxis);

var circlesGroup = chartGroup.selectAll("circle")
.data(statesData)
.enter()
.append("circle")
.attr("cx", d => xLinearScale(d.age))
.attr("cy", d => yLinearScale(d.smokes))
.attr("r", "15")
.attr("fill", "pink")
.attr("opacity", ".5");

var toolTip = d3.tip()
.attr("class", "tooltip")
.offset([80, -60])
.html(function(d) {
  return (`${d.age}<br>Age: ${d.smokes}<br>Smoker:`);
});
chartGroup.call(toolTip);

circlesGroup.on("click", function(data) {
  toolTip.show(data, this);
})
  // onmouseout event
  .on("mouseout", function(data, index) {
    toolTip.hide(data);
  });
});

