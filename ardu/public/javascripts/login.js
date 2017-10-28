$(document).ready(function(){
	$("#login_button").click(function(){
		$.post("/login_register",{name:$("#name").val()}, function(data){
			if(data.length==0){
				$('#idpassfalse').empty();
				$('#idpassfalse').append("이름 또는 비밀번호를 확인해주십시오");
			} else {
				if(($("#name").val()==data[0].name) && $("#password").val()==data[0].password){
					$.post("/login",{name:$("#name").val()}, function(data){
						if(data==="done"){
				          	window.location="/admin";
					    }
					});
				} else if($("#name").val()==data[0].name){
					$('#idpassfalse').empty();
					$('#idpassfalse').append("이름 또는 비밀번호를 확인해주십시오");
				}
			}
		});
	});
	
	$("#main_page").click(function(){
		$(location).attr("href","/")
	});
});
