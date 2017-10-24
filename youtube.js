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
			channelId : null,
			part: 'snippet',
			q: null,
			type: 'video',			//Possible values are : channel, playlist, video
			order: 'date'			//Possible values are : rating, relevance, title, viewCount
		},
		setOptions: function(userOptions) {
			// Replace Options with the provided ones
			Object.assign(this.options, userOptions);
		},
		searchURL: `${youtubeAPI.baseURL}/${youtubeAPI.apiVersion}/search?key={youtubeAPI.apiKey}`,
		list: function() {
			return new Promise(function(resolve, reject){
				var completeURL = this.searchURL + youtubeAPI.stringifyOptions(this.options);
				youtubeAPI.getJSONResult(completeURL)
				.done(function(data){
					resolve(data);
				}).catch(err){
					reject(err);
				};
			});
		}
	},
	video: {
		options: {
			part : 'snippet,contentDetails,statistics'
		},
		setOptions: function(userOptions) {
			// Replace Options with the provided ones
			Object.assign(this.options, userOptions);
		},
		videoURL: `${youtubeAPI.baseURL}/${youtubeAPI.apiVersion}/videos?key={youtubeAPI.apiKey}`,
		list: function(videoId) {
			return new Promise(function(resolve, reject){
				var completeURL = `${this.videoURL}&id=${videoId}${youtubeAPI.stringifyOptions(this.options)}`;
				youtubeAPI.getJSONResult(completeURL)
				.done(function(data){
					resolve(data);
				}).catch(err){
					reject(err);
				};
			});
		}
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
		var strOptions = '';
		for (var key in options) {
			// Check if value is empty or null
			if (options[key] != null && options[key] !== '') {
				strOptions += `&${key}=${options[key]}`;
			}
		}
		return strOptions;
	}
}
