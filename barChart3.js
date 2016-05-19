var margin ={top:20, right:30, bottom:30, left:40},
    width=960-margin.left - margin.right, 
    height=300-margin.top-margin.bottom;

                var datasetTop=[];
                var datasetBottom=[];
                var dataset;

                d3.json("json/collisionPerZip.json", function(data) {
                    for (var i = data.length-1, j=0; i >=data.length-41; i--) {
                              datasetTop.push([]);
                              datasetTop[j].push(data[i]["Zipcode"]);
                              datasetTop[j].push(data[i]["Occurrence"]);
                              j++;
                                                    
                    };
                    for (var i = 40, j=0; i >=0; i--) {
                              datasetBottom.push([]);
                              datasetBottom[j].push(data[i]["Zipcode"]);
                              datasetBottom[j].push(data[i]["Occurrence"]);
                              j++;
                    };

                    dataset=datasetTop;

                    function getMaxOfArray(numArray) {
                        return Math.max.apply(null, numArray);
                    }

                    var maxCollision=getMaxOfArray(dataset);

                    var x = d3.scale.ordinal()
                                    .domain(dataset.map(function(d){ return d[0]; }))
                                    .rangeRoundBands([0, width], .1);

                    var y = d3.scale.linear()
                                    .domain([0, d3.max(dataset, function(d) { return d[1]; })])
                                    .range([height, 0]);

                    var barHeight = d3.scale.linear()
                                         .domain([0, d3.max(dataset, function(d) { return d[1]; })])
                                         .range([1, height]);

                    //Define X axis
                    var xAxis = d3.svg.axis()
                                      .scale(x)
                                      .orient("bottom");

                    //Define Y axis
                    var yAxis = d3.svg.axis()
                                      .scale(y)
                                      .orient("left");

                    //Create SVG element
                    var chart = d3.select("#chart3")  
                                  .append("svg")  //append svg element inside #chart
                                  .attr("width", width+(2*margin.left)+margin.right)    //set width
                                  .attr("height", height+margin.top+margin.bottom);

                    var bar = chart.selectAll("g")
                                    .data(dataset)
                                    .enter()
                                    .append("g")
                                    .attr("transform", function(d, i){
                                      return "translate("+x(d[0])+", 0)";});
                                    
                    //Create circles
                    bar.append("rect")
                        .attr("y", function(d) { 
                          return y(d[1]); 
                        })
                        .attr("x", function(d,i){
                          return 40;
                        })
                        .attr("height", function(d) { 
                          return barHeight(d[1]); 
                        })
                        .attr("width", x.rangeBand());

                    bar.append("text")
                        .attr("x", x.rangeBand()/2+45)
                        .attr("y", function(d) { return y(d[1]) + 2; })
                        .attr("dy", ".75em")
                        .text(function(d) { return d[1]; })
                        .style('fill', 'black');

                    chart.append("g")
                        .attr("class", "x axis")
                        .attr("transform", "translate("+margin.left+","+ height+")")        
                        .call(xAxis)
                        .selectAll("text")  
                            .style("text-anchor", "end")
                            .attr("dx", "-.8em")
                            .attr("dy", ".15em")
                            .attr("transform", "rotate(-65)" );

                    chart.append("g")
                        .attr("class", "y axis")
                        .attr("transform", "translate("+margin.left+",0)")
                        .call(yAxis)
                        .append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 6)
                        .attr("dy", ".71em")
                        .style("text-anchor", "end")
                        .text("Occurrence"); 

                    d3.select("#ButtonBottom")
                        .on("click", function() {
                            var dataset=datasetBottom;

                            x.domain(dataset.map(function(d){ return d[0]; }));

                            chart.select(".x.axis")
                                .call(xAxis)
                                .selectAll("text")  
                                    .style("text-anchor", "end")
                                    .attr("dx", "-.8em")
                                    .attr("dy", ".15em")
                                    .attr("transform", "rotate(-65)" );

                                    
                            //Update all bars
                            bar.select("rect")
                               .data(dataset)
                               .transition()
                               .duration(1000)
                               .attr("y", function(d) { 
                                  return y(d[1]); 
                                })
                                .attr("height", function(d) { 
                                  return barHeight(d[1]); 
                                });

                            bar.select("text")
                                   .data(dataset)
                                   .transition()   
                                   .duration(1000)
                                    .attr("y", function(d) { return y(d[1]) - 10; })
                                    .attr("dy", ".75em")
                                    .text(function(d) { return d[1]; })
                                    .style('fill', 'white'); 
                    }); 

                    d3.select("#ButtonTop")
                        .on("click", function() {
                            var dataset=datasetTop;

                            x.domain(dataset.map(function(d){ return d[0]; }));

                            chart.select(".x.axis")
                                .call(xAxis)
                                .selectAll("text")  
                                    .style("text-anchor", "end")
                                    .attr("dx", "-.8em")
                                    .attr("dy", ".15em")
                                    .attr("transform", "rotate(-65)" );
                                    
                            //Update all bars
                            bar.select("rect")
                               .data(dataset)
                               .transition()
                               .duration(1000)
                               .attr("y", function(d) { 
                                  return y(d[1]); 
                                })
                                .attr("height", function(d) { 
                                  return barHeight(d[1]); 
                                });

                            bar.select("text")
                                   .data(dataset)
                                   .transition()   
                                   .duration(1000)
                                    .attr("y", function(d) { return y(d[1]) + 2; })
                                    .attr("dy", ".75em")
                                    .text(function(d) { return d[1]; })
                                    .style('fill', 'black'); 
                    });                 

                    
                });