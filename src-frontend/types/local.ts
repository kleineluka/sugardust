import type { ModData } from "./mod";

export interface ModLocal {
    data: ModData;
    installedVersion: string;
    enabled: boolean;
    installedAt: string; // iso date
}
