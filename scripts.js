$('button:not(.close)').each(function(){
	$(this).on('click',function(){
		$(this).html('<i class="las la-spinner"></i>').attr("disabled", true).css('cursor','not-allowed');
		$('#exampleModal').modal('toggle')
	})
})


$('#exampleModal .close').on('click',function(){
	$('button:not(.close)').attr("disabled", false).css('cursor','pointer').text('Être informer de l’ouverture')
});