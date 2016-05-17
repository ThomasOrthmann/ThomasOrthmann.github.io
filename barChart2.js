var margin ={top:20, right:30, bottom:30, left:40},
    width=960-margin.left - margin.right, 
    height=300-margin.top-margin.bottom;

                var datasetBronx=[];
                var datasetBrooklyn=[];
                var datasetQueens=[];
                var datasetManhattan=[];
                var datasetStatenIsland=[];
                var x;

                d3.json("json/collisionPerMonthPerBorough.json", function(data) {
                    for (var i = 0, l=data.length, j=0, k=0, m=0, n=0, p=0; i <l; i++) {
                        if (data[i]['Borough']=="Bronx") {
                            datasetBronx.push([]);
                            datasetBronx[j].push(data[i]["Month"]);
                            datasetBronx[j].push(data[i]["Occurrence"]); 
                            j++;
                        }
                        else if (data[i]['Borough']=="Manhattan") {
                            datasetManhattan.push([]);
                            datasetManhattan[k].push(data[i]["Month"]);
                            datasetManhattan[k].push(data[i]["Occurrence"]); 
                            k++; 
                        }
                        else if (data[i]['Borough']=="Queens") {
                            datasetQueens.push([]);
                            datasetQueens[m].push(data[i]["Month"]);
                            datasetQueens[m].push(data[i]["Occurrence"]); 
                            m++; 
                        }
                        else if (data[i]['Borough']=="Brooklyn") {
                            datasetBrooklyn.push([]);
                            datasetBrooklyn[n].push(data[i]["Month"]);
                            datasetBrooklyn[n].push(data[i]["Occurrence"]); 
                            n++; 
                        }
                        else if (data[i]['Borough']=="StatenIsland") {
                            datasetStatenIsland.push([]);
                            datasetStatenIsland[p].push(data[i]["Month"]);
                            datasetStatenIsland[p].push(data[i]["Occurrence"]); 
                            p++; 
                        };
                    };

                    xx=datasetQueens;

                    //var maxProstitution2003=Math.max(arrayProstitution2003);

                    function getMaxOfArray(numArray) {
                        return Math.max.apply(null, numArray);
                    }

                    var maxCollision=getMaxOfArray(datasetQueens);

                    var x = d3.scale.ordinal()
                                    .domain(datasetQueens.map(function(d){ return d[0]; }))
                                    .rangeRoundBands([0, width], .1);

                    var y = d3.scale.linear()
                                    .domain([0, d3.max(datasetQueens, function(d) { return d[1]; })])
                                    .range([height, 0]);

                    var barHeight = d3.scale.linear()
                                         .domain([0, d3.max(datasetQueens, function(d) { return d[1]; })])
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
                    var chart = d3.select("#chart")  
                                  .append("svg")  //append svg element inside #chart
                                  .attr("width", width+(2*margin.left)+margin.right)    //set width
                                  .attr("height", height+margin.top+margin.bottom);

                    var bar = chart.selectAll("g")
                                    .data(datasetQueens)
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
                          return x.rangeBand()+(margin.left/2);
                        })
                        .attr("height", function(d) { 
                          return barHeight(d[1]); 
                        })
                        .attr("width", x.rangeBand());

                    bar.append("text")
                        .attr("x", x.rangeBand()+margin.left-6 )
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

                    d3.select("#BronxButton")
                        .on("click", function() {

                            if (xx==datasetQueens){
                                dataset = datasetBronx;
                                xx=datasetBronx;
                            }    
                            else {
                                dataset = datasetQueens;
                                xx=datasetQueens;
                            }

                            //Update all bars
                            bar.selectAll("rect")
                               .data(dataset)
                               .transition()
                               .duration(1000)
                               .attr("y", function(d) { 
                                  return y(d[1]); 
                                })
                                .attr("x", function(d,i){
                                  return x.rangeBand()+(margin.left/2);
                                })
                                .attr("height", function(d) { 
                                  return barHeight(d[1]); 
                                })
                                .attr("width", x.rangeBand());

                            bar.selectAll("text")
                                   .data(dataset)
                                   .transition()   
                                   .duration(1000)
                                   .attr("x", x.rangeBand()+margin.left-6 )
                                    .attr("y", function(d) { return y(d[1]) + 2; })
                                    .attr("dy", ".75em")
                                    .text(function(d) { return d[1]; })
                                    .style('fill', 'black');

                        }); 
                    
                    
                });