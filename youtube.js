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
			pageToken: null,
			nextPageToken: null,
			prevPageToken: null,
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
		list: function(page) {
			page = page || 'next';
			this.options.pageToken = page == 'next' ? this.options.nextPageToken : this.options.prevPageToken;
			return new Promise(function(resolve, reject){
				var completeURL = this.searchURL + youtubeAPI.stringifyOptions(this.options);
				youtubeAPI.getJSONResult(completeURL)
				.done(function(data){
					// Update pageToken, nextPageToken, PrevPageToken
					this.options.nextPageToken = data.nextPageToken;
					this.options.prevPageToken = data.prevPageToken;
					data.isLastPage = data.nextPageToken == null? true: false;
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
				var completeURL = `${this.videoURL}&id=${videoId}${youtubeAPI.convertOptionsToURLString(this.options)}`;
				youtubeAPI.getJSONResult(completeURL)
				.done(function(data){
					resolve(data);
				}).catch(err){
					reject(err);
				};
			});
		}
	},
	videoComments: {
		options: {
			part: 'snippet,replies',
			pageToken: null,
			nextPageToken: null,
			prevPageToken: null,
			channelId : null,
			maxResults: 25,
		},
		setOptions: function(userOptions) {
			Object.assign(this.options, userOptions);
		},
		videoCommentsURL : `${youtubeAPI.baseURL}/${youtubeAPI.apiVersion}/commentThreads?key={youtubeAPI.apiKey}`,
		list: function(videoId, page) {
			page = page || 'next';
			this.options.pageToken = page == 'next' ? this.options.nextPageToken : this.options.prevPageToken;
			return new Promise(function(resolve, reject){
				var completeURL = `${this.videoCommentsURL}&videoId=${videoId}${youtubeAPI.convertOptionsToURLString(this.options)}`;
				youtubeAPI.getJSONResult(completeURL)
				.done(function(data){
					// Update pageToken, nextPageToken, PrevPageToken
					this.options.nextPageToken = data.nextPageToken;
					this.options.prevPageToken = data.prevPageToken;
					data.isLastPage = data.nextPageToken == null? true: false;
					resolve(data);
				}).catch(err){
					reject(err);
				};
			});
		}
	},
	categories: {
		options: {
			part: 'snippet',
			regionCode: 'US',
			hl: 'EN',
			defaultRegionCode: 'US',
			categoryId: null,
			categoryType: 'videos'		// The Other option is 'guide'
		},
		setOptions: function(userOptions) {
			Object.assign(this.options, userOptions);
		},
		guideCategoriesURL : `${youtubeAPI.baseURL}/${youtubeAPI.apiVersion}/guideCategories?key={youtubeAPI.apiKey}`,
		videoCategoriesURL : `${youtubeAPI.baseURL}/${youtubeAPI.apiVersion}/videoCategories?key={youtubeAPI.apiKey}`,
		
		list: function(categoryId, regionCode) {
			this.options.categoryId = categoryId || null;
			this.options.regionCode = regionCode || this.options.defaultRegionCode;
			categoryId == null ? this.options.regionCode = this.options.defaultRegionCode : this.options.regionCode = null;
			
			return new Promise(function(resolve, reject){
				var completeURL = `${this.videoCategoriesURL}${youtubeAPI.convertOptionsToURLString(this.options)}`;
				if (categoryType == 'guide') {
					var completeURL = `${this.guideCategoriesURL}${youtubeAPI.convertOptionsToURLString(this.options)}`;
				}
				youtubeAPI.getJSONResult(completeURL)
				.done(function(data){
					resolve(data);
				}).catch(err){
					reject(err);
				};
			});
		}
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
	convertOptionsToURLString: function(options) {
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
