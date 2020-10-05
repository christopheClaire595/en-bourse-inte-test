$('button:not(.close)').each(function(){
	$(this).on('click',function(){
		$(this).html('<i class="las la-spinner"></i>').attr("disabled", false).css('cursor','not-allowed');
		$('#exampleModal').modal('toggle')
	})
})
