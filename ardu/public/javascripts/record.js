var tot;
$(document).ready(function() {
	var count = 0
	var recent_on_index = 0;
	$('#record').empty();
	var output = ''
	output += '<table border="1" width="250px" style="border-collapse:collapse;"><tr><th width="80%">시간</th><th width="20%">상태</th></tr>'
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
				recent_on_index++
			}
		}
		if(recent_on_index == 0){
			clearTimeout(tot);
			var ot=time[recent_on_index].split('.');
			var ott=ot[3].split(':');
			(function updateTime(){
				var dating = new Date();
				var month = dating.getMonth()+1;
				var date = dating.getDate();
				var hour = dating.getHours();
				var minute = dating.getMinutes();
				var second = dating.getSeconds();
				if(month==1){
					month = 13;
					month = month - ot[1];
					month = month*31
				}else{
					if(month==2){
						month = month - ot[1];
						month = month*31
					}else if(month==3){
						month = month - ot[1];
						month = month*28
					}else if(month==4){
						month = month - ot[1]
						month = month*31
					}else if(month==5){
						month = month - ot[1]
						month = month*30;
					}else if(month==6){
						month = month - ot[1]
						month = month*31
					}else if(month==7){
						month = month - ot[1]
						month = month*30
					}else if(month==8){
						month = month - ot[1]
						month = month*31
					}else if(month==9){
						month = month - ot[1]
						month = month*31
					}else if(month==10){
						month = month -ot[1]
						month = month*30
					}else if(month==11){
						month = month - ot[1]
						month = month*31
					}else if(month==12){
						month = month - ot[1]
						month = month*30
					}
				}
				date = date - ot[2];
				date = month+date;
				hour = hour - ott[0];
				hour = (date*24)+hour;
				minute = minute - ott[1];
				minute = (hour*60)+minute;
				second = second - ott[2];
				if(second < 0){
					second = 60+second
					minute = minute - 1
				}
				$('#on_off_time_at').empty();
				$('#on_off_time_at').append('가동시간: <b>'+minute+'분 '+second+'초</b>');
				tot=setTimeout(updateTime, 1000);	
			})();
		}else{
			clearTimeout(tot)
			var oft = time[recent_on_index-1].split('.')
			var oftt = oft[3].split(':')
			var ont = time[recent_on_index].split('.')
			var ontt = ont[3].split(':')
			var fomonth;
			var fodate;
			var fominute;
			var fosecond;
			if(oft[1] == 1){
				fomonth = 13
				fomonth = fomonth - ont[1];
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
			fodate = oft[2] - ont[2];
			fodate = fomonth + fodate;
			fohour = oftt[0] - ontt[0];
			fohour = (fodate*24)+fohour;
			fominute = oftt[1] - ontt[1];
			fominute = (fohour*60)+fominute;
			fosecond = oftt[2] - ontt[2];
			if(fosecond <0){
				fosecond = 60+fosecond
				fominute = fominute - 1;
			}
			$('#on_off_time_at').empty();
			$('#on_off_time_at').append('가동시간: <b>'+fominute+'분 '+fosecond+'초</b>');
		}
		var rot = time[recent_on_index].split('.');
		var rott = rot[3].split(':');
		$('#sol_on_time').empty();
		$('#sol_on_time').append("최근 개방 시각<br>- "+rot[0]+"/"+rot[1]+"/"+rot[2]+" "+rott[0]+"시 "+rott[1]+"분 "+rott[2]+"초");
		if(status[0]=="on"){
			$('#sol_status').empty();
			$('#sol_status').append('현재 상태: 개방');
		}else if(status[0]=="off"){
			$('#sol_status').empty();
			$('#sol_status').append('현재 상태: 폐쇄');
		}
		if(count < 8){
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
		var eight = Math.floor(count/8)
		var eight3 = count/8;
		if((eight3-eight)!=0){
			eight+=1
		}
		if(eight<=10){
			output += '<tr><td colspan="2">'
			for(var i=0; i<eight; i++){
				output += '<a style="cursor:pointer;" class="pageNum" id="pageNumber'+(i+1)+'">'+(i+1)+'</a>&nbsp;&nbsp;'
			}
			output += '</td></tr></table>'
		}else{
			output += '<tr><td colspan="2">'
			for(var i=0; i<10; i++){
				output += '<a style="cursor:pointer;" class="pageNum" id="pageNumber'+(i+1)+'">'+(i+1)+'</a>&nbsp;&nbsp;'
			}
			output += '</td></tr></table>'
		}
		$('#record').append(output)
	});
	$('body').on('click', '.pageNum', function(){
		var count1 = 0;
		var pn = 0;
		var page_num = this.getAttribute('id');
		var output1 = ''
		output1 +='<table border="1" width="250px" style="border-collapse:collapse"><tr><th width="80%">시간</th><th width="20%">상태</th></tr>'
		$.getJSON('/record', function(data){
			var time1 = new Array();
			var status1 = new Array();
			$(data).each(function(index, item){
				time1.push(item.time);
				status1.push(item.status);
				count1++;
			});
			var eight1 = Math.floor(count1/8);
			var eight2 = count1/8;
			if((eight2-eight1)!=0){
				eight1+=1
			}
			for(var i=1; i<eight1+1; i++){
				if('pageNumber'+i==page_num){
					pn=i
				}
			}
			if((pn*8)==count){
				for(var i = ((pn-1)*8); i<(pn*8); i++){
					output1 += '<tr><td>'+time1[i]+'</td><td>'+status1[i]+'</td></tr>'
				}
			}else if(((pn-1)*8)<count&&count<(pn*8)){
				for(var i=((pn-1)*8); i<count; i++){
					output1 += '<tr><td>'+time1[i]+'</td><td>'+status1[i]+'</td></tr>'
				}
				for(var i=count; i<(pn*8); i++){
					output1 += '<tr><td>&nbsp;</td><td>&nbsp;</td></tr>'
				}
			}else{
				for(var i = ((pn-1)*8); i<(pn*8); i++){
					output1 += '<tr><td>'+time1[i]+'</td><td>'+status1[i]+'</td></tr>'
				}
			}
			if(eight1<=10){
				output1 += '<tr><td colspan="2">'
				for(var i=0; i<eight1; i++){
					output1 += '<a style="cursor:pointer;" class="pageNum" id="pageNumber'+(i+1)+'">'+(i+1)+'</a>&nbsp;&nbsp;'
				}
			}else{
				output1 +='<tr><td colspan="2">'
				for(var i=0; i<10; i++){
					output1 += '<a style="cursor:pointer;" class="pageNum" id="pageNumber'+(i+1)+'">'+(i+1)+'</a>&nbsp;&nbsp;'
				}
			}
			output1 += '</td></tr></table>'
			$('#record').empty();
			$('#record').append(output1);
		})
	})
})
