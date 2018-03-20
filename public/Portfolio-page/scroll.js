$(document).ready(function(){
	$('.option1').click(function(){
		$('html,body').animate({
			scrollTop: $('#self-intro').offset().top
		},800);
		$('.collapse').toggle()
	});
	$('.option2').click(function(){
		$('html,body').animate({
			scrollTop: $('#showskill').offset().top
		},800);
		$('.collapse').toggle()
	});
	
	$('.option5').click(function(){
		$('html,body').animate({
			scrollTop: $('#contactMe').offset().top
		},800);
		$('.collapse').toggle()
	});
	$('.navbar-toggle').click(function(){
		$('.collapse').toggle()
	})
});