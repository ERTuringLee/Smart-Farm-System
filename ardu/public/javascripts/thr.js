$(document).ready(function(){
	var time;
	var temperature;
	var humidity;
	var windSpeed;
	var windName;
	var rainGauge;
	var dating = new Date();
	$('#dating').empty();
	var date_out = '<b>'+dating.getFullYear()+'년 '+(dating.getMonth()+1)+'월 '+dating.getDate()+'일</b>';
	$('#dating').append(date_out);
	$.get('/sensor', function(data){
		var splice = data.split(',');
		var ct = splice[0];
		var ch = splice[1];
		$('#current_th').empty();
		var out = '현재 온도: '+ ct+'도,현재 습도: '+ch+'%'
		$('#current_th').append(out);	
	})
	$.get('/sensor1', function(data){
		$('#current_water_th').empty();
		var out_water = '현재 관정 온도: '+data+'도'
		wdt2 = out_water
		$('#current_water_th').append(out_water);	
	})
	
	$.getJSON("http://210.119.29.74/today_weather.php", function(data){
			var wdt = [];
			var today_total_rain=0;
			$.each(data, function(index, item){
				time = item.time;
				time = time.split('-');
				time = time[3];
				wdt.push({
					time: parseInt(time),
					temperature: parseFloat(item.temperature),
					humidity: parseFloat(item.humidity),
					rain: parseFloat(item.rain)
				});
				
				today_total_rain=today_total_rain+item.rain;
			});
			
			$.getJSON("http://210.119.29.74/today_water_weather.php", function(data2){
				var wdt2 = []
				var time2;
				$.each(data2, function(index, item){
					time2 = item.time;
					time2 =time2.split('-');
					time2 =time2[3]
					wdt2.push({
						time: parseInt(time2),
						temperature: parseFloat(item.temperature)
					});
				});
			
			$('#total_rain').empty();
			var temp = '오늘 총 강수량: '+today_total_rain+'mm';
			$('#total_rain').append(temp);
			var margin = {top: 20, right:20, bottom:30, left:40};
			var width = 280
			var height = 400
			$('#barGraph1').empty();
			$('#lineGraph1').empty();
			var svg = d3.select("#lineGraph1").append("svg")
				.attr("width", width+margin.left+margin.right+margin.right)
			    	.attr("height", height+margin.top+margin.bottom)
			    	.append("g")
				.attr("transform", "translate(" + margin.left+","+margin.top+")");
			var svg2 = d3.select('#barGraph1').append("svg")
				.attr("width", width+margin.left+margin.right+margin.right)
				.attr("height", height+margin.top+margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left+","+margin.top+")"); 
			var maxRain = 0;
			for(var z=0; z<wdt.length; z++){
				if(wdt[z]["rain"]>maxRain){
					maxRain = wdt[z]["rain"];
				}
			}
			var barY;
			if(maxRain<1){
				barY = d3.scale.linear()
					.domain([1,0])
					.range([0, height]);
			}else if(maxRain<10){
				barY = d3.scale.linear()
					.domain([10, 0])
					.range([0, height]);
			}else if(maxRain<25){
				barY = d3.scale.linear()
					.domain([25,0])
					.range([0, height]);
			}else if(maxRain<50){
				barY = d3.scale.linear()
					.domain([50, 0])
					.range([0, height]);
			}else if(maxRain<100){
				barY = d3.scale.linear()
					.domain([100, 0])
					.range([0, height]);
			}else{
				barY = d3.scale.linear()
					.domain([500, 0])
					.range([0, height]);
			}

			var x = d3.scale.linear().domain([23, 0]).range([width,0]);
			var y = d3.scale.linear().domain([-30,40]).range([height, 0]);
			var y2 = d3.scale.linear().domain([0, 100]).range([height, 0]);
			var y3 = d3.scale.linear().domain([-30, 40]).range([height, 0]);
			var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(12);
			var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10);
			var yAxis2 = d3.svg.axis().scale(y2).orient("right").ticks(10);
			var baryAxis = d3.svg.axis().scale(barY).orient("left").ticks(10);
				
			svg.selectAll("line.y")
		 		.data(y.ticks(4))
		 		.enter().append("line")
		 		.attr("class", "y")
				.attr("x1", 0)
		 		.attr("x2", width)
			 	.attr("y1", y)
		 		.attr("y2", y)
		 		.style("stroke", "#ccc");
			svg2.selectAll("line.y")
				.data(y.ticks(4))
				.enter().append("line")
				.attr("class", "y")
				.attr("x1", 0)
				.attr("x2", width)
				.attr("y1", y)
				.attr("y2", y)
				.style("stroke", "#ccc");
			svg.append('g')
				.attr('class', 'x axis')
				.attr('transform', 'translate(0, '+ height+')')
		 		.call(xAxis);
			svg2.append('g')
				.attr('class', 'x axis')
				.attr('transform', 'translate(0, '+ height+')')
				.call(xAxis);
			svg.append("g")
		 		.attr("class", "y axis")
				.call(yAxis);
			svg.append("g")
				.attr("class","y axis")
				.attr("transform", "translate("+width+",0)")
				.call(yAxis2); 
			svg2.append("g")
				.attr("class", "y axis")
				.call(baryAxis);

		
			var line = d3.svg.line().x(function(d){return x(d.time);}).y(function(d) {return y(d.temperature)}).interpolate("monotone");
			
			var line2 = d3.svg.line().x(function(d){return x(d.time);}).y(function(d) {return y2(d.humidity)}).interpolate("monotone");
			
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
				.datum(wdt2)
				.attr("class", "line3")
				.attr("d", line);
			svg.selectAll("dot")
				.data(wdt2)
				.enter()
				.append("circle")
				.attr("class", "circle3")
				.attr("r", 2)
				.attr("cx", function(d) {return x(d.time);})
				.attr("cy", function(d) {return y3(d.temperature);});
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
				.attr("cy", function(d) {return y2(d.humidity);});
			svg2.selectAll("rect")
				.data(wdt)
				.enter()
				.append("rect")
				.attr("x", function(d){return x(d.time);})
				.attr("y", function(d){return barY(d.rain);})
				.attr("width", 6)
				.attr("height", function(d){return 400-barY(d.rain)})
				.style("fill", "steelblue");// 2016.11.1
			svg.append("text").attr("x",-12).attr("y", -5).text("(℃)");
			svg.append("text").attr("x", 273).attr("y", -5).text("(%)");
			svg2.append("text").attr("x", -12).attr("y", -5).text("(mm)");
		})
	});

	var cur_th = setInterval(function(){
		$.get('/sensor', function(data){
			var splice = data.split(',');
			var ct = splice[0];
			var ch = splice[1];
			$('#current_th').empty();
			var out = '현재 온도: '+ct+'도,현재 습도: '+ch+'%';
			$('#current_th').append(out);
		});
	},1000);
	var cur_water = setInterval(function(){
		$.get('/sensor1', function(data){
			$('#current_water_th').empty();
			var out_water = '현재 관정 온도: '+data+'도'
			$('#current_water_th').append(out_water);
		})
	}, 1000);
	var wdt_minute = setInterval(function(){
		$.getJSON("http://210.119.29.74/today_weather.php", function(data){
			var wdt = [];
			var ttr = 0;
			$.each(data, function(index, item){
				time = item.time;
				time = time.split('-');
				time = time[3];
				wdt.push({
					time: parseInt(time),
					temperature: parseFloat(item.temperature),
					humidity: parseFloat(item.humidity),
					rain: parseFloat(item.rain)
				});
				ttr = ttr+item.rain;
			});
			$.getJSON("http://210.119.29.74/today_water_weather.php", function(data2){
				var wdt2 = []
				var time2;
				$.each(data2, function(index, item){
					time2 = item.time;
					time2 = time2.split('-');
					time2 = time2[3]
					wdt2.push({
						time: parseInt(time2),
						temperature: parseFloat(item.temperature)
					});
				});

			$('#total_rain').empty();
			var tmp = '오늘 총 강수량: '+ttr+'mm';
			$('#total_rain').append(tmp);
			var margin = {top: 20, right:20, bottom:30, left:40};
			var width = 280
			var height = 400
			$('#barGraph1').empty();
			$('#lineGraph1').empty();
			var svg = d3.select("#lineGraph1").append("svg")
				.attr("width", width+margin.left+margin.right+margin.right)
			    	.attr("height", height+margin.top+margin.bottom)
			    	.append("g")
				.attr("transform", "translate(" + margin.left+","+margin.top+")");
			var svg2 = d3.select('#barGraph1').append("svg")
				.attr("width", width+margin.left+margin.right+margin.right)
				.attr("height", height+margin.top+margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left+","+margin.top+")");
			var maxRain = 0;
			for(var z=0; z<wdt.length; z++){
				if(wdt[z]["rain"]>maxRain){
					maxRain = wdt[z]["rain"];
				}
			}
			var barY;
			if(maxRain<1){
				barY = d3.scale.linear()
					.domain([1,0])
					.range([0, height]);
			}else if(maxRain<10){
				barY = d3.scale.linear()
					.domain([10, 0])
					.range([0, height]);
			}else if(maxRain<25){
				barY = d3.scale.linear()
					.domain([25, 0])
					.range([0, height]);
			}else if(maxRain<50){
				barY = d3.scale.linear()
					.domain([50, 0])
					.range([0, height]);
			}else if(maxRain<100){
				barY = d3.scale.linear()
					.domain([100, 0])
					.range([0, height]);
			}else{
				barY = d3.scale.linear()
					.domain([500, 0])
					.range([0, height]);
			}
			var x = d3.scale.linear().domain([23, 0]).range([width,0]);
			var y = d3.scale.linear().domain([-30,40]).range([height, 0]);
			var y2 = d3.scale.linear().domain([0, 100]).range([height, 0]);
			var y3 = d3.scale.linear().domain([-30, 40]).range([height, 0]);
			var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(12);
			var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10);
			var yAxis2 = d3.svg.axis().scale(y2).orient("right").ticks(10);
			var baryAxis = d3.svg.axis().scale(barY).orient("left").ticks(10);
			svg.selectAll("line.y")
		 		.data(y.ticks(4))
		 		.enter().append("line")
		 		.attr("class", "y")
				.attr("x1", 0)
		 		.attr("x2", width)
			 	.attr("y1", y)
		 		.attr("y2", y)
		 		.style("stroke", "#ccc");
			svg2.selectAll("line.y")
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
			svg2.append('g')
				.attr('class', 'x axis')
				.attr('transform', 'translate(0, '+ height +')')
				.call(xAxis);
			svg.append("g")
		 		.attr("class", "y axis")
				.call(yAxis);
			svg.append("g")
				.attr("class","y axis")
				.attr("transform", "translate("+width+",0)")
				.call(yAxis2); 
			svg2.append("g")
				.attr("class", "y axis")
				.call(baryAxis);
		
			var line = d3.svg.line().x(function(d){return x(d.time);}).y(function(d) {return y(d.temperature)}).interpolate("monotone");
			
			var line2 = d3.svg.line().x(function(d){return x(d.time);}).y(function(d) {return y2(d.humidity)}).interpolate("monotone");
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
				.datum(wdt2)
				.attr("class", "line3")
				.attr("d", line)
			svg.selectAll("dot")
				.data(wdt2)
				.enter()
				.append("circle")
				.attr("class", "circle3")
				.attr("r", 2)
				.attr("cx", function(d) {return x(d.time);})
				.attr("cy", function(d) {return y3(d.temperature);})
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
				.attr("cy", function(d) {return y2(d.humidity);});
			svg2.selectAll("rect")
				.data(wdt)
				.enter()
				.append("rect")
				.attr("x", function(d) {return x(d.time);})
				.attr("y", function(d) {return barY(d.rain);})
				.attr("width", 6)
				.attr("height", function(d){return 400-barY(d.rain);})
				.style("fill", "steelblue");
			svg.append("text").attr("x", -12).attr("y", -5).text("(℃)");
			svg.append("text").attr("x", 273).attr("y", -5).text("(%)");
			svg2.append("text").attr("x", -12).attr("y", -5).text("(mm)");
			});
		});
	}, 60000);


});
