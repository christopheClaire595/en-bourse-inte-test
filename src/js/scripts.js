$('button.link').each(function(){
	$(this).on('click',function(){
		$(this).html('<i class="las la-spinner"></i>').attr("disabled", true).css('cursor','not-allowed');
		$('#exampleModal').modal('toggle')
	})
})


$('#exampleModal .close').on('click',function(){
	$('button.link').attr("disabled", false).css('cursor','pointer').html('Être informer de l’ouverture <i class="las la-angle-double-right"></i>')
});

$('.carousel').carousel({
  interval: 5000
})