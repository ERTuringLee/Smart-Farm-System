$(document).ready(function(){
	$.ajax({
		crossOrigin:true,
		type: "GET",
		url: "http://210.119.29.74/today_weather.php",
		success: function(data){
			data = data.split("</head>");
			data = data[1];
			data = data.replace(/(\s*)/g, "");
			data = data.replace("</html>", "");
			data = data.split("<br>");
			data.pop();
			var wdt = []
			for(var i=0; i<data.length; i++){
				var temp = data[i].split(',');
				var tm = temp[0].split('-');
				tm = tm[3];
				wdt.push({
					time: parseInt(tm),
					temperature: parseFloat(temp[1]),
					humidity: parseFloat(temp[2]),
					rain: parseFloat(temp[5])
				})
			}
		var margin = {top: 20, right:20, bottom:30, left:40};
		var width = 280
		var height = 400
		$('#lineGraph1').empty();
		var svg = d3.select("#lineGraph1").append("svg")
			.attr("width", width+margin.left+margin.right+margin.right)
		    	.attr("height", height+margin.top+margin.bottom)
		    	.append("g")
			.attr("transform", "translate(" + margin.left+","+margin.top+")");
		var x = d3.scale.linear().domain([23, 0]).range([width,0]);
		var y = d3.scale.linear().domain([-40,60]).range([height, 0]);
		var y2 = d3.scale.linear().domain([0, 100]).range([height, 0]);
		var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(12);
		var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10);
		var yAxis2 = d3.svg.axis().scale(y2).orient("right").ticks(10);
		svg.selectAll("line.y")
	 		.data(y.ticks(4))
	 		.enter().append("line")
	 		.attr("class", "y")
			.attr("x1", 0)
	 		.attr("x2", width)
		 	.attr("y1", y)
	 		.attr("y2", y)
	 		.style("stroke", "#ccc");
		svg.append('g')
			.attr('class', 'x acis')
			.attr('transform', 'translate(0, '+ height+')')
	 		.call(xAxis);
		svg.append("g")
	 		.attr("class", "y axis")
			.call(yAxis);
		svg.append("g")
			.attr("class","y axis")
			.attr("transform", "translate("+width+",0)")
			.call(yAxis2); 

	
		var line = d3.svg.line().x(function(d){return x(d.time);}).y(function(d) {return y(d.temperature)}).interpolate("monotone");
		
		var line2 = d3.svg.line().x(function(d){return x(d.time);}).y(function(d) {return y(d.humidity-40)}).interpolate("monotone");
		svg.append("path")
			.datum(wdt)
	   		.attr("class", "line")
	  		.attr("d", line);
		svg.selectAll("dot")
	  		.data(wdt)
	  	 	.enter()
	  		.append("circle")
	   		.attr("r", 2)
	   		.attr("cx", function(d) {return x(d.time);})
	   		.attr("cy", function(d) {return y(d.temperature);});
		
		svg.append("path")
			.datum(wdt)
			.attr("class", "line2")
			.attr("d", line2);
		svg.selectAll("dot")
			.data(wdt)
			.enter()
			.append("circle")
			.attr("class", "circle2")
			.attr("r", 2)
			.attr("cx", function(d) {return x(d.time);})
			.attr("cy", function(d) {return y(d.humidity-40);});
		}
		});
	var wdt_minute = setInterval(function(){
		$.ajax({
			crossOrigin:true,
			type: "GET",
			url: "http://210.119.29.74/today_weather.php",
			success: function(data){
				data = data.split("</head>");
				data = data[1];
				data = data.replace(/(\s*)/g, "");
				data = data.replace("</html>", "");
				data = data.split("<br>");
				data.pop();
				var wdt = []
				for(var i=0; i<data.length; i++){
					var temp = data[i].split(',');
					var tm = temp[0].split('-');
					tm = tm[3];
					wdt.push({
						time: parseInt(tm),
						temperature: parseFloat(temp[1]),
						humidity: parseFloat(temp[2]),
						rain: parseFloat(temp[5])
					})
				}
			var margin = {top: 20, right:20, bottom:30, left:40};
			var width = 280
			var height = 400
			$('#lineGraph1').empty();
			var svg = d3.select("#lineGraph1").append("svg")
				.attr("width", width+margin.left+margin.right+margin.right)
			    	.attr("height", height+margin.top+margin.bottom)
			    	.append("g")
				.attr("transform", "translate(" + margin.left+","+margin.top+")");
			var x = d3.scale.linear().domain([23, 0]).range([width,0]);
			var y = d3.scale.linear().domain([-40,60]).range([height, 0]);
			var y2 = d3.scale.linear().domain([0, 100]).range([height, 0]);
			var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(12);
			var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10);
			var yAxis2 = d3.svg.axis().scale(y2).orient("right").ticks(10);
			svg.selectAll("line.y")
		 		.data(y.ticks(4))
		 		.enter().append("line")
		 		.attr("class", "y")
				.attr("x1", 0)
		 		.attr("x2", width)
			 	.attr("y1", y)
		 		.attr("y2", y)
		 		.style("stroke", "#ccc");
			svg.append('g')
				.attr('class', 'x acis')
				.attr('transform', 'translate(0, '+ height+')')
		 		.call(xAxis);
			svg.append("g")
		 		.attr("class", "y axis")
				.call(yAxis);
			svg.append("g")
				.attr("class","y axis")
				.attr("transform", "translate("+width+",0)")
				.call(yAxis2); 

		
			var line = d3.svg.line().x(function(d){return x(d.time);}).y(function(d) {return y(d.temperature)}).interpolate("monotone");
			
			var line2 = d3.svg.line().x(function(d){return x(d.time);}).y(function(d) {return y(d.humidity-40)}).interpolate("monotone");
			svg.append("path")
				.datum(wdt)
		   		.attr("class", "line")
		  		.attr("d", line);
			svg.selectAll("dot")
		  		.data(wdt)
		  	 	.enter()
		  		.append("circle")
		   		.attr("r", 2)
		   		.attr("cx", function(d) {return x(d.time);})
		   		.attr("cy", function(d) {return y(d.temperature);});
			
			svg.append("path")
				.datum(wdt)
				.attr("class", "line2")
				.attr("d", line2);
			svg.selectAll("dot")
				.data(wdt)
				.enter()
				.append("circle")
				.attr("class", "circle2")
				.attr("r", 2)
				.attr("cx", function(d) {return x(d.time);})
				.attr("cy", function(d) {return y(d.humidity-40);});
			}
		});
	}, 1000);
});
