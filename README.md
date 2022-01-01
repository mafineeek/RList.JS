# How to use this lib?

## Please, note that to perform requests such as posting stats, you need you **private** token, which ___**CAN NOT BE REGENERATED**___. Token can be found in edit page of your bot.

<div></div>

## Examples

```js
const { Bot } = require('roadsterlist-api'); //Import our lib
const rlistClient = new Bot('secrettoken', 'mydiscordbotid') //Initialize our class
(async() => {
    await rlistClient.postStats({guilds: client.guilds.cache.size, users: client.users.cache.size}) //Example for DiscordJS
})(); //Call it

//Tada! Stats are pushed to server
```

```js
const { Bot } = require('roadsterlist-api'); //Import our lib
const rlistClient = new Bot('secrettoken', 'mydiscordbotid') //Initialize our class
(async() => {
    await rlistClient.userVoted('911542985727025173', '854342480019587133')
})(); //Call it

//Tada! You checked it!
```