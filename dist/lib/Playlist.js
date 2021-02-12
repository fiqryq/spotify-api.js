"use strict";
/**
 * Playlist Manager file
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
const Error_1 = require("../Error");
const Spotify_1 = __importDefault(require("../Spotify"));
const Playlist_1 = __importStar(require("../structures/Playlist"));
/**
 * Class of all Spotify Api Methods related to playlists
 */
class PlaylistManager extends Spotify_1.default {
    /**
     * Class of all Spotify Api Methods related to playlists
     *
     * @param client Your Spotify Client
     */
    constructor(client) {
        super(client.token);
        this.client = client;
    }
    /**
     * Returns the information of Spotify Playlist by its id!
     *
     * @param id Id of the playlist
     * @param force If true then will fetch directly instead of searching cache
     * @example const playlist = await spotify.playlists.get("id"); // Get playlist data by id
     */
    async get(id, force = false) {
        if (!id)
            throw new Error_1.MissingParamError("missing id");
        if (!force) {
            let existing = this.client.cache.playlists.get(id);
            if (existing)
                return existing;
        }
        try {
            const data = new Playlist_1.default(await this.fetch({ link: `v1/playlists/${id}` }), this.client);
            if (this.client.cacheOptions.cachePlaylists)
                this.client.cache.playlists.push(data);
            return data;
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    ;
    /**
     * Returns the tracks of the playlist by the playlist id!
     *
     * @param id Id of the playlist
     * @param options Options to configure your search
     * @example const tracks = await spotify.playlists.getTracks("id", { limit: 1 }); // Get all tracks in an album by id. Has advanced option too...
     */
    async getTracks(id, options = { limit: 20 }) {
        if (!id)
            throw new Error_1.MissingParamError("missing id");
        try {
            const data = await this.fetch({
                link: `v1/playlists/${id}/tracks`,
                params: {
                    market: "US",
                    limit: options.limit,
                    ...options.params
                },
            });
            return data.items.map(x => new Playlist_1.PlaylistTrack(x, this.client));
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    ;
    /**
     * Returns the images of the playlist by the playlist id!
     *
     * @param id Playlist id
     * @example const [coverImage] = await spotify.playlists.getCoverImage('id') // Get cover image of the playlist by id
     */
    async getImages(id) {
        if (!id)
            throw new Error_1.MissingParamError('missing playlist id');
        try {
            return await this.fetch({ link: `v1/playlists/${id}/images` });
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    ;
    /**
     * Follow a playlist by id! Will work only if you have a current user token!
     *
     * @param id Id of the playlist
     */
    async follow(id) {
        await this.client.user.followPlaylist(id);
    }
    /**
     * Unfollow a playlist by id! Will work only if you have a current user token!
     *
     * @param id Id of the playlist
     */
    async unfollow(id) {
        await this.client.user.unfollowPlaylist(id);
    }
}
exports.default = PlaylistManager;
;
