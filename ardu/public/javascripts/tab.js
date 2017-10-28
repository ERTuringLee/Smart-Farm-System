$(document).ready(function(){
	$(".tab_content").hide();
	$(".tab_content:first").show();
	$("ul.tabs li").click(function() {
		$("ul.tabs li").removeClass("active").css("color", "#333");
		$(this).addClass("active").css("color", "darked");
		$(".tab_content").hide();
		var activeTab = $(this).attr("rel");
		$("#"+activeTab).fadeIn();
	});
	$(".tab_content2").hide();
	$(".tab_content2:first").show();
	$("ul.tabs2 li").click(function(){
		$("ul.tabs2 li").removeClass("active").css("color", "#333");
		$(this).addClass("active").css("color", "darked");
		$(".tab_content2").hide();
		var activeTab2 = $(this).attr("rel");
		$('#'+activeTab2).fadeIn();
	});
	$(".tab_content3").hide();
	$(".tab_content3:first").show();
	$("ul.tabs3 li").click(function(){
		$("ul.tabs3 li").removeClass("active").css("color", "#333");
		$(this).addClass("active").css("color", "darked");
		$(".tab_content3").hide();
		var activeTab3 = $(this).attr("rel");
		$('#'+activeTab3).fadeIn()
	});
});
