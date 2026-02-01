import type { ModData } from "../types/mod";
import { DATA_MODE } from "../config/runtime";
import { invoke } from "@tauri-apps/api/tauri";

// mock data for dev mode
export const mockMods: ModData[] = [
    {
        id: "kyus-super-cute-mod",
        name: "KYU IS THE BEST!",
        version: "4.2.0",
        author: "Kleine",
        description: "I just really like Kyu...",
        tags: ["ui", "qol"],
        icon: "images/builtin/missing.webp",
        lastUpdated: "2026-02-01",
        minimumGameVersion: "1.0.0",
        repository: "https://github.com/",
    },
];

export async function fetchMods(): Promise<ModData[]> {
    if (DATA_MODE === "dev") {
        // return mock data in dev mode
        return mockMods;
    } else {
        // in live mode, fetch from Tauri backend
        const response = await invoke<ModData[]>("get_mods");
        return response;
    }
}