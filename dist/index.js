"use strict";
/**
 * File where exports all required only functions, classes
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Structures = exports.Interface = exports.CacheManager = exports.Util = exports.UserPlayer = exports.UserClient = exports.Browse = exports.Show = exports.Episode = exports.Artist = exports.Album = exports.Track = exports.Playlist = exports.User = exports.Auth = exports.Client = exports.version = void 0;
const Client_1 = __importDefault(require("./Client"));
exports.Client = Client_1.default;
const Auth_1 = __importDefault(require("./lib/Auth"));
exports.Auth = Auth_1.default;
const User_1 = __importDefault(require("./lib/User"));
exports.User = User_1.default;
const Playlist_1 = __importDefault(require("./lib/Playlist"));
exports.Playlist = Playlist_1.default;
const Track_1 = __importDefault(require("./lib/Track"));
exports.Track = Track_1.default;
const Album_1 = __importDefault(require("./lib/Album"));
exports.Album = Album_1.default;
const Artist_1 = __importDefault(require("./lib/Artist"));
exports.Artist = Artist_1.default;
const Browse_1 = __importDefault(require("./lib/Browse"));
exports.Browse = Browse_1.default;
const Episode_1 = __importDefault(require("./lib/Episode"));
exports.Episode = Episode_1.default;
const Show_1 = __importDefault(require("./lib/Show"));
exports.Show = Show_1.default;
const Spotify_1 = __importDefault(require("./Spotify"));
exports.Util = Spotify_1.default;
const UserClient_1 = __importDefault(require("./UserClient"));
exports.UserClient = UserClient_1.default;
const UserPlayer_1 = __importDefault(require("./UserPlayer"));
exports.UserPlayer = UserPlayer_1.default;
const CacheManager_1 = __importDefault(require("./CacheManager"));
exports.CacheManager = CacheManager_1.default;
const Interface = __importStar(require("./structures/Interface"));
exports.Interface = Interface;
/**
 * To view up the version of the package.
 *
 * **Example:**
 * ```js
 * const spotify = require('spotify-api.js');
 * console.log(spotify.version);
 * ```
 *
 * Always try to update your spotify-api.js to v7.x.x
 */
const version = '7.0.0';
exports.version = version;
const Album_2 = __importDefault(require("./structures/Album"));
const Artist_2 = __importDefault(require("./structures/Artist"));
const Episode_2 = __importDefault(require("./structures/Episode"));
const Playlist_2 = __importStar(require("./structures/Playlist"));
const Track_2 = __importStar(require("./structures/Track"));
const User_2 = __importDefault(require("./structures/User"));
const Show_2 = __importDefault(require("./structures/Show"));
const Player_1 = require("./structures/Player");
exports.Structures = {
    Track: Track_2.default,
    Album: Album_2.default,
    Artist: Artist_2.default,
    Episode: Episode_2.default,
    Playlist: Playlist_2.default,
    Show: Show_2.default,
    PlaylistTrack: Playlist_2.PlaylistTrack,
    PublicUser: User_2.default,
    LinkedTrack: Track_2.LinkedTrack,
    Device: Player_1.Device,
    Playback: Player_1.Playback,
    PlayHistory: Player_1.PlayHistory
};
exports.default = Client_1.default;
