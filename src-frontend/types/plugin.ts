export type ConfigValueType = 'Boolean' | 'String' | 'Int32' | 'Single' | 'Double' | 'Unknown';

export interface ConfigEntry {
    key: string;
    value: string;
    description: string;
    type: ConfigValueType;
    defaultValue: string;
}

export interface ConfigSection {
    name: string;
    entries: ConfigEntry[];
}

export interface PluginConfigFile {
    pluginName: string;
    pluginVersion: string;
    pluginGuid: string;
    sections: ConfigSection[];
    rawContent: string;
}
