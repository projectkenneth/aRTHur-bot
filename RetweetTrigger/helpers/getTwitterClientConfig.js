module.exports = function(config, v = '2', isUserContext = true) {
    var def = {
        version: v
    };

    if (v == '2') {
        def.extension = false;
    }

    if (isUserContext) {
        def.consumer_key = config.consumerKey;
        def.consumer_secret = config.consumerSecret;
        def.access_token_key = config.accessTokenKey;
        def.access_token_secret = config.accessTokenSecret
    } else{
        def.bearer_token = config.bearerToken;
    }

    return def;
}