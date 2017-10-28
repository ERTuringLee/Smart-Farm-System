$(document).ready(function(){
	var out =""
	var cur_important = ''
	var dating = new Date();
	var cur_t =''
	var today_t = ''
	var cur_h = ''
	var cur_l = ''
	var today_h = ''
	var today_r = '' 
	var today_l = ''
	$.get('/sensor', function(data){
		var splice = data.split(',');
		$('#important_out_temp').append('<b>'+splice[0]+' &#176;C</b>');
		$('#important_out_hum').append('<b>'+splice[1]+'%</b>');
		var rain = parseFloat(splice[4]);
		rain = rain.toFixed(2);
		$('#important_rain').append('<b>'+rain+'mm</b>');
	});
	$.get('/sensor1', function(data){
		$('#important_water_temp').append('<b>'+data+'&#176;C</b>');
		
	});
	$.get('/sensor2', function(data){
		var splice = data.split(',');
		var percent;
		var volt = parseFloat(splice[2]);
		if(volt>=12.6){
			$('#important_battery').append('<b>100.00%</b>');
		}else if(volt>=12.4 && volt<12.6){
			volt = volt - 12.4;
			percent = 75.0+ (volt*125.0);
			percent = percent.toFixed(2);
			$('#important_battery').append('<b>'+percent+'%</b>');
		}else if(volt>=12.2 && volt<12.4){
			volt = volt - 12.2;
			percent = 50.0 +(volt*125.0);
			percent = percent.toFixed(2);
			$('#important_battery').append('<b>'+percent+'%</b>');
		}else if(volt>=12.0 && volt<12.2){
			volt = volt - 12.0;
			percent = 25.0+(volt*125.0);
			percent = percent.toFixed(2);
			$('#important_battery').append('<b>'+percent+'%</b>');
		}else if(volt>=11.8 && volt<12.0){
			volt = volt - 11.8;
			percent = 0.0 + (volt*125.0);
			percent = percent.toFixed(2);
			$('#important_battery').append('<b>'+percent+'%</b>');
		}else if(volt<11.8){
			$('#important_battery').append('<b>0.00%</b>');
		}
	});
	cur_important = setInterval(function(){
		$('#important_out_temp').empty();
		$('#important_out_hum').empty();
		$('#important_rain').empty();
		$('#important_water_temp').empty();
		$('#important_battery').empty();
		$.get('/sensor', function(data){
			var splice = data.split(',');
			$('#important_out_temp').append('<b>'+splice[0]+' &#176;C</b>');
			$('#important_out_hum').append('<b>'+splice[1]+'%</b>');
			var rain = parseFloat(splice[4]);
			rain = rain.toFixed(2);
			$('#important_rain').append('<b>'+rain+'mm</b>'); 
		});
		$.get('/sensor1', function(data){
			$('#important_water_temp').append('<b>'+data+'&#176;C</b>');
		});
		$.get('/sensor2', function(data){
			var splice = data.split(',');
			var percent;
			var volt = parseFloat(splice[2]);
			if(volt>=12.6){
				$('#important_battery').append('<b>100.00%</b>');
			}else if(volt>=12.4 && volt<12.6){
				volt = volt - 12.4;
				percent = 75.0 + (volt*125.0);
				percent = percent.toFixed(2);
				$('#important_battery').append('<b>'+percent+'%</b>');
			}else if(volt>=12.2 && volt<12.4){
				volt = volt - 12.2;
				percent = 50.0 + (volt*125.0);
				percent = percent.toFixed(2);
				$('#important_battery').append('<b>'+percent+'%</b>');
			}else if(volt>=12.0 && volt<12.2){
				volt = volt - 12.0;
				percent = 25.0 + (volt*125.0);
				percent = percent.toFixed(2);
				$('#important_battery').append('<b>'+percent+'%</b>');
			}else if(volt>=11.8 && volt<12.0){
				volt = volt - 11.8;
				percent = 25.0 +(volt*125.0);
				percent = percent.toFixed(2);
				$('#important_battery').append('<b>'+percent+'%</b>');
			}else if(volt<11.8){
				$('#important_battery').append('<b>0.00%</b>');
			}	
		});
	},10000);
	$('#menu').empty()
	out += '<div class="menu" id="temp"><p>온도</p></div>'
	out += '<div class="menu" id="hum"><p>습도</p></div>'
	out += '<div class="menu" id="lux"><p>조도 / 태양광 축전지 잔량</p></div>'
	out += '<div class="menu" id="rain_gau"><p>강수량</p></div>'
	$('#menu').append(out);
	$('body').on('click', '#temp', function(){
		$('#menu').empty();
		var out1 = '';
		out1 +='<div class="menu" id="back1"><p>돌아가기</p></div>'
		out1 += '<div class="menu" id="cur_temp"><p>현재 실외 / 관정 / 토양  온도</p></div>'
		out1 += '<div class="menu" id="today_temp"><p>오늘 실외 / 관정 / 토양  온도</p></div>'
		out1 +='<div class="menu" id="someday_temp"><p>특정날짜 실외 온도</p></div>'
		out1 +='<div class="menu" id="someday_water_temp"><p>특정날짜 관정 온도</p></div>'
		out1 +='<div class="menu" id="someday_soil_temp"><p>특정날짜 토양 온도</p></div>'
		$('#menu').append(out1);
	})
	$('body').on('click', '#cur_temp', function(){
		$('#menu').empty();
		$('#cont').empty()
		var out_menu = '';
		var out_cont = '&nbsp;&nbsp;현재 온도: ';
		out_menu +='<div class ="menu" id="back_temp"><p>돌아가기</p></div>'
		$('#menu').append(out_menu);
		$.get('/sensor', function(data){
			var splice = data.split(',');
			out_cont+='<span id="cur_out_temp">'+splice[0]+'</span> °C<br>&nbsp;&nbsp;현재 관정온도: ';
			$.get('/sensor1', function(data){
				out_cont+='<span id="cur_water_temp">'+data+'</span>°C<br>&nbsp;&nbsp;현재 토양온도: ';
				$.get('/sensor2', function(data){
					splice=data.split(',');
					out_cont+='<span id="cur_soil_temp">'+splice[3]+'</span> °C'
					$('#cont').append(out_cont);
				})
			})
			
		})
		cur_t = setInterval(function(){
			$('#cur_out_temp').empty();
			$('#cur_water_temp').empty();
			$('#cur_soil_temp').empty();
			$.get('/sensor', function(data){
				var splice = data.split(',');
				$('#cur_out_temp').append(splice[0]);
				$.get('/sensor1', function(data){
					$('#cur_water_temp').append(data);
					$.get('/sensor2', function(data){
						splice = data.split(',');
						$('#cur_soil_temp').append(splice[3]);
					});
				})
				
			})
		}, 10000)
	});
	$('body').on('click', '#today_temp', function(){
		$('#menu').empty();
		$('#cont').empty();
		$('#hla').empty();
		var low_temp = 100.0;
		var high_temp = -99.0;
		var aver_temp = 0.0;
		var out_menu = '';
		var out_cont = dating.getFullYear()+'년 '+(dating.getMonth()+1)+'월 '+dating.getDate()+'일';
		out_menu +='<div class ="menu" id="back_temp"><p>돌아가기</p></div><p>&nbsp;&nbsp;실외: <b style="color:#1db34f">초록</b>색, 관정: <b style="color: rgb(255,255,0)">노란</b>색, 토양: <b style="color:rgb(0,0,255)">파란</b>색</p>'
		$('#menu').append(out_menu);
		var margin = {top: 20, right:20, bottom:30, left:40};
		var width = 240;
		var height = 400;
		var svg = d3.select("#cont").append("svg")
			.attr("width", width+margin.left+margin.right+margin.right)
			.attr("height", height+margin.top+margin.bottom)
			.append("g")
			.attr("transform", "translate("+margin.left+","+margin.top+")");
		$.getJSON("http://210.119.29.74/today_weather.php", function(data){
			var wdt = [];
			$.each(data, function(index, item){
				time = item.time;
				time = time.split('-');
				time = time[3];
				wdt.push({
					time: parseInt(time),
					temperature: parseFloat(item.temperature)
				})
				if(parseFloat(item.temperature)<low_temp){
					low_temp=parseFloat(item.temperature);
				}
				if(parseFloat(item.temperature)>high_temp){
					high_temp = parseFloat(item.temperature);
				}
				aver_temp+=parseFloat(item.temperature);
			});
			aver_temp = aver_temp / wdt.length;
			aver_temp = aver_temp.toFixed(2)
			var out2 = '<b>실외</b><br>최저 온도: <span id="today_out_low_temp">'+low_temp+'°C</span><br>최고 온도: <span id="today_out_high_temp">'+high_temp+'°C</span><br>평균 온도: <span id="today_out_aver_temp">'+aver_temp+'°C</span><br>------------------------<br><b>관정</b><br>최저 온도: '
			$.getJSON("http://210.119.29.74/today_water_weather.php", function(data2){
				var wdt2 = [];
				var time2;
				var low_temp2 = 100.0;
				var high_temp2 = -99.9;
				var aver_temp2 = 0;
				$.each(data2, function(index, item){
					time2 = item.time;
					time2 = time2.split('-');
					time2 = time2[3];
					wdt2.push({
						time: parseInt(time2),
						temperature: parseFloat(item.temperature)
					})
					if(parseFloat(item.temperature)<low_temp2){
						low_temp2 = parseFloat(item.temperature);
					}
					if(parseFloat(item.temperature)>high_temp2){
						high_temp2 = parseFloat(item.temperature);
					}
					aver_temp2 += parseFloat(item.temperature);
				});
				aver_temp2 = aver_temp2 / wdt2.length;
				aver_temp2 = aver_temp2.toFixed(2)
				out2+='<span id="today_water_low_temp">'+low_temp2+'°C</span><br>최고 온도: <span id="today_water_high_temp">'+high_temp2+'°C</span><br>평균 온도: <span id="today_water_aver_temp">'+aver_temp2+'°C</span><br>------------------------<br><b>토양</b><br>최저 온도: '
				$.getJSON('http://210.119.29.74/today_lux.php', function(data3){
					var wdt3 = [];
					var time3;
					var low_temp3 = 100.0;
					var high_temp3 = -99.9;
					var aver_temp3 = 0;
					$.each(data3, function(index, item){
						time3 = item.time;
						time3 = time3.split('-');
						time3 = time3[3];
						wdt3.push({
							time: parseInt(time3),
							temperature: parseFloat(item.soilTemperature)	
						});
						if(parseFloat(item.soilTemperature)<low_temp3){
							low_temp3 = item.soilTemperature;
						}
						if(parseFloat(item.soilTemperature)>high_temp3){
							high_temp3 = item.soilTemperature;
						}
						aver_temp3 += parseFloat(item.soilTemperature);
					});
					aver_temp3 = aver_temp3 / wdt3.length;
					aver_temp3 = aver_temp3.toFixed(2);
					out2 += '<span id="today_soil_low_temp">'+low_temp3+'°C</span><br>최고 온도: <span id="today_soil_high_temp">'+high_temp3+'°C</span><br>평균 온도: <span id="today_soil_aver_temp">'+aver_temp3+'°C</span><br>'
					$('#hla').append(out2);
					var x = d3.scale.linear().domain([23, 0]).range([width,0]);
					var y = d3.scale.linear().domain([-30,40]).range([height, 0]);
					var y2 = d3.scale.linear().domain([-30, 40]).range([height, 0]);
					var y3 = d3.scale.linear().domain([-30, 40]).range([height, 0]);
					var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(12);
					var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10);
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
						.attr('class', 'x axis')
						.attr('transform', 'translate(0, '+ height+')')
		 				.call(xAxis);
		 			svg.append("g")
		 				.attr("class", "y axis")
						.call(yAxis);
					var line = d3.svg.line().x(function(d){return x(d.time);}).y(function(d) {return y(d.temperature);}).interpolate("monotone");
					var line2 = d3.svg.line().x(function(d){return x(d.time);}).y(function(d) {return y2(d.temperature);}).interpolate("monotone");
					var line3 = d3.svg.line().x(function(d){return x(d.time);}).y(function(d) {return y3(d.temperature);}).interpolate("monotone");
					svg.append("path")
						.datum(wdt)
		   				.attr("class", "line")
		  				.attr("d", line)
						.attr("id", "out_temp_line");
					svg.append("path")
						.datum(wdt2)
						.attr("class", "line3")
						.attr("d", line2)
						.attr("id", "water_temp_line");
					svg.append("path")
						.datum(wdt3)
						.attr("class", "line4")
						.attr("d", line3)
						.attr("id", "soil_temp_line");
					svg.selectAll("dot")
		  				.data(wdt)
		  	 			.enter()
		  				.append("circle")
		   				.attr("r", 2)
		   				.attr("cx", function(d) {return x(d.time);})
		   				.attr("cy", function(d) {return y(d.temperature);})
						.attr("id", "out_temp_dot");
					svg.selectAll("dot")
						.data(wdt2)
						.enter()
						.append("circle")
						.attr("r", 2)
						.attr("class", "circle3")
						.attr("cx", function(d) {return x(d.time);})
						.attr("cy", function(d) {return y2(d.temperature);})
						.attr("id", "water_temp_dot");
					svg.selectAll("dot")
						.data(wdt3)
						.enter()
						.append("circle")
						.attr("r", 2)
						.attr("class", "circle4")
						.attr("cx", function(d) {return x(d.time);})
						.attr("cy", function(d) {return y3(d.temperature);})
						.attr("id", "soil_temp_dot");
		   			svg.append("text").attr("x",-12).attr("y", -5).text("(°C)");
		   			svg.append("text").attr("x",100).attr("y", -5).attr("id", "temp_today").text(out_cont);
				});
			});
		   });
			today_t = setInterval(function(){
				d3.select("#out_temp_line").remove();
				d3.select("#water_temp_line").remove();
				d3.select("#soil_temp_line").remove();
				d3.select("#temp_today").remove();
				d3.select("#out_temp_dot").remove();
				d3.select("#water_temp_dot").remove();
				d3.select("#soil_temp_dot").remove();
				$('#today_out_low_temp').empty();
				$('#today_out_high_temp').empty();
				$('#today_out_aver_temp').empty();
				$('#today_water_low_temp').empty();
				$('#today_water_high_temp').empty();
				$('#today_water_aver_temp').empty();
				$('#today_soil_low_temp').empty();
				$('#today_soil_high_temp').empty();
				$('#today_soil_aver_temp').empty();
				var low_temp4 = 100.0;
				var high_temp4 = -99.0;
				var aver_temp4 = 0.0;
				$.getJSON("http://210.119.29.74/today_weather.php", function(data4){
					var wdt4 = [];
					var time4;
					$.each(data4, function(index, item){
						time4 = item.time;
						time4 = time4.split('-');
						time4 = time4[3];
						wdt4.push({
							time: parseInt(time4),
							temperature: parseFloat(item.temperature)
						})
						if(parseFloat(item.temperature)<low_temp4){
							low_temp4=parseFloat(item.temperature);
						}
						if(parseFloat(item.temperature)>high_temp4){
							high_temp4 = parseFloat(item.temperature);
						}
						aver_temp4+=parseFloat(item.temperature);
					});
					aver_temp4 = aver_temp4 / wdt4.length;
					aver_temp4 = aver_temp4.toFixed(2)
					$('#today_out_low_temp').append(low_temp4+'°C');
					$('#today_out_high_temp').append(high_temp4+'°C');
					$('#today_out_aver_temp').append(aver_temp4+'°C');
					$.getJSON("http://210.119.29.74/today_water_weather.php", function(data5){
						var wdt5 = [];
						var time5;
						var low_temp5 = 100.0;
						var high_temp5 = -99.9;
						var aver_temp5 = 0;
						$.each(data5, function(index, item){
							time5 = item.time;
							time5 = time5.split('-');
							time5 = time5[3];
							wdt5.push({
								time: parseInt(time5),
								temperature: parseFloat(item.temperature)
							})
							if(parseFloat(item.temperature)<low_temp5){
								low_temp5 = parseFloat(item.temperature);
							}
							if(parseFloat(item.temperature)>high_temp5){
								high_temp5 = parseFloat(item.temperature);
							}
							aver_temp5 += parseFloat(item.temperature);
						});
						aver_temp5 = aver_temp5 / wdt5.length;
						aver_temp5 = aver_temp5.toFixed(2)
						$('#today_water_low_temp').append(low_temp5+'°C');
						$('#today_water_high_temp').append(high_temp5+'°C');
						$('#today_water_aver_temp').append(aver_temp5+'°C');
						$.getJSON('http://210.119.29.74/today_lux.php', function(data6){
							var wdt6 = [];
							var time6;
							var low_temp6 = 100.0;
							var high_temp6 = -99.9;
							var aver_temp6 = 0;
							$.each(data6, function(index, item){
								time6 = item.time;
								time6 = time6.split('-');
								time6 = time6[3];
								wdt6.push({
									time: parseInt(time6),
									temperature: parseFloat(item.soilTemperature)	
								});
								if(parseFloat(item.soilTemperature)<low_temp6){
									low_temp6 = item.soilTemperature;
								}
								if(parseFloat(item.soilTemperature)>high_temp6){
									high_temp6 = item.soilTemperature;
								}
								aver_temp6 += parseFloat(item.soilTemperature);
							});
							aver_temp6 = aver_temp6 / wdt6.length;
							aver_temp6 = aver_temp6.toFixed(2);
							$('#today_soil_low_temp').append(low_temp6+'°C');
							$('#today_soil_high_temp').append(high_temp6+'°C');
							$('#today_soil_aver_temp').append(aver_temp6+'°C');
							var x = d3.scale.linear().domain([23, 0]).range([width,0]);
							var y = d3.scale.linear().domain([-30,40]).range([height, 0]);
							var y2 = d3.scale.linear().domain([-30, 40]).range([height, 0]);
							var y3 = d3.scale.linear().domain([-30, 40]).range([height, 0]);
							var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(12);
							var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10);
							var line = d3.svg.line().x(function(d){return x(d.time);}).y(function(d) {return y(d.temperature)}).interpolate("monotone");
							var line2 = d3.svg.line().x(function(d){return x(d.time);}).y(function(d) {return y2(d.temperature);}).interpolate("monotone");
							var line3 = d3.svg.line().x(function(d){return x(d.time);}).y(function(d) {return y3(d.temperature);}).interpolate("monotone");
							svg.append("path")
								.datum(wdt4)
						   		.attr("class", "line")
						  		.attr("d", line)
								.attr("id", "out_temp_line");
						  	svg.append("path")
								.datum(wdt5)
								.attr("class", "line3")
								.attr("d", line2)
								.attr("id" , "water_temp_line");
							svg.append("path")
								.datum(wdt6)
								.attr("class", "line4")
								.attr("d", line3)
								.attr("id", "soil_temp_line");
							svg.selectAll("dot")
						  		.data(wdt4)
						  	 	.enter()
						  		.append("circle")
						   		.attr("r", 2)
						   		.attr("cx", function(d) {return x(d.time);})
						   		.attr("cy", function(d) {return y(d.temperature);})
								.attr("id", "out_temp_dot");
						   	svg.selectAll("dot")
								.data(wdt5)
								.enter()
								.append("circle")
								.attr("r", 2)
								.attr("class", "circle3")
								.attr("cx", function(d) {return x(d.time);})
								.attr("cy", function(d) {return y2(d.temperature);})
								.attr("id", "water_temp_dot");
							svg.selectAll("dot")
								.data(wdt6)
								.enter()
								.append("circle")
								.attr("r", 2)
								.attr("class", "circle4")
								.attr("cx", function(d) {return x(d.time);})
								.attr("cy", function(d) {return y3(d.temperature);})
								.attr("id", "soil_temp_dot");
						   	svg.append("text").attr("x",100).attr("y", -5).attr("id", "temp_today").text(out_cont);
				   			})
				   		})
				   });
			}, 60000)
	})
	$('body').on('click', '#someday_temp', function(){
		$('#menu').empty();
		$('#cont').empty();
		$('#month').empty();
		$('#hla').empty();
		var low_temp = 100.0;
		var high_temp = -99.0;
		var aver_temp = 0.0;
		var out_menu = '';
		var out_month = '';
		var out_cont=''
		out_menu +='<div class ="menu" id="back_temp"><p>돌아가기</p></div>'
		out_month += '&nbsp;&nbsp;<input type="text" id="datepicker" placeholder="이곳을 클릭하세요"></input><input type="button" id="month_temp_search" value="검색"></input>'
		$('#menu').append(out_menu);
		$('#month').append(out_month);
		$(function(){
			$('#datepicker').datepicker({minDate: new Date(2016, 9,6), maxDate: 0});
		})
		$('#month_temp_search').click(function(){
			$('#cont').empty();
			$('#hla').empty();
			var low_temp = 100.0;
			var high_temp = -99.0;
			var aver_temp = 0.0;
			var time1;
			if($('#datepicker').val()==''){
				alert("날짜를 선택해주세요!")
			}else{
				var select_date = $('#datepicker').val().split('/');
				out_cont = select_date[2] + '년 '+select_date[0]+'월 '+ select_date[1]+'일'
				$.getJSON("http://210.119.29.74/whole_weather.php", function(data){
					var wdt = [];
					$.each(data, function(index, item){
						time1 = item.time;
						time1 = time1.split('-');
						if(parseInt(time1[0])==parseInt(select_date[2])&&parseInt(time1[1])==parseInt(select_date[0])&parseInt(time1[2])==parseInt(select_date[1])){
							time1=time1[3];
							wdt.push({
								time: parseInt(time1),
								temperature: parseFloat(item.temperature)
							})
							if(parseFloat(item.temperature)<low_temp){
								low_temp=parseFloat(item.temperature);
							}
							if(parseFloat(item.temperature)>high_temp){
								high_temp = parseFloat(item.temperature);
							}
							aver_temp+=parseFloat(item.temperature);
						}
					});
					aver_temp = aver_temp / wdt.length;
					aver_temp = aver_temp.toFixed(2)
					var out2 = '최저 온도: '+low_temp+'°C<br>최고 온도: '+high_temp+'°C<br>평균 온도: '+aver_temp+'°C'
					$('#hla').append(out2);
					var margin = {top: 20, right:20, bottom:30, left:40};
					var width = 240
					var height = 400
					var svg = d3.select("#cont").append("svg")
							.attr("width", width+margin.left+margin.right+margin.right)
				    		.attr("height", height+margin.top+margin.bottom)
				    		.append("g")
							.attr("transform", "translate(" + margin.left+","+margin.top+")");
					var x = d3.scale.linear().domain([23, 0]).range([width,0]);
					var y = d3.scale.linear().domain([-30,40]).range([height, 0]);
					var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(12);
					var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10);
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
						.attr('class', 'x axis')
						.attr('transform', 'translate(0, '+ height+')')
				 		.call(xAxis);
				 	svg.append("g")
				 		.attr("class", "y axis")
						.call(yAxis);
					var line = d3.svg.line().x(function(d){return x(d.time);}).y(function(d) {return y(d.temperature)}).interpolate("monotone");
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
				   	svg.append("text").attr("x",-12).attr("y", -5).text("(°C)");
				   	svg.append("text").attr("x",100).attr("y", -5).text(out_cont);
				});
			}
		})
	});
	$('body').on('click', '#someday_water_temp', function(){
		$('#menu').empty();
		$('#cont').empty();
		$('#month').empty();
		$('#hla').empty();
		var low_temp = 100.0;
		var high_temp = -99.0;
		var aver_temp = 0.0;
		var out_menu = '';
		var out_month = '';
		var out_cont=''
		out_menu +='<div class ="menu" id="back_temp"><p>돌아가기</p></div>'
		out_month += '&nbsp;&nbsp;<input type="text" id="datepicker" placeholder="이곳을 클릭하세요"></input><input type="button" id="month_temp_search" value="검색"></input>'
		$('#menu').append(out_menu);
		$('#month').append(out_month);
		$(function(){
			$('#datepicker').datepicker({minDate: new Date(2016, 10,27), maxDate: 0});
		})
		$('#month_temp_search').click(function(){
			$('#cont').empty();
			$('#hla').empty();
			var low_temp = 100.0;
			var high_temp = -99.0;
			var aver_temp = 0.0;
			var time1;
			if($('#datepicker').val()==''){
				alert("날짜를 선택해주세요!")
			}else{
				var select_date = $('#datepicker').val().split('/');
				out_cont = select_date[2] + '년 '+select_date[0]+'월 '+ select_date[1]+'일'
				$.getJSON("http://210.119.29.74/whole_water_weather.php", function(data){
					var wdt = [];
					$.each(data, function(index, item){
						time1 = item.time;
						time1 = time1.split('-');
						if(parseInt(time1[0])==parseInt(select_date[2])&&parseInt(time1[1])==parseInt(select_date[0])&parseInt(time1[2])==parseInt(select_date[1])){
							time1=time1[3];
							wdt.push({
								time: parseInt(time1),
								temperature: parseFloat(item.temperature)
							})
							if(parseFloat(item.temperature)<low_temp){
								low_temp=parseFloat(item.temperature);
							}
							if(parseFloat(item.temperature)>high_temp){
								high_temp = parseFloat(item.temperature);
							}
							aver_temp+=parseFloat(item.temperature);
						}
					});
					aver_temp = aver_temp / wdt.length;
					aver_temp = aver_temp.toFixed(2)
					var out2 = '최저 온도: '+low_temp+'°C<br>최고 온도: '+high_temp+'°C<br>평균 온도: '+aver_temp+'°C'
					$('#hla').append(out2);
					var margin = {top: 20, right:20, bottom:30, left:40};
					var width = 240
					var height = 400
					var svg = d3.select("#cont").append("svg")
							.attr("width", width+margin.left+margin.right+margin.right)
				    		.attr("height", height+margin.top+margin.bottom)
				    		.append("g")
							.attr("transform", "translate(" + margin.left+","+margin.top+")");
					var x = d3.scale.linear().domain([23, 0]).range([width,0]);
					var y = d3.scale.linear().domain([-30,40]).range([height, 0]);
					var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(12);
					var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10);
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
						.attr('class', 'x axis')
						.attr('transform', 'translate(0, '+ height+')')
				 		.call(xAxis);
				 	svg.append("g")
				 		.attr("class", "y axis")
						.call(yAxis);
					var line = d3.svg.line().x(function(d){return x(d.time);}).y(function(d) {return y(d.temperature)}).interpolate("monotone");
					svg.append("path")
						.datum(wdt)
				   		.attr("class", "line3")
				  		.attr("d", line);
					svg.selectAll("dot")
				  		.data(wdt)
				  	 	.enter()
				  		.append("circle")
				   		.attr("r", 2)
				   		.attr("class", "circle3")
				   		.attr("cx", function(d) {return x(d.time);})
				   		.attr("cy", function(d) {return y(d.temperature);});
				   	svg.append("text").attr("x",-12).attr("y", -5).text("(°C)");
				   	svg.append("text").attr("x",100).attr("y", -5).text(out_cont);
				})
			}
		})
	});
	$('body').on('click', '#someday_soil_temp', function(){
		$('#menu').empty();
		$('#cont').empty();
		$('#month').empty();
		$('#hla').empty();
		var low_temp = 100.0;
		var high_temp = -99.0;
		var aver_temp = 0.0;
		var out_menu = '';
		var out_month = '';
		var out_cont=''
		out_menu +='<div class ="menu" id="back_temp"><p>돌아가기</p></div>'
		out_month += '&nbsp;&nbsp;<input type="text" id="datepicker" placeholder="이곳을 클릭하세요"></input><input type="button" id="month_temp_search" value="검색"></input>'
		$('#menu').append(out_menu);
		$('#month').append(out_month);
		$(function(){
			$('#datepicker').datepicker({minDate: new Date(2016, 10,29), maxDate: 0});
		})
		$('#month_temp_search').click(function(){
			$('#cont').empty();
			$('#hla').empty();
			var low_temp = 100.0;
			var high_temp = -99.0;
			var aver_temp = 0.0;
			var time1;
			if($('#datepicker').val()==''){
				alert("날짜를 선택해주세요!")
			}else{
				var select_date = $('#datepicker').val().split('/');
				out_cont = select_date[2] + '년 '+select_date[0]+'월 '+ select_date[1]+'일'
				$.getJSON("http://210.119.29.74/whole_lux.php", function(data){
					var wdt = [];
					$.each(data, function(index, item){
						time1 = item.time;
						time1 = time1.split('-');
						if(parseInt(time1[0])==parseInt(select_date[2])&&parseInt(time1[1])==parseInt(select_date[0])&parseInt(time1[2])==parseInt(select_date[1])){
							time1=time1[3];
							wdt.push({
								time: parseInt(time1),
								temperature: parseFloat(item.soilTemperature)
							})
							if(parseFloat(item.soilTemperature)<low_temp){
								low_temp=parseFloat(item.soilTemperature);
							}
							if(parseFloat(item.soilTemperature)>high_temp){
								high_temp = parseFloat(item.soilTemperature);
							}
							aver_temp+=parseFloat(item.soilTemperature);
						}
					});
					aver_temp = aver_temp / wdt.length;
					aver_temp = aver_temp.toFixed(2)
					var out2 = '최저 온도: '+low_temp+'°C<br>최고 온도: '+high_temp+'°C<br>평균 온도: '+aver_temp+'°C'
					$('#hla').append(out2);
					var margin = {top: 20, right:20, bottom:30, left:40};
					var width = 240
					var height = 400
					var svg = d3.select("#cont").append("svg")
							.attr("width", width+margin.left+margin.right+margin.right)
				    		.attr("height", height+margin.top+margin.bottom)
				    		.append("g")
							.attr("transform", "translate(" + margin.left+","+margin.top+")");
					var x = d3.scale.linear().domain([23, 0]).range([width,0]);
					var y = d3.scale.linear().domain([-30,40]).range([height, 0]);
					var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(12);
					var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10);
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
						.attr('class', 'x axis')
						.attr('transform', 'translate(0, '+ height+')')
				 		.call(xAxis);
				 	svg.append("g")
				 		.attr("class", "y axis")
						.call(yAxis);
					var line = d3.svg.line().x(function(d){return x(d.time);}).y(function(d) {return y(d.temperature)}).interpolate("monotone");
					svg.append("path")
						.datum(wdt)
				   		.attr("class", "line4")
				  		.attr("d", line);
					svg.selectAll("dot")
				  		.data(wdt)
				  	 	.enter()
				  		.append("circle")
				   		.attr("r", 2)
				   		.attr("class", "circle4")
				   		.attr("cx", function(d) {return x(d.time);})
				   		.attr("cy", function(d) {return y(d.temperature);});
				   	svg.append("text").attr("x",-12).attr("y", -5).text("(°C)");
				   	svg.append("text").attr("x",100).attr("y", -5).text(out_cont);
				})
			}
		})
	});
	$('body').on('click', '#week_temp', function(){
		$('#menu').empty();
		$('#cont').empty();
		$('#hla').empty();
		var out_menu = '';
		out_menu +='<div class ="menu" id="back_temp"><p>돌아가기</p></div>'
		$('#menu').append(out_menu);
	});
	$('body').on('click', '#back_temp', function(){
		$('#menu').empty();
		$('#cont').empty();
		$('#month').empty();
		$('#hla').empty();
		var out1 = '';
		out1 +='<div class="menu" id="back1"><p>돌아가기</p></div>'
		out1 += '<div class="menu" id="cur_temp"><p>현재 실외 / 관정 / 토양  온도</p></div>'
		out1 += '<div class="menu" id="today_temp"><p>오늘 실외 / 관정 / 토양  온도</p></div>'
		out1 +='<div class="menu" id="someday_temp"><p>특정날짜 실외 온도</p></div>'
		out1 +='<div class="menu" id="someday_water_temp"><p>특정날짜 관정 온도</p></div>'
		out1 +='<div class="menu" id="someday_soil_temp"><p>특정날짜 토양 온도</p></div>'
		$('#menu').append(out1);
		clearInterval(cur_t)
		clearInterval(today_t)
	});
	$('body').on('click', '#hum', function(){
		$('#menu').empty();
		var out1 = '';
		out1 +='<div class="menu" id="back1"><p>돌아가기</p></div>'
		out1 +='<div class="menu" id="cur_hum"><p>현재 실외 / 토양 습도</p></div>'
		out1 +='<div class="menu" id="today_hum"><p>오늘 실외 / 토양 습도</p></div>'
		out1 +='<div class="menu" id="someday_hum"></p>특정날짜 실외 습도</p></div>'
		out1 +='<div class="menu" id="someday_soil_hum"></p>특정날짜 토양 습도</p></div>'
		$('#menu').append(out1);
	});
	$('body').on('click', '#cur_hum', function(){
		$('#menu').empty();
		$('#cont').empty()
		var out_menu = '';
		var out_cont = '&nbsp;&nbsp;현재 실외 습도: ';
		out_menu +='<div class ="menu" id="back_hum"><p>돌아가기</p></div>'
		$('#menu').append(out_menu);
		$.get('/sensor', function(data){
			var splice = data.split(',');
			out_cont+='<span id="cur_out_hum">'+splice[1]+'%</span>';
			$.get('/sensor2', function(data2){
				splice = data2.split(',');
				out_cont += '<br>&nbsp;&nbsp;현재 토양 습도: <span id="cur_soil_hum">'+splice[1]+'%</span>';
				$('#cont').append(out_cont);
			});
		})
		cur_h = setInterval(function(){
			$('#cur_out_hum').empty();
			$('#cur_soil_hum').empty();
			$.get('/sensor', function(data){
				var splice = data.split(',');
				$('#cur_out_hum').append(splice[1]+'%');
				$.get('/sensor2', function(data2){
					splice = data2.split(',');
					$('#cur_soil_hum').append(splice[1]+'%');
				});
			})
		}, 10000)
	});
	$('body').on('click', '#today_hum', function(){
		$('#menu').empty();
		$('#cont').empty();
		$('#hla').empty();
		var low_hum = 100.0;
		var high_hum = 0.0;
		var aver_hum = 0.0;
		var out_menu = '';
		var out_cont = dating.getFullYear()+'년 '+(dating.getMonth()+1)+'월 '+dating.getDate()+'일';
		out_menu +='<div class ="menu" id="back_hum"><p>돌아가기</p></div><p>&nbsp;&nbsp;실외: <b style="color: rgb(255,0,0)">빨간</b>색, 토양: <b style="color: rgb(255, 0,255)">분홍</b>색</p>'
		$('#menu').append(out_menu);
		var margin = {top:20, right:20, bottom:30, left:40};
		var width = 240;
		var height = 400;
		var svg = d3.select("#cont").append("svg")
			.attr("width", width+margin.left+ margin.right+margin.right)
			.attr("height", height+margin.top+margin.bottom)
			.append("g")
			.attr("transform", "translate("+margin.left+","+margin.top+")");
		$.getJSON("http://210.119.29.74/today_weather.php", function(data){
			var wdt = [];
			$.each(data, function(index, item){
				time = item.time;
				time = time.split('-');
				time = time[3];
				wdt.push({
					time: parseInt(time),
					humidity: parseFloat(item.humidity)
				})
				if(parseFloat(item.humidity)<low_hum){
					low_hum=parseFloat(item.humidity);
				}
				if(parseFloat(item.humidity)>high_hum){
					high_hum = parseFloat(item.humidity);
				}
				aver_hum+=parseFloat(item.humidity);
			});
			aver_hum = aver_hum / wdt.length;
			aver_hum = aver_hum.toFixed(2)
			var out2 = '<b>실외</b><br>최저 습도: <span id="today_out_low_hum">'+low_hum+'%</span><br>최고 습도: <span id="today_out_high_hum">'+high_hum+'%</span><br>평균 습도: <span id="today_out_aver_hum">'+aver_hum+'%</span><br>------------------------<br><b>토양</b><br>최저 습도: '
			$.getJSON("http://210.119.29.74/today_lux.php", function(data2){
				var low_soil_hum = 100.0;
				var high_soil_hum = 0.0;
				var aver_soil_hum = 0.0;
				var soil = [];
				var time2;
				$.each(data2, function(index, item){
					time2 = item.time;
					time2 = time2.split('-');
					time2= time2[3];
					soil.push({
						time: parseInt(time2),
						humidity: parseFloat(item.soilHumidity)
					})
					if(parseFloat(item.soilHumidity)<low_soil_hum){
						low_soil_hum=parseFloat(item.soilHumidity);
					}
					if(parseFloat(item.soilHumidity)>high_soil_hum){
						high_soil_hum = parseFloat(item.soilHumidity);
					}
					aver_soil_hum+=parseFloat(item.soilHumidity);
				});
				aver_soil_hum = aver_soil_hum / wdt.length;
				aver_soil_hum = aver_soil_hum.toFixed(2)
				out2 += '<span id="today_soil_low_hum">'+low_soil_hum+'%</span><br>최고 습도: <span id="today_soil_high_hum">'+high_soil_hum+'%</span><br>평균 습도: <span id="today_soil_aver_hum">'+aver_soil_hum+'%</span><br>'
				$('#hla').append(out2);
				/*var margin = {top: 20, right:20, bottom:30, left:40};
				var width = 240
				var height = 400
				var svg = d3.select("#cont").append("svg")
						.attr("width", width+margin.left+margin.right+margin.right)
			    		.attr("height", height+margin.top+margin.bottom)
			    		.append("g")
						.attr("transform", "translate(" + margin.left+","+margin.top+")");*/
				var x = d3.scale.linear().domain([23, 0]).range([width,0]);
				var y = d3.scale.linear().domain([0, 100]).range([height, 0]);
				var y2 = d3.scale.linear().domain([0, 100]).range([height, 0]);
				var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(12);
				var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10);
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
					.attr('class', 'x axis')
					.attr('transform', 'translate(0, '+ height+')')
			 		.call(xAxis);
			 	svg.append("g")
			 		.attr("class", "y axis")
					.call(yAxis);
				var line = d3.svg.line().x(function(d){return x(d.time);}).y(function(d) {return y(d.humidity)}).interpolate("monotone");
				var line2 = d3.svg.line().x(function(d){return x(d.time);}).y(function(d) {return y2(d.humidity)}).interpolate("monotone");
				svg.append("path")
					.datum(wdt)
					.attr("class", "line2")
					.attr("d", line)
					.attr("id", "today_out_hum_line");
				svg.append("path")
					.datum(soil)
					.attr("class", "line7")
					.attr("d", line2)
					.attr("id", "today_soil_hum_line");
				svg.selectAll("dot")
					.data(wdt)
					.enter()
					.append("circle")
					.attr("class", "circle2")
					.attr("r", 2)
					.attr("cx", function(d) {return x(d.time);})
					.attr("cy", function(d) {return y(d.humidity);})
					.attr("id", "today_out_hum_dot");
				svg.selectAll("dot")
					.data(soil)
					.enter()
					.append("circle")
					.attr("class", "circle7")
					.attr("r", 2)
					.attr("cx", function(d) {return x(d.time);})
					.attr("cy", function(d) {return y2(d.humidity);})
					.attr("id", "today_soil_hum_dot");
				svg.append("text").attr("x",-12).attr("y", -5).text("(%)");
				svg.append("text").attr("x",100).attr("y", -5).attr("id", "hum_today").text(out_cont);
			})
		})
		today_h = setInterval(function(){
			$('#today_out_low_hum').empty();
			$('#today_out_high_hum').empty();
			$('#today_out_aver_hum').empty();
			$('#today_soil_low_hum').empty();
			$('#today_soil_high_hum').empty();
			$('#today_soil_aver_hum').empty();
			d3.select("#today_out_hum_line").remove();
			d3.select("#today_soil_hum_line").remove();
			d3.select("#today_out_hum_dot").remove();
			d3.select("#today_soil_hum_dot").remove();
			d3.select("#hum_today").remove();
			var low_hum = 100.0;
			var high_hum = 0.0;
			var aver_hum = 0.0;
			$.getJSON("http://210.119.29.74/today_weather.php", function(data){
				var wdt = [];
				$.each(data, function(index, item){
					time = item.time;
					time = time.split('-');
					time = time[3];
					wdt.push({
						time: parseInt(time),
						humidity: parseFloat(item.humidity)
					})
					if(parseFloat(item.humidity)<low_hum){
						low_hum=parseFloat(item.humidity);
					}
					if(parseFloat(item.humidity)>high_hum){
						high_hum = parseFloat(item.humidity);
					}
					aver_hum+=parseFloat(item.humidity);
				});
				aver_hum = aver_hum / wdt.length;
				aver_hum = aver_hum.toFixed(2)
				$('#today_out_low_hum').append(low_hum+'%');
				$('#today_out_high_hum').append(high_hum+'%');
				$('#today_out_aver_hum').append(aver_hum+'%');
				$.getJSON("http://210.119.29.74/today_lux.php", function(data2){
					var low_soil_hum = 100.0;
					var high_soil_hum = 0.0;
					var aver_soil_hum = 0.0;
					var soil = [];
					var time2;
					$.each(data2, function(index, item){
						time2 = item.time;
						time2 = time2.split('-');
						time2= time2[3];
						soil.push({
							time: parseInt(time2),
							humidity: parseFloat(item.soilHumidity)
						})
						if(parseFloat(item.soilHumidity)<low_soil_hum){
							low_soil_hum=parseFloat(item.soilHumidity);
						}
						if(parseFloat(item.soilHumidity)>high_soil_hum){
							high_soil_hum = parseFloat(item.soilHumidity);
						}
						aver_soil_hum+=parseFloat(item.soilHumidity);
					});
					aver_soil_hum = aver_soil_hum / wdt.length;
					aver_soil_hum = aver_soil_hum.toFixed(2)
					$('#today_soil_low_hum').append(low_soil_hum+'%');
					$('#today_soil_high_hum').append(high_soil_hum+'%');
					$('#today_soil_aver_hum').append(aver_soil_hum+'%');
					var x = d3.scale.linear().domain([23, 0]).range([width,0]);
					var y = d3.scale.linear().domain([0, 100]).range([height, 0]);
					var y2 = d3.scale.linear().domain([0, 100]).range([height, 0]);
					var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(12);
					var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10);
					var line = d3.svg.line().x(function(d){return x(d.time);}).y(function(d) {return y(d.humidity)}).interpolate("monotone");
					var line2 = d3.svg.line().x(function(d){return x(d.time);}).y(function(d) {return y2(d.humidity)}).interpolate("monotone");
					svg.append("path")
						.datum(wdt)
						.attr("class", "line2")
						.attr("d", line)
						.attr("id", "today_out_hum_line");
					svg.append("path")
						.datum(soil)
						.attr("class", "line7")
						.attr("d", line2)
						.attr("id", "today_soil_hum_line");
					svg.selectAll("dot")
						.data(wdt)
						.enter()
						.append("circle")
						.attr("class", "circle2")
						.attr("r", 2)
						.attr("cx", function(d) {return x(d.time);})
						.attr("cy", function(d) {return y(d.humidity);})
						.attr("id", "today_out_hum_dot");
					svg.selectAll("dot")
						.data(soil)
						.enter()
						.append("circle")
						.attr("class", "circle7")
						.attr("r", 2)
						.attr("cx", function(d) {return x(d.time);})
						.attr("cy", function(d) {return y2(d.humidity);})
						.attr("id", "today_soil_hum_dot");
					svg.append("text").attr("x",100).attr("y", -5).attr("id", "hum_today").text(out_cont);
				})
			})
		}, 60000);
	})
	$('body').on('click', '#someday_hum', function(){
		$('#menu').empty();
		$('#cont').empty();
		$('#month').empty();
		$('#hla').empty();
		var low_hum = 100.0;
		var high_hum = 0.0;
		var aver_hum = 0.0;
		var out_menu = '';
		var out_month = '';
		var out_cont=''
		out_menu +='<div class ="menu" id="back_hum"><p>돌아가기</p></div>'
		out_month += '&nbsp;&nbsp;<input type="text" id="datepicker" placeholder="이곳을 클릭하세요"></input><input type="button" id="month_hum_search" value="검색"></input>'
		$('#menu').append(out_menu);
		$('#month').append(out_month);
		$(function(){
			$('#datepicker').datepicker({minDate: new Date(2016, 9,6), maxDate: 0});
		})
		$('#month_hum_search').click(function(){
			$('#cont').empty();
			$('#hla').empty();
			var low_hum = 100.0;
			var high_hum = 0.0;
			var aver_hum = 0.0;
			if($('#datepicker').val()==''){
				alert("날짜를 선택해주세요!")
			}else{
				var select_date = $('#datepicker').val().split('/');
				out_cont = select_date[2] + '년 '+select_date[0]+'월 '+ select_date[1]+'일'
				$.getJSON("http://210.119.29.74/whole_weather.php", function(data){
					var wdt = [];
					$.each(data, function(index, item){
						time = item.time;
						time = time.split('-');
						if(parseInt(time[0])==parseInt(select_date[2])&&parseInt(time[1])==parseInt(select_date[0])&parseInt(time[2])==parseInt(select_date[1])){
							time=time[3];
							wdt.push({
								time: parseInt(time),
								humidity: parseFloat(item.humidity)
							})
							if(parseFloat(item.humidity)<low_hum){
								low_hum=parseFloat(item.humidity);
							}
							if(parseFloat(item.humidity)>high_hum){
								high_hum = parseFloat(item.humidity);
							}
							aver_hum+=parseFloat(item.humidity);
						}
					});
					aver_hum = aver_hum / wdt.length;
					aver_hum = aver_hum.toFixed(2);
					var out2 = '최저 습도: '+low_hum+'%<br>최고 습도: '+high_hum+'%<br>평균 습도: '+aver_hum+'%'
					$('#hla').append(out2);
					var margin = {top: 20, right:20, bottom:30, left:40};
					var width = 240
					var height = 400
					var svg = d3.select("#cont").append("svg")
							.attr("width", width+margin.left+margin.right+margin.right)
				    		.attr("height", height+margin.top+margin.bottom)
				    		.append("g")
							.attr("transform", "translate(" + margin.left+","+margin.top+")");
					var x = d3.scale.linear().domain([23, 0]).range([width,0]);
					var y = d3.scale.linear().domain([0, 100]).range([height, 0]);
					var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(12);
					var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10);
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
						.attr('class', 'x axis')
						.attr('transform', 'translate(0, '+ height+')')
				 		.call(xAxis);
				 	svg.append("g")
				 		.attr("class", "y axis")
						.call(yAxis);
					var line = d3.svg.line().x(function(d){return x(d.time);}).y(function(d) {return y(d.humidity)}).interpolate("monotone");
					svg.append("path")
						.datum(wdt)
						.attr("class", "line2")
						.attr("d", line);
					svg.selectAll("dot")
						.data(wdt)
						.enter()
						.append("circle")
						.attr("class", "circle2")
						.attr("r", 2)
						.attr("cx", function(d) {return x(d.time);})
						.attr("cy", function(d) {return y(d.humidity);});
					svg.append("text").attr("x",-12).attr("y", -5).text("(%)");
					svg.append("text").attr("x",100).attr("y", -5).text(out_cont);
				});
			}
		})
	});
	$('body').on('click', '#someday_soil_hum', function(){
		$('#menu').empty();
		$('#cont').empty();
		$('#month').empty();
		$('#hla').empty();
		var low_hum = 100.0;
		var high_hum = 0.0;
		var aver_hum = 0.0;
		var out_menu = '';
		var out_month = '';
		var out_cont=''
		out_menu +='<div class ="menu" id="back_hum"><p>돌아가기</p></div>'
		out_month += '&nbsp;&nbsp;<input type="text" id="datepicker" placeholder="이곳을 클릭하세요"></input><input type="button" id="month_hum_search" value="검색"></input>'
		$('#menu').append(out_menu);
		$('#month').append(out_month);
		$(function(){
			$('#datepicker').datepicker({minDate: new Date(2016, 10,29), maxDate: 0});
		})
		$('#month_hum_search').click(function(){
			$('#cont').empty();
			$('#hla').empty();
			var low_hum = 100.0;
			var high_hum = 0.0;
			var aver_hum = 0.0;
			if($('#datepicker').val()==''){
				alert("날짜를 선택해주세요!")
			}else{
				var select_date = $('#datepicker').val().split('/');
				out_cont = select_date[2] + '년 '+select_date[0]+'월 '+ select_date[1]+'일'
				$.getJSON("http://210.119.29.74/whole_lux.php", function(data){
					var wdt = [];
					$.each(data, function(index, item){
						time = item.time;
						time = time.split('-');
						if(parseInt(time[0])==parseInt(select_date[2])&&parseInt(time[1])==parseInt(select_date[0])&parseInt(time[2])==parseInt(select_date[1])){
							time=time[3];
							wdt.push({
								time: parseInt(time),
								humidity: parseFloat(item.soilHumidity)
							})
							if(parseFloat(item.soilHumidity)<low_hum){
								low_hum=parseFloat(item.soilHumidity);
							}
							if(parseFloat(item.soilHumidity)>high_hum){
								high_hum = parseFloat(item.soilHumidity);
							}
							aver_hum+=parseFloat(item.soilHumidity);
						}
					});
					aver_hum = aver_hum / wdt.length;
					aver_hum = aver_hum.toFixed(2);
					var out2 = '최저 습도: '+low_hum+'%<br>최고 습도: '+high_hum+'%<br>평균 습도: '+aver_hum+'%'
					$('#hla').append(out2);
					var margin = {top: 20, right:20, bottom:30, left:40};
					var width = 240
					var height = 400
					var svg = d3.select("#cont").append("svg")
							.attr("width", width+margin.left+margin.right+margin.right)
				    		.attr("height", height+margin.top+margin.bottom)
				    		.append("g")
							.attr("transform", "translate(" + margin.left+","+margin.top+")");
					var x = d3.scale.linear().domain([23, 0]).range([width,0]);
					var y = d3.scale.linear().domain([0, 100]).range([height, 0]);
					var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(12);
					var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10);
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
						.attr('class', 'x axis')
						.attr('transform', 'translate(0, '+ height+')')
				 		.call(xAxis);
				 	svg.append("g")
				 		.attr("class", "y axis")
						.call(yAxis);
					var line = d3.svg.line().x(function(d){return x(d.time);}).y(function(d) {return y(d.humidity)}).interpolate("monotone");
					svg.append("path")
						.datum(wdt)
						.attr("class", "line7")
						.attr("d", line);
					svg.selectAll("dot")
						.data(wdt)
						.enter()
						.append("circle")
						.attr("class", "circle7")
						.attr("r", 2)
						.attr("cx", function(d) {return x(d.time);})
						.attr("cy", function(d) {return y(d.humidity);});
					svg.append("text").attr("x",-12).attr("y", -5).text("(%)");
					svg.append("text").attr("x",100).attr("y", -5).text(out_cont);
				});
			}
		})
	});
	$('body').on('click', '#week_hum', function(){
		$('#menu').empty();
		$('#cont').empty();
		$('#hla').empty();
		var out_menu = '';
		out_menu +='<div class ="menu" id="back_hum"><p>돌아가기</p></div>'
		$('#menu').append(out_menu);
	});
	$('body').on('click', '#back_hum', function(){
		$('#menu').empty();
		$('#cont').empty();
		$('#month').empty();
		$('#hla').empty();
		var out1 = '';
		out1 +='<div class="menu" id="back1"><p>돌아가기</p></div>'
		out1 +='<div class="menu" id="cur_hum"><p>현재 실외 / 토양 습도</p></div>'
		out1 +='<div class="menu" id="today_hum"><p>오늘 실외 / 토양 습도</p></div>'
		out1 +='<div class="menu" id="someday_hum"></p>특정날짜 실외 습도</p></div>'
		out1 +='<div class="menu" id="someday_soil_hum"></p>특정날짜 토양 습도</p></div>'
		$('#menu').append(out1);
		clearInterval(cur_h)
		clearInterval(today_h)
	});
	$('body').on('click', '#lux', function(){
		$('#menu').empty();
		var out1 = '';
		out1 +='<div class="menu" id="back1"><p>돌아가기</p></div>'
		out1 += '<div class="menu" id="cur_lux"><p>현재 조도 / 태양광 축전지 잔량</p></div>'
		out1 += '<div class="menu" id="today_lux"><p>오늘 조도 / 태양광 축전지 잔량</p></div>'
		out1 += '<div class="menu" id="someday_lux"><p>특정날짜 조도 / 태양광 축전지 잔량</p></div>'
		$('#menu').append(out1);
	});
	$('body').on('click', '#cur_lux', function(){
		$('#menu').empty();
		$('#cont').empty()
		var out_menu = '';
		var out_cont = '&nbsp;&nbsp;현재 조도: ';
		out_menu +='<div class ="menu" id="back_lux"><p>돌아가기</p></div>'
		$('#menu').append(out_menu);
		$.get('/sensor2', function(data){
			var splice = data.split(',');
			out_cont+='<span id="cur_light">'+splice[0]+'lux</span>';
			if(parseFloat(splice[2])>=12.6){
				out_cont+= '<br>&nbsp;&nbsp;현재 축전지 잔량: <span id="cur_battery">100.0%</span>';
			}else if(parseFloat(splice[2])>=12.4 && parseFloat(splice[2])<12.6){
				var voltage = parseFloat(splice[2])
				var percent = voltage - 12.4;
				percent = 75.0 + (percent*125.0);
				percent = percent.toFixed(2);
				out_cont += '<br>&nbsp;&nbsp;현재 축전지 잔량: <span id="cur_battery">'+percent+'%</span>';
			}else if(parseFloat(splice[2])>=12.2 && parseFloat(splice[2])<12.4){
				var voltage = parseFloat(splice[2])
				var percent = voltage - 12.2;
				percent = 50.0 + (percent*125.0);
				percent = percent.toFixed(2);
				out_cont += '<br>&nbsp;&nbsp;현재 축전지 잔량: <span id="cur_battery">'+percent+'%</span>';
			}else if(parseFloat(splice[2])>=12.0 && parseFloat(splice[2])<12.2){
				var voltage = parseFloat(splice[2])
				var percent = voltage - 12.0;
				percent = 25.0 + (percent*125.0);
				percent = percent.toFixed(2);
				out_cont += '<br>&nbsp;&nbsp;현재 축전지 잔량: <span id="cur_battery">'+percent+'%</span>';
			}else if(parseFloat(splice[2])>=11.8 && parseFloat(splice[2])<12.0){
				var voltage = parseFloat(splice[2])
				var percent = voltage - 11.8;
				percent = 0.0 + (percent*125.0);
				percent = percent.toFixed(2);
				out_cont += '<br>&nbsp;&nbsp;현재 축전지 잔량: <span id="cur_battery">'+percent+'%</span>';	
			}else{
				out_cont += '<br>&nbsp;&nbsp;현재 축전지 잔량: <span id="cur_battey">0.0%</span>';
			}
			$('#cont').append(out_cont);
		})
		cur_l = setInterval(function(){
			$('#cur_light').empty();
			$('#cur_battery').empty();
			$.get('/sensor2', function(data){
				var splice = data.split(',');
				$('#cur_light').append(splice[0]+'lux');
				if(parseFloat(splice[2])>=12.6){
					$('#cur_battery').append('100.0%');
				}else if(parseFloat(splice[2])>=12.4 && parseFloat(splice[2])<12.6){
					var voltage = parseFloat(splice[2])
					var percent = voltage - 12.4;
					percent = 75.0 + (percent*125.0);
					percent = percent.toFixed(2);
					$('#cur_battery').append(percent+'%');
				}else if(parseFloat(splice[2])>=12.2 && parseFloat(splice[2])<12.4){
					var voltage = parseFloat(splice[2])
					var percent = voltage - 12.2;
					percent = 50.0 + (percent*125.0);
					percent = percent.toFixed(2);
					$('#cur_battery').append(percent+'%');
				}else if(parseFloat(splice[2])>=12.0 && parseFloat(splice[2])<12.2){
					var voltage = parseFloat(splice[2])
					var percent = voltage - 12.0;
					percent = 25.0 + (percent*125.0);
					percent = percent.toFixed(2);
					$('#cur_battery').append(percent+'%');
				}else if(parseFloat(splice[2])>=11.8 && parseFloat(splice[2])<12.0){
					var voltage = parseFloat(splice[2])
					var percent = voltage - 11.8;
					percent = 0.0 + (percent*125.0);
					percent = percent.toFixed(2);
					$('#cur_battery').append(percent+'%');
				}else{
					$('#cur_battery').append('0.0%');
				}
			})
		}, 10000)
	});
	$('body').on('click', '#today_lux', function(){
		$('#menu').empty();
		$('#cont').empty();
		$('#hla').empty();
		var low_lux = 54612;
		var high_lux = 0;
		var aver_lux = 0;
		var low_percent = 100.0;
		var high_percent = 0.0;
		var aver_percent = 0.0;
		var out_menu = '';
		var time7;
		var out_cont = dating.getFullYear()+'년 '+(dating.getMonth()+1)+'월 '+dating.getDate()+'일';
		out_menu +='<div class ="menu" id="back_lux"><p>돌아가기</p></div><p>&nbsp;&nbsp;조도: <b style="color: rgb(255,153,0)">주황</b>색, 잔량: <b style="color: rgb(0, 0,0)">검은</b>색</p>'
		$('#menu').append(out_menu);
		var margin = {top:20, right:20, bottom:30, left:40};
		var width = 240;
		var height = 400;
		var svg = d3.select("#cont").append("svg")
			.attr("width", width+margin.left+margin.right+margin.right)
			.attr("height", height+margin.top+margin.bottom)
			.append("g")
			.attr("transform", "translate("+margin.left+","+margin.top+")");
		$.getJSON("http://210.119.29.74/today_lux.php", function(data){
			var lux_solar = [];
			$.each(data, function(index, item){
				var voltage = 0.0;
				var percent = 0.0;
				time7 = item.time;
				time7 = time7.split('-');
				time7 = time7[3];
				voltage = parseFloat(item.voltage);
				if(voltage>=12.6){
					percent = 100.0
					percent = parseFloat(percent);
					percent = percent.toFixed(2);
				}else if(voltage>=12.4 && voltage<12.6){
					percent = voltage - 12.4;
					percent = parseFloat(percent);
					percent = 75.0 + (percent*125.0);
					percent = percent.toFixed(2);
				}else if(voltage>=12.2 && voltage<12.4){
					percent = voltage - 12.2;
					percent = parseFloat(percent);
					percent = 50.0 + (percent*125.0);
					percent = percent.toFixed(2);
				}else if(voltage>=12.0 && voltage<12.2){
					percent = voltage - 12.0;
					percent = parseFloat(percent);
					percent = 25.0 + (percent*125.0);
					percent = percent.toFixed(2);
				}else if(voltage>=11.8 && voltage<12.0){
					percent = voltage - 11.8;
					percent = parseFloat(percent);
					percent = 0.0 + (percent*125.0);
					percent = percent.toFixed(2);	
				}else{
					percent = 0.0
					percent = parseFloat(percent);
					percent = percent.toFixed(2);
				}
				lux_solar.push({
					time: parseInt(time7),
					lux: parseFloat(item.lux)/10000.0,
					battery: parseFloat(percent)
				})
				if(parseInt(item.lux)<low_lux){
					low_lux = parseInt(item.lux);
				}
				if(parseFloat(percent)<low_percent){
					low_percent = parseFloat(percent);
				}
				if(parseInt(item.lux)>high_lux){
					high_lux = parseInt(item.lux);
				}
				if(parseFloat(percent)>high_percent){
					high_percent = parseFloat(percent);
				}
				aver_lux +=parseInt(item.lux)
				aver_percent+=parseFloat(percent);
			});
			aver_lux = aver_lux*1.0;
			aver_lux = aver_lux/lux_solar.length;
			aver_lux = aver_lux.toFixed(2)
			aver_percent = aver_percent / lux_solar.length;
			aver_percent = aver_percent.toFixed(2);
			var out3 = '<b>조도</b><br>최저 조도: <span id="today_low_lux">'+low_lux+'lux</span><br>최고 조도: <span id="today_high_lux">'+high_lux+'lux</span><br>평균 조도: <span id="today_aver_lux">'+aver_lux+'lux</span><br>------------------------<br><b>배터리</b><br>최저 잔량: <span id="todaay_low_percent">'+low_percent+'%</span><br>최고 잔량: <span id="today_high_percent">'+high_percent+'%</span><br>평균 잔량: <span id="today_aver_percent">'+aver_percent+'%</span><br>'
			$('#hla').append(out3);
			var x = d3.scale.linear().domain([23, 0]).range([width,0]);
			var y = d3.scale.linear().domain([0,5.5]).range([height, 0]);
			var y2 = d3.scale.linear().domain([0,100]).range([height, 0]);
			var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(12);
			var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10);
			var yAxis2 = d3.svg.axis().scale(y2).orient("right").ticks(10);
			svg.selectAll("line.y")
		 		.data(y2.ticks(4))
		 		.enter().append("line")
		 		.attr("class", "y")
				.attr("x1", 0)
		 		.attr("x2", width)
			 	.attr("y1", y2)
		 		.attr("y2", y2)
		 		.style("stroke", "#ccc");
			svg.append('g')
				.attr("class", 'x axis')
				.attr('transform', 'translate(0 '+height+')')
				.call(xAxis);
			svg.append('g')
				.attr("class", "y axis")
				.call(yAxis)
			svg.append('g')
				.attr("class", "y axis")
				.attr("transform", "translate("+width+",0)")
				.call(yAxis2)
			var line = d3.svg.line().x(function(d) {return x(d.time);}).y(function(d) {return y(d.lux);}).interpolate("monotone");
			var line2 = d3.svg.line().x(function(d) {return x(d.time);}).y(function(d) {return y2(d.battery);}).interpolate("monotone");
			svg.append("path")
				.datum(lux_solar)
				.attr("class", "line5")
				.attr("d", line)
				.attr("id", "today_lux_line");
			svg.selectAll("dot")
				.data(lux_solar)
				.enter()
				.append("circle")
				.attr("r", 2)
				.attr("class", "circle5")
				.attr("cx", function(d) {return x(d.time);})
				.attr("cy", function(d) {return y(d.lux);})
				.attr("id", "today_lux_dot");
			svg.append("path")
				.datum(lux_solar)
				.attr("class", "line6")
				.attr("d", line2)
				.attr("id", "today_percent_line");
			svg.selectAll("dot")
				.data(lux_solar)
				.enter()
				.append("circle")
				.attr("r", 2)
				.attr("class", "circle6")
				.attr("cx", function(d) {return x(d.time);})
				.attr("cy", function(d) {return y2(d.battery);})
				.attr("id", "today_percent_dot");
			svg.append("text").attr("x", -12).attr("y", -5).text("(x10000lux)");
			svg.append("text").attr("x", 238).attr("y", -5).text("(%)");
			svg.append("text").attr("x", 100).attr("y", -5).attr("id", "lux_today").text(out_cont);
		});
		today_l = setInterval(function(){
			$('#today_low_lux').empty();
			$('#today_high_lux').empty();
			$('#today_aver_lux').empty();
			$('#today_low_percent').empty();
			$('#today_high_percent').empty();
			$('#today_aver_percent').empty();
			d3.select("#today_lux_line").remove();
			d3.select("#today_lux_dot").remove();
			d3.select("#today_percent_line").remove();
			d3.select("#today_percent_dot").remove();
			d3.select("#lux_today").remove();
			var low_lux = 54612;
			var high_lux = 0;
			var aver_lux = 0;
			var low_percent = 100.0;
			var high_percent = 0.0;
			var aver_percent = 0.0;
			var time7;
			var out_cont = dating.getFullYear()+'년 '+(dating.getMonth()+1)+'월 '+dating.getDate()+'일';
			$.getJSON("http://210.119.29.74/today_lux.php", function(data){
				var lux_solar = [];
				$.each(data, function(index, item){
					var voltage = 0.0;
					var percent = 0.0;
					time7 = item.time;
					time7 = time7.split('-');
					time7 = time7[3];
					voltage = parseFloat(item.voltage);
					if(voltage>=12.6){
						percent = 100.0
						percent = parseFloat(percent);
						percent = percent.toFixed(2);
					}else if(voltage>=12.4 && voltage<12.6){
						percent = voltage - 12.4;
						percent = parseFloat(percent);
						percent = 75.0 + (percent*125.0);
						percent = percent.toFixed(2);
					}else if(voltage>=12.2 && voltage<12.4){
						percent = voltage - 12.2;
						percent = parseFloat(percent);
						percent = 50.0 + (percent*125.0);
						percent = percent.toFixed(2);
					}else if(voltage>=12.0 && voltage<12.2){
						percent = voltage - 12.0;
						percent = parseFloat(percent);
						percent = 25.0 + (percent*125.0);
						percent = percent.toFixed(2);
					}else if(voltage>=11.8 && voltage<12.0){
						percent = voltage - 11.8;
						percent = parseFloat(percent);
						percent = 0.0 + (percent*125.0);
						percent = percent.toFixed(2);	
					}else{
						percent = 0.0
						percent = parseFloat(percent);
						percent = percent.toFixed(2);
					}
					lux_solar.push({
						time: parseInt(time7),
						lux: parseFloat(item.lux)/10000.0,
						battery: parseFloat(percent)
					})
					if(parseInt(item.lux)<low_lux){
						low_lux = parseInt(item.lux);
					}
					if(parseFloat(percent)<low_percent){
						low_percent = parseFloat(percent);
					}
					if(parseInt(item.lux)>high_lux){
						high_lux = parseInt(item.lux);
					}
					if(parseFloat(percent)>high_percent){
						high_percent = parseFloat(percent);
					}
					aver_lux +=parseInt(item.lux)
					aver_percent+=parseFloat(percent);
				});
				aver_lux = aver_lux*1.0;
				aver_lux = aver_lux/lux_solar.length;
				aver_lux = aver_lux.toFixed(2)
				aver_percent = aver_percent / lux_solar.length;
				aver_percent = aver_percent.toFixed(2);
				$('#today_low_lux').append(low_lux+'lux');
				$('#today_high_lux').append(high_lux+'lux');
				$('#today_aver_lux').append(aver_lux+'lux');
				$('#today_low_percent').append(low_percent+'%');
				$('#today_high_percent').append(high_percent+'%');
				$('#today_aver_percent').append(aver_percent+'%');
				var x = d3.scale.linear().domain([23, 0]).range([width,0]);
				var y = d3.scale.linear().domain([0,5.5]).range([height, 0]);
				var y2 = d3.scale.linear().domain([0,100]).range([height, 0]);
				var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(12);
				var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10);
				var yAxis2 = d3.svg.axis().scale(y2).orient("right").ticks(10);
				var line = d3.svg.line().x(function(d) {return x(d.time);}).y(function(d) {return y(d.lux);}).interpolate("monotone");
				var line2 = d3.svg.line().x(function(d) {return x(d.time);}).y(function(d) {return y2(d.battery);}).interpolate("monotone");
				svg.append("path")
					.datum(lux_solar)
					.attr("class", "line5")
					.attr("d", line)
					.attr("id", "today_lux_line");
				svg.selectAll("dot")
					.data(lux_solar)
					.enter()
					.append("circle")
					.attr("r", 2)
					.attr("class", "circle5")
					.attr("cx", function(d) {return x(d.time);})
					.attr("cy", function(d) {return y(d.lux);})
					.attr("id", "today_lux_dot");
				svg.append("path")
					.datum(lux_solar)
					.attr("class", "line6")
					.attr("d", line2)
					.attr("id", "today_percent_line");
				svg.selectAll("dot")
					.data(lux_solar)
					.enter()
					.append("circle")
					.attr("r", 2)
					.attr("class", "circle6")
					.attr("cx", function(d) {return x(d.time);})
					.attr("cy", function(d) {return y2(d.battery);})
					.attr("id", "today_percent_dot");
				svg.append("text").attr("x", 100).attr("y", -5).attr("id", "lux_today").text(out_cont);
			});
		}, 10000)
	});
	$('body').on('click', '#someday_lux', function(){
		$('#menu').empty();
		$('#cont').empty();
		$('#month').empty();
		$('#hla').empty();
		var low_lux = 54612;
		var high_lux = 0;
		var aver_lux = 0;
		var low_percent = 100.0;
		var high_percent = 0.0;
		var aver_percent = 0.0;
		var out_menu = '';
		var out_month = '';
		var out_cont=''
		out_menu +='<div class ="menu" id="back_lux"><p>돌아가기</p></div><p>&nbsp;&nbsp;조도: <b style="color: rgb(255,153,0)">주황</b>색, 잔량: <b style="color: rgb(0, 0,0)">검은</b>색</p>'
		out_month += '&nbsp;&nbsp;<input type="text" id="datepicker" placeholder="이곳을 클릭하세요"></input><input type="button" id="month_lux_search" value="검색"></input>'
		$('#menu').append(out_menu);
		$('#month').append(out_month);
		$(function(){
			$('#datepicker').datepicker({minDate: new Date(2016, 10,29), maxDate: 0});
		})
		$('#month_lux_search').click(function(){
			$('#cont').empty();
			$('#hla').empty();
			var low_lux = 54612;
			var high_lux = 0;
			var aver_lux = 0;
			var low_percent = 100.0;
			var high_percent = 0.0;
			var aver_percent = 0.0;
			var time;
			if($('#datepicker').val()==''){
				alert("날짜를 선택해주세요!")
			}else{
				var select_date = $('#datepicker').val().split('/');
				out_cont = select_date[2] + '년 '+select_date[0]+'월 '+ select_date[1]+'일'
				$.getJSON('http://210.119.29.74/whole_lux.php', function(data){
					var lux_solar = [];
					$.each(data, function(index, item){
						var voltage = 0.0;
						var percent = 0.0;
						time = item.time;
						time = time.split('-');
						if(parseInt(time[0])==parseInt(select_date[2])&&parseInt(time[1])==parseInt(select_date[0])&parseInt(time[2])==parseInt(select_date[1])){
							time=time[3];
							voltage = parseFloat(item.voltage);
							if(voltage>=12.6){
								percent = 100.0
								percent = parseFloat(percent);
								percent = percent.toFixed(2);
							}else if(voltage>=12.4 && voltage<12.6){
								percent = voltage - 12.4;
								percent = parseFloat(percent);
								percent = 75.0 + (percent*125.0);
								percent = percent.toFixed(2);
							}else if(voltage>=12.2 && voltage<12.4){
								percent = voltage - 12.2;
								percent = parseFloat(percent);
								percent = 50.0 + (percent*125.0);
								percent = percent.toFixed(2);
							}else if(voltage>=12.0 && voltage<12.2){
								percent = voltage - 12.0;
								percent = parseFloat(percent);
								percent = 25.0 + (percent*125.0);
								percent = percent.toFixed(2);
							}else if(voltage>=11.8 && voltage<12.0){
								percent = voltage - 11.8;
								percent = parseFloat(percent);
								percent = 0.0 + (percent*125.0);
								percent = percent.toFixed(2);	
							}else{
								percent = 0.0
								percent = parseFloat(percent);
								percent = percent.toFixed(2);
							}
							lux_solar.push({
								time: parseInt(time),
								lux: parseFloat(item.lux)/10000.0,
								battery: parseFloat(percent)
							})
							if(parseInt(item.lux)<low_lux){
								low_lux = parseInt(item.lux);
							}
							if(parseFloat(percent)<low_percent){
								low_percent = parseFloat(percent);
							}
							if(parseInt(item.lux)>high_lux){
								high_lux = parseInt(item.lux);
							}
							if(parseFloat(percent)>high_percent){
								high_percent = parseFloat(percent);
							}
							aver_lux +=parseInt(item.lux)
							aver_percent+=parseFloat(percent);
						}
					})
					aver_lux = aver_lux*1.0;
					aver_lux = aver_lux/lux_solar.length;
					aver_lux = aver_lux.toFixed(2)
					aver_percent = aver_percent / lux_solar.length;
					aver_percent = aver_percent.toFixed(2);
					var out3 = '<b>조도</b><br>최저 조도: '+low_lux+'lux<br>최고 조도: '+high_lux+'lux<br>평균 조도: '+aver_lux+'lux<br>------------------------<br><b>배터리</b><br>최저 잔량: '+low_percent+'%<br>최고 잔량: '+high_percent+'%<br>평균 잔량: '+aver_percent+'%<br>'
					$('#hla').append(out3);
					var margin = {top: 20, right:20, bottom:30, left:40};
					var width = 240
					var height = 400
					var svg = d3.select("#cont").append("svg")
							.attr("width", width+margin.left+margin.right+margin.right)
				    		.attr("height", height+margin.top+margin.bottom)
				    		.append("g")
							.attr("transform", "translate(" + margin.left+","+margin.top+")");
					var x = d3.scale.linear().domain([23, 0]).range([width,0]);
					var y = d3.scale.linear().domain([0,5.5]).range([height, 0]);
					var y2 = d3.scale.linear().domain([0,100]).range([height, 0]);
					var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(12);
					var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10);
					var yAxis2 = d3.svg.axis().scale(y2).orient("right").ticks(10);
					svg.selectAll("line.y")
				 		.data(y2.ticks(4))
				 		.enter().append("line")
				 		.attr("class", "y")
						.attr("x1", 0)
				 		.attr("x2", width)
					 	.attr("y1", y2)
				 		.attr("y2", y2)
				 		.style("stroke", "#ccc");
					svg.append('g')
						.attr("class", 'x axis')
						.attr('transform', 'translate(0 '+height+')')
						.call(xAxis);
					svg.append('g')
						.attr("class", "y axis")
						.call(yAxis)
					svg.append('g')
						.attr("class", "y axis")
						.attr("transform", "translate("+width+",0)")
						.call(yAxis2)
					var line = d3.svg.line().x(function(d) {return x(d.time);}).y(function(d) {return y(d.lux);}).interpolate("monotone");
					var line2 = d3.svg.line().x(function(d) {return x(d.time);}).y(function(d) {return y2(d.battery);}).interpolate("monotone");
					svg.append("path")
						.datum(lux_solar)
						.attr("class", "line5")
						.attr("d", line)
					svg.selectAll("dot")
						.data(lux_solar)
						.enter()
						.append("circle")
						.attr("r", 2)
						.attr("class", "circle5")
						.attr("cx", function(d) {return x(d.time);})
						.attr("cy", function(d) {return y(d.lux);})
					svg.append("path")
						.datum(lux_solar)
						.attr("class", "line6")
						.attr("d", line2)
					svg.selectAll("dot")
						.data(lux_solar)
						.enter()
						.append("circle")
						.attr("r", 2)
						.attr("class", "circle6")
						.attr("cx", function(d) {return x(d.time);})
						.attr("cy", function(d) {return y2(d.battery);})
					svg.append("text").attr("x", -12).attr("y", -5).text("(x10000lux)");
					svg.append("text").attr("x", 273).attr("y", -5).text("(%)");
					svg.append("text").attr("x", 100).attr("y", -5).text(out_cont);
				})
			}
		});
	});
	$('body').on('click', '#back_lux', function(){
		$('#menu').empty();
		$('#cont').empty();
		$('#month').empty();
		$('#hla').empty();
		var out1 = '';
		out1 +='<div class="menu" id="back1"><p>돌아가기</p></div>'
		out1 += '<div class="menu" id="cur_lux"><p>현재 조도 / 태양광 축전지 잔량</p></div>'
		out1 += '<div class="menu" id="today_lux"><p>오늘 조도 / 태양광 축전지 잔량</p></div>'
		out1 += '<div class="menu" id="someday_lux"><p>특정날짜 조도 / 태양광 축전지 잔량</p></div>'
		$('#menu').append(out1);
		clearInterval(cur_l)
		clearInterval(today_l)
	});
	$('body').on('click', '#rain_gau', function(){
		$('#menu').empty();
		var out1 = '';
		out1 +='<div class="menu" id="back1"><p>돌아가기</p></div>'
		out1 += '<div class="menu" id="today_rain_gau"><p>오늘 강수량</p></div>'
		out1 += '<div class="menu" id="someday_rain_gau"><p>특정날짜 강수량</p></div>'
		$('#menu').append(out1);
	});
	$('body').on('click', '#today_rain_gau', function(){
		$('#menu').empty();
		$('#cont').empty();
		$('#hla').empty();
		var out_menu = '';
		var out_cont = dating.getFullYear()+'년 '+(dating.getMonth()+1)+'월 '+dating.getDate()+'일';
		out_menu +='<div class ="menu" id="back_rain_gau"><p>돌아가기</p></div><br>'
		$('#menu').append(out_menu);
		var margin = {top:20, right:20, bottom:30, left:40};
		var width = 240;
		var height = 400;
		var svg = d3.select('#cont').append("svg")
			.attr("width", width+margin.left+margin.right+margin.right)
			.attr("height", height+margin.top+margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left+","+margin.top+")");
		$.getJSON("http://210.119.29.74/today_weather.php", function(data){
			var wdt = [];
			var today_total_rain=0;
			$.each(data, function(index, item){
				time = item.time;
				time = time.split('-');
				time = time[3];
				wdt.push({
					time: parseInt(time),
					rain: parseFloat(item.rain)
				});
				today_total_rain=today_total_rain+item.rain;
			});
			today_total_rain = today_total_rain.toFixed(2)
			var imsi = '오늘 총 강수량: <span id="today_rain">'+today_total_rain+'mm</span>';
			$('#hla').append(imsi);
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
			var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(12);
			var baryAxis = d3.svg.axis().scale(barY).orient("left").ticks(10);
			svg.selectAll("line.y")
				.data(barY.ticks(4))
				.enter().append("line")
				.attr("class", "y")
				.attr("x1", 0)
				.attr("x2", width)
				.attr("y1", barY)
				.attr("y2", barY)
				.style("stroke", "#ccc");
			svg.append('g')
				.attr('class', 'x axis')
				.attr('transform', 'translate(0, '+ height+')')
				.call(xAxis);
			svg.append("g")
				.attr("class", "y axis")
				.attr("id", "rain_range")
				.call(baryAxis);
			svg.selectAll("rect")
				.data(wdt)
				.enter()
				.append("rect")
				.attr("x", function(d){return x(d.time);})
				.attr("y", function(d){return barY(d.rain);})
				.attr("width", 6)
				.attr("height", function(d){return 400-barY(d.rain)})
				.attr("id", "rain_bar")
				.style("fill", "steelblue");
			svg.append("text").attr("x", -12).attr("y", -5).text("(mm)");
			svg.append("text").attr("x",100).attr("y", -5).attr("id", "rain_today").text(out_cont);	
		})
		today_r = setInterval(function(){
			$('#today_rain').empty();
			d3.select("#rain_today").remove();
			d3.select("#rain_range").remove();
			d3.select("#rain_bar").remove();
			$.getJSON("http://210.119.29.74/today_weather.php", function(data){
				var wdt = [];
				var today_total_rain=0;
				$.each(data, function(index, item){
					time = item.time;
					time = time.split('-');
					time = time[3];
					wdt.push({
						time: parseInt(time),
						rain: parseFloat(item.rain)
					});
					today_total_rain=today_total_rain+item.rain;
				});
				today_total_rain =today_total_rain.toFixed(2);
				var imsi = today_total_rain+'mm';
				$('#today_rain').append(imsi);
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
				var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(12);
				var baryAxis = d3.svg.axis().scale(barY).orient("left").ticks(10);
				svg.append("g")
					.attr("class", "y axis")
					.attr("id", "rain_range")
					.call(baryAxis);
				svg.selectAll("rect")
					.data(wdt)
					.enter()
					.append("rect")
					.attr("x", function(d){return x(d.time);})
					.attr("y", function(d){return barY(d.rain);})
					.attr("width", 6)
					.attr("height", function(d){return 400-barY(d.rain)})
					.attr("id", "rain_bar")
					.style("fill", "steelblue");
				svg.append("text").attr("x",100).attr("y", -5).attr("id", "rain_today").text(out_cont);	
			})
		}, 10000)
	});
	$('body').on('click', '#someday_rain_gau', function(){
		$('#menu').empty();
		$('#cont').empty();
		$('#month').empty();
		$('#hla').empty();
		var out_menu = '';
		var out_month = '';
		var out_cont=''
		out_menu +='<div class ="menu" id="back_rain_gau"><p>돌아가기</p></div>'
		out_month += '&nbsp;&nbsp;<input type="text" id="datepicker" placeholder="이곳을 클릭하세요"></input><input type="button" id="month_rain_search" value="검색"></input>'
		$('#menu').append(out_menu);
		$('#month').append(out_month);
		$(function(){
			$('#datepicker').datepicker({minDate: new Date(2016, 9,6), maxDate: 0});
		})
		$('#month_rain_search').click(function(){
			$('#cont').empty();
			$('#hla').empty();
			if($('#datepicker').val()==''){
				alert("날짜를 선택해주세요!")
			}else{
				var select_date = $('#datepicker').val().split('/');
				out_cont = select_date[2] + '년 '+select_date[0]+'월 '+ select_date[1]+'일'
				$.getJSON("http://210.119.29.74/whole_weather.php", function(data){
					var wdt = [];
					var someday_total_rain=0;
					$.each(data, function(index, item){
						time = item.time;
						time = time.split('-');
						if(parseInt(time[0])==parseInt(select_date[2])&&parseInt(time[1])==parseInt(select_date[0])&parseInt(time[2])==parseInt(select_date[1])){
							time=time[3];
							wdt.push({
								time: parseInt(time),
								rain: parseFloat(item.rain)
							})
							someday_total_rain=someday_total_rain+item.rain;
						}
					});
					someday_total_rain = someday_total_rain.toFixed(2)
					var some_imsi = '오늘 총 강수량: '+someday_total_rain+'mm';
					$('#hla').append(some_imsi);
					var margin = {top: 20, right:20, bottom:30, left:40};
					var width = 240
					var height = 400
					var svg = d3.select('#cont').append("svg")
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
					var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(12);
					var baryAxis = d3.svg.axis().scale(barY).orient("left").ticks(10);
					svg.selectAll("line.y")
						.data(barY.ticks(4))
						.enter().append("line")
						.attr("class", "y")
						.attr("x1", 0)
						.attr("x2", width)
						.attr("y1", barY)
						.attr("y2", barY)
						.style("stroke", "#ccc");
					svg.append('g')
						.attr('class', 'x axis')
						.attr('transform', 'translate(0, '+ height+')')
						.call(xAxis);
					svg.append("g")
						.attr("class", "y axis")
						.call(baryAxis);
					svg.selectAll("rect")
						.data(wdt)
						.enter()
						.append("rect")
						.attr("x", function(d){return x(d.time);})
						.attr("y", function(d){return barY(d.rain);})
						.attr("width", 6)
						.attr("height", function(d){return 400-barY(d.rain)})
						.style("fill", "steelblue");
					svg.append("text").attr("x", -12).attr("y", -5).text("(mm)");
					svg.append("text").attr("x",100).attr("y", -5).text(out_cont);
				});
			}
		})
	});
	$('body').on('click', '#week_rain_gau', function(){
		$('#menu').empty();
		$('#cont').empty();
		$('#hla').empty();
		var out_menu = '';
		out_menu +='<div class ="menu" id="back_rain_gau"><p>돌아가기</p></div>'
		$('#menu').append(out_menu);
	});
	$('body').on('click', '#back_rain_gau', function(){
		$('#menu').empty();
		$('#cont').empty();
		$('#month').empty();
		$('#hla').empty();
		var out1 = '';
		out1 +='<div class="menu" id="back1"><p>돌아가기</p></div>'
		out1 += '<div class="menu" id="today_rain_gau"><p>오늘 강수량</p></div>'
		out1 += '<div class="menu" id="someday_rain_gau"><p>특정날짜 강수량</p></div>'
		$('#menu').append(out1);
		clearInterval(today_r)
	});
	$('body').on('click', '#back1', function(){
		$('#menu').empty();
		var out1 = '';
		out1 +='<div class="menu" id="temp"><p>온도</p></div>'
		out1 +='<div class="menu" id="hum"><p>습도</p></div>'
		out1 +='<div class="menu" id="lux"><p>조도 / 태양광 축전지 잔량</p></div>'
		out1 +='<div class="menu" id="rain_gau"><p>강수량</p></div>'
		$('#menu').append(out1);
	})
});
