function parseEnvInt(val, defaultValue) {
    var output = parseInt(val);

    if (isNaN(output)) {
        output = defaultValue;
    }

    return output;
}

var _batchLimit = parseEnvInt(process.env.RTH_BATCH_LIMIT, 20);
var _startTime = parseEnvInt(process.env.RTH_START_TIME, 4);

module.exports = {
    consumerKey: process.env.RTH_CONSUMER_KEY,
    consumerSecret: process.env.RTH_CONSUMER_SECRET,
    accessTokenKey: process.env.RTH_ACCESS_TOKEN_KEY,
    accessTokenSecret: process.env.RTH_ACCESS_TOKEN_SECRET,
    bearerToken: process.env.RTH_BEARER_TOKEN,
    batchLimit: _batchLimit,
    searchQuery: process.env.RTH_SEARCH_QUERY,
    startTime: _startTime,
    startTimeUnit: process.env.RTH_START_TIME_UNIT
}