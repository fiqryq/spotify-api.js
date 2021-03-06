/**
 * Artist Structure
 */
import { Image } from './Interface';
import Util from '../Spotify';
import Client from '../Client';
import Album from './Album';
import Track from './Track';

/**
 * Structure for the Spotify Api's Artist Object!
 */
class Artist{

    readonly data: any;
    readonly client!: Client;

    externalUrls: any;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
    images: Image[];
    albums: Album[];
    topTracks: Track[];
    relatedArtists: Artist[];
    simplified: boolean;

    totalFollowers?: number;
    genres?: string;
    popularity?: number;

    /**
     * Structure for the Spotify Api's Artist Object!
     * 
     * @param data Received Raw data by the Spotify Api!
     * @param client Your Spotify Client!
     * @example const artist = new Artist(data, client);
     */
    constructor(data: any, client: Client){

        Object.defineProperty(this, 'data', { value: data, writable: false });
        Object.defineProperty(this, 'client', { value: client, writable: false });

        this.externalUrls = data.external_urls;
        this.href = data.href;
        this.id = data.id;
        this.name = data.name;
        this.type = data.type;
        this.uri = data.uri;
        this.images = data.images || [];
        this.albums = [];
        this.topTracks = [];
        this.relatedArtists = [];
        this.simplified = true;

        if('popularity' in data) {
            this.simplified = false;
            this.totalFollowers = data.followers.total;
            this.genres = data.genres;
            this.popularity = data.popularity;
        }

    };

    /**
     * Returns a code image of the artist!
     * @param color Hex color code
     */
    makeCodeImage(color: string = '1DB954'): string {
        return `https://scannables.scdn.co/uri/plain/jpeg/${color}/${(Util.hexToRgb(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }

    /**
     * Refetches the artist and refreshes the cache!
     */
    async fetch(): Promise<Artist> {
        return await this.client.artists.get(this.id, true);
    }

    /**
     * Returns the albums of the artist
     * 
     * @param limit Limit of your results
     * @param force If true will directly fetch else will return from cache
     */
    async getAlbums(limit: number = 20, force: boolean = false): Promise<Album[]> {
        if(!force && this.albums.length) return this.albums;

        const data = await this.client.artists.getAlbums(this.id, { limit });
        this.albums = data;
        return data;
    }

    /**
     * Returns the top tracks of the artist
     * 
     * @param force If true will directly fetch else will return from the cache!
     */
    async getTopTracks(force: boolean = false): Promise<Track[]> {
        if(!force && this.topTracks.length) return this.topTracks;

        const data = await this.client.artists.getTopTracks(this.id);
        this.topTracks = data;
        return data;
    }

    /**
     * Returns the artists who are related with the current artist
     * 
     * @param force If true will directly fetch else will return from cache
     */
    async getRelatedArtists(force: boolean = false): Promise<Artist[]> {
        if(!force && this.relatedArtists.length) return this.relatedArtists;

        const data = await this.client.artists.getRelatedArtists(this.id);
        this.relatedArtists = data;
        return data;
    }

    /**
     * Verify if this artist is followed by the current user but only if you have the required scopes for the current user
     * This method uses the client.user.followsArtist method
     */
    async follows(): Promise<boolean> {
        return (await this.client.user.followsArtist(this.id))[0];
    }

    /**
     * Follow this artist
     */
    async follow(): Promise<void> {
        await this.client.user.followArtist(this.id);
    }

    /**
     * Unfollow this artist
     */
    async unfollow(): Promise<void> {
        await this.client.user.unfollowArtist(this.id);
    }

};

export default Artist;