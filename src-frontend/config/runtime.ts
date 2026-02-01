// dev pulls from astro data, live pulls from tauri, auto decides based on environment
export type DataMode = "dev" | "live" | "auto";
export const DATA_MODE: DataMode = "dev";