import type { ModLocal } from "./local";

export interface ProfileData {
    id: string;
    name: string;
    createdAt: string; // iso date
    modifiedAt: string; // iso date
    mods: ModLocal[];
}
