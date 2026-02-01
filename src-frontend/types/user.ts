import type { Config } from "./config";
import type { ModloaderData } from "./modloader";
import type { ModLocal } from "./local";
import type { ProfileData } from "./profile";
import type { backup } from "./backup";

export interface UserData {
    config: Config;
    modloader: ModloaderData;
    mods: ModLocal[];
    profilesEnabled: boolean;
    profiles: ProfileData[];
    activeProfileId: string | null;
    operatingSystem: "windows" | "macos" | "linux" | "steamdeck";
    freeStorageBytes?: number; // prevent download if low on space
    backups: backup[];
}