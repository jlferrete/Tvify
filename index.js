$(function() {
  /**
  * Submit search form
  */
  $('#app-body')
	.find('form')
	.submit(function (ev){
		ev.preventDefault();
		var busqueda = $(this)
			.find('input[type="text"]')
			.val();
		alert('Se ha buscado: ' + busqueda); 
	})
})