<div align="center">
  <img src="https://media.discordapp.net/attachments/736466510888960020/760853915876327464/Sa.png?width=718&height=275"><br>
  <div>
    <a href="https://spotify-api.js.org"><img src="https://img.shields.io/badge/READ-DOCS-orange?style=for-the-badge"></a>
    <a href="https://github.com/spotify-api/spotify-api.js/"><img src="https://img.shields.io/github/repo-size/spotify-api/spotify-api.js?label=Size&style=for-the-badge"></a>
    <a href="https://www.npmjs.com/package/spotify-api.js"><img src="https://img.shields.io/npm/v/spotify-api.js?label=Version&style=for-the-badge"></a>
    <a href="https://discord.gg/FrduEZd"><img src="https://img.shields.io/discord/736099894963601438?label=Discord&style=for-the-badge"></a>
  </div><br>
</div>

# About

Spotify-api.js was initially started as an alternative for basic spotify api fetching! Then soon people needed upgrades, so we worked on it and we have made a fully working typed library for spotify api! This package still might have bugs which will be fixed in future slowly. You can create an issue now to fix it as soon as possible!
=======
Spotify-api.js is a promise based quick wrapper for spotify web api which covers the all the api endpoints!<br/>
You can join our discord server for additional support from [here](https://discord.gg/FrduEZd).<br/>
**WARNING:** Make sure you are using v6 of spotify-api.js as v5 has many bugs and axios security fix! Secondly docs is outdated and not meant for v6!
>>>>>>> master

# Features 

- Full Typescript Support
- Object oriented
- Easy to learn
- Covers 90% of spotify api methods as javascript functions
- Works with browser too!

# Examples

## Getting started

Installing the package!

```sh
npm i spotify-api.js@latest
```

Getting your client id and client secret from [here](https://developer.spotify.com/dashboard/)

## Setting up Spotify Client!

```js
const Spotify = require("spotify-api.js");
const Auth = new Spotify.Auth();

const token = await Auth.get({
    clientId: "client id",
    clientSecret: "client secret",
});

const Client = new Spotify.Client(token);
```

## Getting a current user token!

Get a current user authorized token or just refresh to get a new one!

```js
const Spotify = require('spotify-api.js');
const Auth = new Spotify.Auth();

const Token = await Auth.refresh({
    clientId: 'id', // Your app client id
    clientSecret: 'secret', // Your app client secret
    code: 'token or code', // To get new one, enter the code received by spotify api or to refresh to get a new one, enter the refreshToken!
    redirectUrl: 'redirect uri' // Redirect uri which you used while auth, which is only for verification
});

console.log(Token.accessToken);
```

## UserClient and UserPlayer

Spotify-api.js newer version helps you access the current user and its player efficiently.

```js
const Client = new Spotify.Client("USERTOKEN");
const User = Client.user;

User.followArtist("SOME ARTIST ID");
```

And most of the player methods of the current user are not tested as it needs spotify premium. So if you found any kind of bugs please create an issue!

## Caching

We have built an easy cache system to prevent you from spamming the spotify api!

> Note: By Default cache option is turned off to prevent unwanted memory leak so we recommend you to only use it in case of high usage.

```js
const Spotify = require('spotify-api.js');

// Defining cache options
const DefaultCacheOptions = {
    cacheTracks: true, // incase I only want to cache the tracks only I will this to true
    cacheUsers: false,
    cacheCategories: false,
    cacheEpisodes: false,
    cacheShows: false,
    cachePlaylists: false,
    cacheArtists: false,
    cacheAlbums: false,
    cacheCurrentUser: false,
    cacheFollowers: null
};

const client = new Spotify.Client("TOKEN", DefaultCacheOptions) // passing the cache options
await client.tracks.get("ID"); // The track is now cached
client.cache.tracks.get("ID"); // Returns TrackStructure which is been fetched previously else will return null
await client.tracks.get("ID"); // Second time using the function will return cache one
await client.tracks.get("ID", true); // Using second param will force fetch instead of searching cache!
```

Incase if you have selected cacheCurrentUser option, the client will fetch and cache the current user details on the client start so sometimes the program will start early before client caches so you can do something like this!

```js
const Client = new Spotify.Client("USER_TOKEN", { cacheCurrentuser: true });

function onCacheReady(){
    console.log('Client cache is ready!');
}

if(!Client.madeCache) Client.cacheOnReady = onCacheReady;
else onCacheReady();
```

There is a small event for caching! You can view up those in the v7 docs!

# Docs to be updated
