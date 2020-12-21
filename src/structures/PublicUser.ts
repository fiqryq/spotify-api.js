/**
 * Public User Structure
 */
import { Image } from "./Interface";
import Client from '../Client';
import Playlist from './Playlist';

/**
 * Public User Class
 */
class PublicUser {

    readonly data: any;
    readonly client: Client;

    name: string;
    externalUrls: any;
    href: string;
    id: string;
    type: string;
    uri: string;
    images: Image[];
    playlists: Playlist[];
    codeImage: string;

    totalFollowers?: number;

    /**
     * **Example:**
     * 
     * ```js
     * const user = new PublicUser(data);
     * ```
     * 
     * @param data Received raw data from the spotify api
     * @param client Main client
     */
    constructor(data: any, client: Client){

        Object.defineProperty(this, 'data', { value: data, writable: false });
        Object.defineProperty(this, 'client', { value: client, writable: false });

        this.name = data.display_name;
        this.externalUrls = data.external_urls;
        this.href = data.href;
        this.id = data.id;
        this.type = data.type;
        this.uri = data.uri;
        this.images = data.images || [];
        this.playlists = [];
        this.codeImage = `https://scannables.scdn.co/uri/plain/jpeg/e8e6e6/black/1080/${data.uri}`;
        if('followers' in data) this.totalFollowers = data.followers.total;

    };

    /**
     * Fetches tracks
     */
    async fetch(): Promise<PublicUser> {
        return await this.client.users.get(this.id, true);
    }

    /**
     * Returns you the user playlists
     * 
     * @param force If true will directly fetch and return else will return you from cache
     * @param limit Limit of results
     */
    async getPlaylists(force: boolean = false, limit: number = 20): Promise<Playlist[]> {
        if(!force){
            if(this.playlists.length) return this.playlists;
        }

        const data = await this.client.users.getPlaylists(this.id, { limit });
        this.playlists = data;
        return data;
    }
    
};

export default PublicUser;