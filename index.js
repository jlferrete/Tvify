$(function() {
	var $tvShowsContainer = $('#app-body').find('div.tv-shows');
	
	function renderShows(shows) {
		$tvShowsContainer.find('.loader').remove();
		shows.forEach(function (show) {
			var article = template
				.replace(':name:', show.name)
				.replace(':img:', show.image.medium)
				.replace(':summary:', show.summary)
				.replace(':img alt', show.name + " Logo")
						
			var $article = $(article)
			$article.hide();
			$tvShowsContainer.append($article.show());
		})
	}
  
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
			
		$tvShowsContainer.find('.tv-show').remove();
		var $loader = $('<div class="loader">');
		$loader.appendTo($tvShowsContainer);
		$.ajax({
			url: 'http://api.tvmaze.com/search/shows',
			data: { q: busqueda },
			success: function (res, textStatus, xhr) {
				$loader.remove();
				var shows = res.map(function (el) {
					return el.show;
				})
				renderShows(shows);
			}
		})
	})
	
	var template ='<article class="tv-show">' +
          '<div class="left img-container">' +
            '<img src=":img:" alt=":img alt:">' +
          '</div>' +
          '<div class="right info">' +
            '<h1>:name:</h1>' +
            '<p>:summary:</p> ' +
          '</div>' +
        '</article>';
	
	if (!localStorage.shows) {
		$.ajax('http://api.tvmaze.com/shows')
			.then(function (shows){
				$tvShowsContainer.find('.loader').remove();
				localStorage.shows = JSON.stringify(shows);
				renderShows(shows);
			})
	} else {
		renderShows(JSON.parse(localStorage.shows));
	}
})