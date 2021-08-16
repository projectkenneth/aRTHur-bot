# aRTHur The Bot

aRTHur is a Twitter bot that automatically retweets tweets based on a configured query. Its name is derived from the username of the very first Twitter account that it controls ([@ReadTechHere](https://twitter.com/ReadTechHere)) which can be shortened to RTH.  

## How it works

### Tech Stack

aRTHur is built using NodeJS and is using [twitter-lite](https://github.com/draftbit/twitter-lite) as its Twitter client library. The bot code is packaged as an [Azure Function](https://docs.microsoft.com/en-us/azure/azure-functions/create-first-function-vs-code-node).  More importantly, [Twitter API access](https://developer.twitter.com/) has also been configured beforehand.

### Configuration
The configuration model is defined in `config.js`. All the configuration properties are currently pulled from the environment variables. Once deployed as an Azure Function, the environment variables can be defined using the Azure Portal.

For reference, the ff. items are configurable:
1. **Twitter API Tokens**
2. **Search Query** - this is the query passed to [Twitter's Recent Search API](https://developer.twitter.com/en/docs/twitter-api/tweets/search/introduction)
3. **Timing and Limits** - this defines the number of tweets that will be retrieved and how far back in time should the tweets be. Note that the actual execution of the Azure Function is defined separately in `host.json`. 

With this level of configurability, something like this can be defined: *"Every 4 hours, get 50 tweets from the past 4 hours."* without updating the code.

### Search Query
To allow the retrieval of tech-related tweets, a carefully selected set of hashtags are used in the query. Additionally, the query also only retrieves original tweets (no retweets, no replies) in English.

Here's a snippet of the query used by aRTHur:

    #javascript OR #js OR #nodejs OR #azure) -is:retweet -is:reply lang:en

More details on building a Twitter Search Query can be found [here](https://developer.twitter.com/en/docs/twitter-api/tweets/search/integrate/build-a-query).

## Todo
- Since Twitter's Recent Search API imposes a character limit on the Search Query, a round-robin query approach needs to be implemented. This way, everytime the bot runs, a different set of tweets can be retrieved at certain points in time. This enables the bot to cover more topics.
- Decouple the bot code from the Azure Function.