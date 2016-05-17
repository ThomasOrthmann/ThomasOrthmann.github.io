var margin ={top:20, right:30, bottom:30, left:40},
var width=960-margin.left - margin.right, 
var height=300-margin.top-margin.bottom;

var dataset=[];

d3.json("json/collisionQueensPerYear.json", function(data) {
  for (var i = 0, l=data.length, k=0, j=0; i <l; i++) {
          dataset.push([]);
          dataset[k].push(data[i]["Month"]);
          dataset[k].push(data[i]["Occurrence"]); 
          k++;
  };
  function getMaxOfArray(numArray) {
      return Math.max.apply(null, numArray);
  }
  var maxCollision=getMaxOfArray(dataset);
