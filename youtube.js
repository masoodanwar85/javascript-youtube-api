var youtubeAPI = {
	baseURL: 'https://www.googleapis.com/youtube',
	apiVersion: 'v3',
	resultsPerPage: 10,
	apiKey: null,
	apiMethods: {
		'searchMethod' : 'search',
		'videoMethod' : 'videos',
		'commentsMethod' : 'comments'
	},
	init: function(apiKey,resultsPerPage) {
		this.apiKey = apiKey;
		this.resultsPerPage = resultsPerPage;
	},
	
	search: {
		
	},
	video: {
		
	},
	comments: {
		
	},
	getJSONResult: function(url) {
		return new Promise(function(resolve, reject){
			$$.getJSON(url, function (ytResponse) {
				resolve(ytResponse);
			});
		});
	}
}
