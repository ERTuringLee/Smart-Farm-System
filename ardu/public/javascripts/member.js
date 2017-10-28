$(document).ready(function () {
	$.get('/session', function(data){
		if(!data[0]){
			$(location).attr('href',"/login");
		}else{

		}
	});

})
