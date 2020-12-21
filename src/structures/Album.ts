/**
 * Full Album structure
 */
import Util from '../Spotify';
import Artist from './Artist';
import Track from './Track';
import { Copyright, Image, Restriction } from './Interface';
import Client from '../Client';

/**
 * Album structure class
 */
class Album {

    readonly data: any;
    readonly client: Client;
    readonly tracks: Track[];

    albumType: 'album' | 'single' | 'compilation';
    availableMarkets: string[];
    externalUrls: any;
    href: string;
    id: string;
    images: Image[];
    name: string;
    releaseDate: string;
    releaseDatePrecision: string;
    type: string;
    uri: string;
    label: string | null;
    restrictions: Restriction | null;
    totalTracks?: number;
    copyrights?: Copyright[];
    externalIds?: any;
    popularity?: number;
    genres?: any[];

    /**
     * **Example:**
     * 
     * ```js
     * const album = new Album(data);
     * ```
     * 
     * @param data Received raw data from the spotify api
     * @param client Spotify Client
     */
    constructor(data: any, client: Client){

        Object.defineProperty(this, 'data', { value: data, writable: false });
        Object.defineProperty(this, 'client', { value: client, writable: false });

        this.albumType = data.album_type;
        this.availableMarkets = data.available_markets;
        this.externalUrls = data.external_urls;
        this.href = data.href;
        this.id = data.id;
        this.images = data.images;
        this.name = data.name;
        this.releaseDate = data.release_date;
        this.releaseDatePrecision = data.release_date_precision;
        this.type = data.type;
        this.uri = data.uri;
        this.totalTracks = data.total_tracks;
        this.label = data.label || null;
        this.restrictions = data.restrictions || null;

        if('popularity' in data){
            this.popularity = data.popularity;
            this.genres = data.genres;
            this.copyrights = data.copyrights;
            this.externalIds = data.external_ids;
        }

        Object.defineProperty(this, 'tracks', { get: () => this.data.tracks.items.map(x => new Track(x, this.client)) });

    };

    /**
     * Returns a code image
     * @param color Hex color code
     */
    makeCodeImage(color: string = '1DB954'): string {
        return `https://scannables.scdn.co/uri/plain/jpeg/${color}/${(Util.hexToRgb(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }

    /**
     * Returns the array of simplified artist
     * @readonly
     */
    get artists(): Artist[] {
        return this.data.artists.map(x => new Artist(x, this.client));
    };

    /**
     * Returns date structure of this.releaseDate
     * @readonly
     */
    get releasedAt(): Date {
        return new Date(this.releaseDate);
    };

    /**
     * Returns a fresh current album object instead of caching
     */
    async fetch(): Promise<Album> {
        return await this.client.albums.get(this.id, true);
    };

    /**
     * Returns the tracks of the album
     * 
     * @param force If true will directly fetch instead of searching cache
     * @param limit Limit your results
     */
    async getTracks(force: boolean = false, limit: number = 20): Promise<Track[]> {
        if(!force && this.tracks.length) return this.tracks;

        const data = await this.client.albums.getTracks(this.id);
        Object.defineProperty(this, 'tracks', { value: data });
        return data;
    };

};

export default Album;