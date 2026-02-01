
export interface backup {
    id: string;
    name: string;
    taken: string; // iso date
    path: string;
    sizeBytes: number; // in bytes
}