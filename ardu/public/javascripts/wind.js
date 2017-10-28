$(document).ready(function(){
	var now_wind_seconds = setInterval(function(){
		var wind = $.get("http://smartiot.iptime.org/sensor", function(data) {
					var splice = data.split(',');
					if(splice[3]=="N"){
						$("#line1").empty();
						var lineGraph = d3.select("#line1")
								.append("svg:svg")
								.attr("width", 100)
								.attr("height", 100);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 50)
								.attr("y1", 0)
								.attr("x2", 50)
								.attr("y2", 100)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 40)
								.attr("y1", 90)
								.attr("x2", 50)
								.attr("y2", 100)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 60)
								.attr("y1", 90)
								.attr("x2", 50)
								.attr("y2", 100)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 40)
								.attr("y1", 90)
								.attr("x2", 60)
								.attr("y2", 90)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						$("#line1").append("<p>풍속: "+splice[2]+"km/h</p><p>풍향: 북</p>");
					}else if(splice[3]=="NNE"){
						$("#line1").empty();
						var lineGraph = d3.select("#line1")
								.append("svg:svg")
								.attr("width", 100)
								.attr("height", 100);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 75)
								.attr("y1", 0)
								.attr("x2", 25)
								.attr("y2", 100)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 37)
								.attr("y1", 92.5)
								.attr("x2", 25)
								.attr("y2", 100)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 17.5)
								.attr("y1", 88)
								.attr("x2", 25)
								.attr("y2", 100)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 37) 
								.attr("y1", 92.5)
								.attr("x2", 17.5)
								.attr("y2", 88)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						$("#line1").append("<p>풍속: "+splice[2]+"km/h</p><p>풍향: 북북동</p>");
					}else if(splice[3]=="NE"){
						$("#line1").empty();
						var lineGraph = d3.select("#line1")
								.append("svg:svg")
								.attr("width", 100)
								.attr("height", 100);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 100)
								.attr("y1", 0)
								.attr("x2", 0)
								.attr("y2", 100)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 0)
								.attr("y1", 90)
								.attr("x2", 0)
								.attr("y2", 100)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 0)
								.attr("y1", 100)
								.attr("x2", 10)
								.attr("y2", 100)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 0)
								.attr("y1", 90)
								.attr("x2", 10)
								.attr("y2", 100)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						$("#line1").append("<p>풍속: "+splice[2]+"km/h</p><p>풍향: 북동</p>");
					}else if(splice[3]=="ENE"){
						$("#line1").empty();
						var lineGraph = d3.select("#line1")
								.append("svg:svg")
								.attr("width", 100)
								.attr("height", 100);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 100)
								.attr("y1", 25)
								.attr("x2", 0)
								.attr("y2", 75)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 12)
								.attr("y1", 82.5)
								.attr("x2", 0)
								.attr("y2", 75)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 7.5)
								.attr("y1", 63)
								.attr("x2", 0)
								.attr("y2", 75)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 12)
								.attr("y1", 82.5)
								.attr("x2", 7.5)
								.attr("y2", 63)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						$("#line1").append("<p>풍속: "+splice[2]+"km/h</p><p>풍향: 동북동</p>");
					}else if(splice[3]=="E"){
						$("#line1").empty();
						var lineGraph = d3.select("#line1")
								.append("svg:svg")
								.attr("width", 100)
								.attr("height", 100);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 100)
								.attr("y1", 50)
								.attr("x2", 0)
								.attr("y2", 50)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 10)
								.attr("y1", 60)
								.attr("x2", 0)
								.attr("y2", 50)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 10)
								.attr("y1", 40)
								.attr("x2", 0)
								.attr("y2", 50)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 10)
								.attr("y1", 40)
								.attr("x2", 10)
								.attr("y2", 60)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						$("#line1").append("<p>풍속: "+splice[2]+"km/h</p><p>풍향: 동</p>");
					}else if(splice[3]=="ESE"){
						$("#line1").empty();
						var lineGraph = d3.select("#line1")
								.append("svg:svg")
								.attr("width", 100)
								.attr("height", 100);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 100)
								.attr("y1", 75)
								.attr("x2", 0)
								.attr("y2", 25)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 7.5)
								.attr("y1", 37)
								.attr("x2", 0)
								.attr("y2", 25)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 12)
								.attr("y1", 17.5)
								.attr("x2", 0)
								.attr("y2", 25)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 7.5)
								.attr("y1", 37)
								.attr("x2", 12)
								.attr("y2", 25)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						$("#line1").append("<p>풍속: "+splice[2]+"km/h</p><p>풍향: 동남동</p>");
					}else if(splice[3]=="SE"){
						$("#line1").empty();
						var lineGraph = d3.select("#line1")
								.append("svg:svg")
								.attr("width", 100)
								.attr("height", 100);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 100)
								.attr("y1", 100)
								.attr("x2", 0)
								.attr("y2", 0)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 0)
								.attr("y1", 0)
								.attr("x2", 10)
								.attr("y2", 0)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 0)
								.attr("y1", 0)
								.attr("x2", 0)
								.attr("y2", 10)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 0)
								.attr("y1", 10)
								.attr("x2", 10)
								.attr("y2", 0)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						$("#line1").append("<p>풍속: "+splice[2]+"km/h</p><p>풍향: 남동</p>");
					}else if(splice[3]=="SSE"){
						$("#line1").empty();
						var lineGraph = d3.select("#line1")
								.append("svg:svg")
								.attr("width", 100)
								.attr("height", 100);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 75)
								.attr("y1", 100)
								.attr("x2", 25)
								.attr("y2", 0)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 37)
								.attr("y1", 7.5)
								.attr("x2", 25)
								.attr("y2", 0)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 17.5)
								.attr("y1", 12)
								.attr("x2", 25)
								.attr("y2", 0)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 37)
								.attr("y1", 7.5)
								.attr("x2", 17.5)
								.attr("y2", 12)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						$("#line1").append("<p>풍속: "+splice[2]+"km/h</p><p>풍향: 남남동</p>");
					}else if(splice[3]=="S"){
						$("#line1").empty();
						var lineGraph = d3.select("#line1")
								.append("svg:svg")
								.attr("width", 100)
								.attr("height", 100);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 50)
								.attr("y1", 0)
								.attr("x2", 50)
								.attr("y2", 100)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 40)
								.attr("y1", 10)
								.attr("x2", 50)
								.attr("y2", 0)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 60)
								.attr("y1", 10)
								.attr("x2", 50)
								.attr("y2", 0)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 40)
								.attr("y1", 10)
								.attr("x2", 60)
								.attr("y2", 10)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						$("#line1").append("<p>풍속: "+splice[2]+"km/h</p><p>풍향: 남</p>");
					}else if(splice[3]=="SSW"){
						$("#line1").empty();
						var lineGraph = d3.select("#line1")
								.append("svg:svg")
								.attr("width", 100)
								.attr("height", 100);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 25)
								.attr("y1", 100)
								.attr("x2", 75)
								.attr("y2", 0)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 63)
								.attr("y1", 7.5)
								.attr("x2", 75)
								.attr("y2", 0)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 82.5)
								.attr("y1", 12)
								.attr("x2", 75)
								.attr("y2", 0)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 63)
								.attr("y1", 7.5)
								.attr("x2", 82.5)
								.attr("y2", 12)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						$("#line1").append("<p>풍속: "+splice[2]+"km/h</p><p>풍향: 남남서</p>");
					}else if(splice[3]=="SW"){
						$("#line1").empty();
						var lineGraph = d3.select("#line1")
								.append("svg:svg")
								.attr("width", 100)
								.attr("height", 100);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 0)
								.attr("y1", 100)
								.attr("x2", 100)
								.attr("y2", 0)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 100)
								.attr("y1", 0)
								.attr("x2", 90)
								.attr("y2", 0)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 100)
								.attr("y1", 0)
								.attr("x2", 100)
								.attr("y2", 10)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 90)
								.attr("y1", 0)
								.attr("x2", 100)
								.attr("y2", 10)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						$("#line1").append("<p>풍속: "+splice[2]+"km/h</p><p>풍향: 남서</p>");
					}else if(splice[3]=="WSW"){
						$("#line1").empty();
						var lineGraph = d3.select("#line1")
								.append("svg:svg")
								.attr("width", 100)
								.attr("height", 100);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 0)
								.attr("y1", 75)
								.attr("x2", 100)
								.attr("y2", 25)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 88)
								.attr("y1", 17.5)
								.attr("x2", 100)
								.attr("y2", 25)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 92.5)
								.attr("y1", 37)
								.attr("x2", 100)
								.attr("y2", 25)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 88)
								.attr("y1", 17.5)
								.attr("x2", 92.5)
								.attr("y2", 37)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						$("#line1").append("<p>풍속: "+splice[2]+"km/h</p><p>풍향: 서남서</p>");
					}else if(splice[3]=="W"){
						$("#line1").empty();
						var lineGraph = d3.select("#line1")
								.append("svg:svg")
								.attr("width", 100)
								.attr("height", 100);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 0)
								.attr("y1", 50)
								.attr("x2", 100)
								.attr("y2", 50)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 90)
								.attr("y1", 40)
								.attr("x2", 100)
								.attr("y2", 50)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 90)
								.attr("y1", 60)
								.attr("x2", 100)
								.attr("y2", 50)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 90)
								.attr("y1", 40)
								.attr("x2", 90)
								.attr("y2", 40)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						$("#line1").append("<p>풍속: "+splice[2]+"km/h</p><p>풍향: 서</p>");
					}else if(splice[3]=="WNW"){
						$("#line1").empty();
						var lineGraph = d3.select("#line1")
								.append("svg:svg")
								.attr("width", 100)
								.attr("height", 100);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 0)
								.attr("y1", 25)
								.attr("x2", 100)
								.attr("y2", 75)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 88)
								.attr("y1", 82.5)
								.attr("x2", 100)
								.attr("y2", 75)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 92.5)
								.attr("y1", 63)
								.attr("x2", 100)
								.attr("y2", 75)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 88)
								.attr("y1", 82.5)
								.attr("x2", 92.5)
								.attr("y2", 63)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						$("#line1").append("<p>풍속: "+splice[2]+"km/h</p><p>풍향: 서북서</p>");
					}else if(splice[3]=="NW"){
						$("#line1").empty();
						var lineGraph = d3.select("#line1")
								.append("svg:svg")
								.attr("width", 100)
								.attr("height", 100);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 0)
								.attr("y1", 0)
								.attr("x2", 100)
								.attr("y2", 100)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 100)
								.attr("y1", 90)
								.attr("x2", 100)
								.attr("y2", 100)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 90)
								.attr("y1", 100)
								.attr("x2", 100)
								.attr("y2", 100)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 100)
								.attr("y1", 90)
								.attr("x2", 90)
								.attr("y2", 100)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						$("#line1").append("<p>풍속: "+splice[2]+"km/h</p><p>풍향: 북서</p>");
					}else if(splice[3]=="NNW"){
						$("#line1").empty();
						var lineGraph = d3.select("#line1")
								.append("svg:svg")
								.attr("width", 100)
								.attr("height", 100);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 25)
								.attr("y1", 0)
								.attr("x2", 75)
								.attr("y2", 100)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 63)
								.attr("y1", 92.5)
								.attr("x2", 75)
								.attr("y2", 100)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 82.5)
								.attr("y1", 88)
								.attr("x2", 75)
								.attr("y2", 100)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						var myLine = lineGraph.append("svg:line")
								.attr("x1", 63)
								.attr("y1", 92.5)
								.attr("x2", 82.5)
								.attr("y2", 88)
								.style("stroke", "rgb(163, 204, 163)")
								.style("stroke-width", 5);
						$("#line1").append("<p>풍속: "+splice[2]+"km/h</p><p>풍향: 북북서</p>");
					}
				});
	
	}, 1000);
});
