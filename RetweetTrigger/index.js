var Twitter = require('twitter-lite');
var moment = require('moment');

var CONFIG = require('./config.js');

var getTwitterClientConfig = require('./helpers/getTwitterClientConfig.js');
const retweetClient = new Twitter(getTwitterClientConfig(CONFIG, '1.1'));
const searchClient = new Twitter(getTwitterClientConfig(CONFIG, '2', false));

module.exports = async function (context, myTimer) {
    try {
        var searchReq = {
            'query': CONFIG.searchQuery,
            'start_time': moment().subtract(CONFIG.startTime, CONFIG.startTimeUnit).format(),
            'max_results': CONFIG.batchLimit
        };
        
        context.log('Searching for relevant tweets from the past ' + CONFIG.startTime + ' ' + CONFIG.startTimeUnit + '.');

        var resp = await searchClient.get('tweets/search/recent', searchReq);

        if (resp.data && resp.data.length > 0) {
            for (var i = 0; i < resp.data.length; i++) {
                await retweetClient.post('statuses/retweet', {
                    id: resp.data[i].id
                });
            }
            
            context.log('Successfully retweeted ' + resp.data.length + ' tweets.');
        }
    } catch (e) {
        context.log(e);
    }
};