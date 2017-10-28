$(document).ready(function () {
	var to;
	$('#container').hide();
	$('#container3').hide();
	$('#record_data').hide();
	$('#control').click(function(){
		$('#container').toggle();
	});
	$('#data').click(function(){
		$('#container3').toggle();
	});
	$('#important').click(function(){
		$('#important-data').toggle();	
	});
	$('#look_record').click(function(){
		$('#record_data').toggle();
	});
	$('.logoutButton').click(function () {
		if(confirm("로그아웃하시겠습니까?")==true){
			window.location = "/logout";
		}else{
			return;
		}	
	});
	$('#onLED').click(function(){
		if(confirm("LED를 켜시겠습니까?")==true){
			$.post('solarstatus', {switchs:'on'}, function(){});
		}else{
			return;
		}
	});
	$('#offLED').click(function(){
		if(confirm("LED를 끄시겠습니까?")==true){
			$.post('solarstatus', {switchs:'off'}, function(){});
		}else{
			return;
		}
	});
	$('#autoLED').click(function(){
		if(confirm("LED를 자동모드로 설정하시겠습니까?")==true){
			$.post('solarstatus', {switchs: 'auto'}, function(){});
		}else{
			return;
		}
	});
	$('#turnOnButton').click(function () {
		if(confirm("솔레노이드 밸브를 개방하시겠습니까?")==true){
			$.post('/onoff', {switchs:'on'}, function() {});
			//$('#ledTitle').html('<h1>Solenoid Control: on</h1>');
			var count = 0
			var recent_on_index = 0;
			$('#record').empty()
			var output = ''
			output += '<table border="1" width="250px" style="border-collapse: collapse"><tr><th width="80%">시간</th><th width="20%">상태</th></tr>'
			$.getJSON('/record', function(data){
				var time = new Array();
				var status = new Array();
				$(data).each(function(index, item){
					time.push(item.time);
					status.push(item.status);
					count++
				});
				for(var i=0; i<count; i++){
					if(status[i] == "on"){
						break;
					}else{
						recent_on_index++
					}
				}
				clearTimeout(to);
				clearTimeout(tot);
				var rot = time[recent_on_index].split('.');
				var rott = rot[3].split(':');
				(function realTime(){
					var ot = time[recent_on_index].split('.');
					var ott = ot[3].split(':')
					var dating = new Date();
					var month = dating.getMonth()+1;
					var date = dating.getDate();
					var hour = dating.getHours();
					var minute = dating.getMinutes();
					var second = dating.getSeconds();
					if(month == 1){
						month = 13;
						month = month - ot[1];
						month = month*31
					}else{
						month = month - ot[1]
						if(month==2){
							month = month*31
						}else if(month==3){
							month = month*28
						}else if(month==4){
							month = month*31
						}else if(month==5){
							month = month*30
						}else if(month==6){
							month = month*31
						}else if(month==7){
							month = month*30
						}else if(month==8){
							month = month*31
						}else if(month==9){
							month = month*31
						}else if(month==10){
							month = month*30
						}else if(month==11){
							month = month*31
						}else if(month==12){
							month = month*30
						}
					}
					date = date -ot[2]
					date = month+date
					hour = hour - ott[0]
					hour = (date*24)+hour;
					minute = minute - ott[1]
					minute = (hour*60) + minute;
					second = second - ott[2];
					if(second<0){
						second = 60+second
						minute = minute -1
					}
					$('#on_off_time_at').empty();
					$('#on_off_time_at').append('가동시간: <b>'+minute+'분 '+second+'초</b>');
					to=setTimeout(realTime, 1000);
				})()
				$('#sol_on_time').empty();
				$('#sol_on_time').append("최근 개방 시각<br>- "+rot[0]+"년 "+rot[1]+"월 " +rot[2]+"일 "+rott[0]+"시 "+rott[1]+"분 "+rott[2]+"초");
				if(status[0]=='on'){
					$('#sol_status').empty();
					$('#sol_status').append('현재 상태: 개방');
				}else if(status[0]=='off'){
					$('#sol_status').empty();
					$('#sol_status').append('현재 상태: 폐쇄');
				}
				if(count<8){
					for(var i=0; i<count; i++){
						output += '<tr><td>'+time[i]+'</td><td>'+status[i]+'</td></tr>'
					}
					for(var i=count; i<8; i++){
						output += '<tr><td>&nbsp;</td><td>&nbsp;</td></tr>'
					}
				}else{
					for(var i=0; i<8; i++){
						output += '<tr><td>'+time[i]+'</td><td>'+status[i]+'</td></tr>'
					}
				}
				var eight = Math.floor(count/8);
				var eight3 = count/8
				if((eight3-eight)!=0){
					eight+=1;
				}
				if(eight<=10){
					output += '<tr><td colspan="2">'
					for(var i=0; i<eight; i++){
						output += '<a style="cursor:pointer;" class="pageNum" id="pageNumber'+(i+1)+'">'+(i+1)+'</a>&nbsp;'
					}
					output +='</td></tr></table>'
				}else{
					output += '<tr><td colspan="2">'
					for(var i=0; i<10; i++){
						output += '<a style="cursor:pointer;" class=pageNum" id="pageNumber'+(i+1)+'">'+(i+1)+'</a>&nbsp;'
					}
					output += '</td></tr></table>'
				}
				$('#record').append(output);
			});

		}else{
			return;
		}
	});
	$('#turnOffButton').click(function () {
		if(confirm("솔레노이드 밸브를 폐쇄하시겠습니까?")==true){
			$.post('/onoff', {switchs:'off'}, function() {});
			//$('#ledTitle').html('<h1>Solenoid Control: off</h1>');
			var count = 0;
			var recent_on_index= 0; 
			$('#record').empty();
			var output = ''
			output += '<table border = "1" width="250px" style="border-collapse:collapse;"><tr><th width="80%">시간</th><th width="20%">상태</th></tr>'
			$.getJSON('/record', function(data){
				var time = new Array();
				var status = new Array();
				$(data).each(function(index, item){
					time.push(item.time);
					status.push(item.status);
					count++
				});
				for(var i=0; i<count; i++){
					if(status[i]=="on"){
						break;
					}else{
						recent_on_index++;
					}
				}
				clearTimeout(to);
				clearTimeout(tot);
				var oft = time[recent_on_index-1].split('.');
				var oftt = oft[3].split(':')
				var ont = time[recent_on_index].split('.');
				var ontt = ont[3].split(':')
				var fomonth;
				var fodate;
				var fominute;
				var fosecond;
				if(oft[1] == 1){
					fomonth = 13
					fomonth = fomonth - ont[1]
					fomonth = fomonth*31
				}else{
					fomonth = oft[1] - ont[1]
					if(oft[1]==2){
						fomonth = fomonth*31
					}else if(oft[1]==3){
						fomonth = fomonth*28
					}else if(oft[1]==4){	
						fomonth = fomonth*31
					}else if(oft[1]==5){
						fomonth = fomonth*30
					}else if(oft[1]==6){
						fomonth = fomonth*31
					}else if(oft[1]==7){
						fomonth = fomonth*30
					}else if(oft[1]==8){
						fomonth = fomonth*31
					}else if(oft[1]==9){
						fomonth = fomonth*31
					}else if(oft[1]==10){
						fomonth = fomonth*30
					}else if(oft[1]==11){
						fomonth = fomonth*31
					}else if(oft[1]==12){
						fomonth = fomonth*30
					}
				}
				fodate = oft[2] - ont[2]
				fodate = fomonth + fodate;
				fohour = oftt[0] - ontt[0]
				fohour = (fodate*24)+fohour;
				fominute = oftt[1] - ontt[1];
				fominute = (fohour*60)+fominute;
				fosecond = oftt[2] - ontt[2];
				if(fosecond <0){
					fosecond = fosecond +60;
					fominute = fominute -1;
				}
				$('#on_off_time_at').empty();
				$('#on_off_time_at').append('가동시간: <b>'+fominute+'분 '+ fosecond+'초</b>');
				var rot = time[recent_on_index].split('.');
				var rott = rot[3].split(':');
				$('#sol_on_time').empty();
				$('#sol_on_time').append("최근 개방 시각<br>- "+rot[0]+"년 "+rot[1]+"월 "+rot[2]+"일 "+rott[0]+"시 "+rott[1]+"분 "+rott[2]+"초");
				if(status[0]=='on'){
					$('#sol_status').empty();
					$('#sol_status').append('현재 상태: 개방');	
				}else if(status[0]=='off'){
					$('#sol_status').empty();
					$('#sol_status').append('현재 상태: 폐쇄');
				}
				if(count<8){
					for(var i=0; i<count; i++){
						output += '<tr><td>'+time[i]+'</td><td>'+status[i]+'</td></tr>'
					}
					for(var i=count; i<8; i++){
						output += '<tr><td>&nbsp;</td><td>&nbsp;</td></tr>'
					}
				}else{
					for(var i=0; i<8; i++){
						output += '<tr><td>'+ time[i]+'</td><td>'+status[i]+'</td></tr>'	
					}
				}
				var eight = Math.floor(count/8)
				var eight3 = count/8
				if((eight3-eight)!=0){
					eight+=1
				}
				if(eight<=10){
					output += '<tr><td colspan="2">'
					for(var i=0; i<eight; i++){
						output += '<a style="cursor:pointer;" class="pageNum" id="pageNumber'+(i+1)+'">'+(i+1)+'</a>&nbsp;'
					}
					output += '</td></tr></table>'
				}else{
					output += '<tr><td colspan="2">'
					for(var i=0; i<10; i++){
						output += '<a style="cursor:pointer;" class="pageNum" id="pageNumber'+(i+1)+'">'+(i+1)+'</a>&nbsp;'
					}
					output += '</td></tr></table>'
				}
				$('#record').append(output);
			})
		}else{
			return;	
		}
	})
	$('#upMotor').click(function() {
		if(confirm('비닐하우스 측면을 개방하시겠습니까?')==true){
		
		}else{
			return;
		}
	})
	$('#downMotor').click(function() {
		if(confirm('비닐하우스 측면을 폐쇄하시겠습니까?')==true){
		
		}else{
			return;
		}
	})
});
