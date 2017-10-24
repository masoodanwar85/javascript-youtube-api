var youtubeAPI = {
	baseURL: 'https://www.googleapis.com/youtube',
	apiVersion: 'v3',
	apiKey: null,
	init: function(apiKey) {
		this.apiKey = apiKey;
	},
	
	search: {
		options: {
			maxResults: 25,
			part: 'snippet',
			q: null,
			type: null
		},
		setOptions: function(optionsObj) {
			// Replace Options with the provided ones
		},
		searchURL: `${youtubeAPI.baseURL}/${youtubeAPI.apiVersion}/?key={youtubeAPI.apiKey}`,
		list: function() {
			return new Promise(function(resolve, reject){
				var completeURL = this.searchURL + youtubeAPI.stringifyOptions(this.options);
				this.getJSONResult(completeURL).done(function(data){
					resolve(data);
				}).catch(err){
					reject(err);
				};
			});
		}
	},
	video: {
		
	},
	comments: {
		
	},
	getJSONResult: function(url) {
		return new Promise(function(resolve, reject){
			try {
				$.getJSON(url, function (ytResponse) {
					resolve(ytResponse);
				});
			} catch (e) {
				reject(e);
			}
		});
	},
	stringifyOptions: function(options) {
		
	}
}
