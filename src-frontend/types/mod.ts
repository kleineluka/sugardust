export interface ModData {
    // required
    id: string;
    name: string;
    version: string;
    author: string;
    description?: string;
    // optional and trickier stuffs..
    tags?: string[];
    icon?: string; // path or base64
    lastUpdated?: string; // iso date
    minimumGameVersion?: string; // e.g. "1.0.0"
    homepage?: string; // url
    repository?: string; // url
}
