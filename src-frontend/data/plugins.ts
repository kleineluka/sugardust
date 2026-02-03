import type { PluginConfigFile, ConfigSection, ConfigEntry, ConfigValueType } from '../types/plugin';

function parseSettingType(typeStr: string): ConfigValueType {
    const normalized = typeStr.trim();
    if (normalized === 'Boolean') return 'Boolean';
    if (normalized === 'String') return 'String';
    if (normalized === 'Int32') return 'Int32';
    if (normalized === 'Single') return 'Single';
    if (normalized === 'Double') return 'Double';
    return 'Unknown';
}

export function parseConfigFile(content: string): PluginConfigFile {
    const lines = content.split('\n');
    
    let pluginName = '';
    let pluginVersion = '';
    let pluginGuid = '';
    const sections: ConfigSection[] = [];
    let currentSection: ConfigSection | null = null;
    
    let pendingDescription = '';
    let pendingType: ConfigValueType = 'Unknown';
    let pendingDefault = '';
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();
        
        if (trimmed.startsWith('## Settings file was created by plugin')) {
            const match = trimmed.match(/plugin (.+) v([\d.]+)/);
            if (match) {
                pluginName = match[1];
                pluginVersion = match[2];
            }
        }
        else if (trimmed.startsWith('## Plugin GUID:')) {
            pluginGuid = trimmed.replace('## Plugin GUID:', '').trim();
        }
        else if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
            if (currentSection) {
                sections.push(currentSection);
            }
            currentSection = {
                name: trimmed.slice(1, -1),
                entries: []
            };
            pendingDescription = '';
            pendingType = 'Unknown';
            pendingDefault = '';
        }
        else if (trimmed.startsWith('##') && !trimmed.startsWith('## Settings') && !trimmed.startsWith('## Plugin')) {
            pendingDescription = trimmed.replace('##', '').trim();
        }
        else if (trimmed.startsWith('# Setting type:')) {
            const typeStr = trimmed.replace('# Setting type:', '').trim();
            pendingType = parseSettingType(typeStr);
        }
        else if (trimmed.startsWith('# Default value:')) {
            pendingDefault = trimmed.replace('# Default value:', '').trim();
        }
        else if (trimmed.includes('=') && !trimmed.startsWith('#') && currentSection) {
            const eqIndex = trimmed.indexOf('=');
            const key = trimmed.slice(0, eqIndex).trim();
            const value = trimmed.slice(eqIndex + 1).trim();
            
            const entry: ConfigEntry = {
                key,
                value,
                description: pendingDescription,
                type: pendingType,
                defaultValue: pendingDefault
            };
            
            currentSection.entries.push(entry);
            pendingDescription = '';
            pendingType = 'Unknown';
            pendingDefault = '';
        }
    }
    
    if (currentSection) {
        sections.push(currentSection);
    }
    
    return {
        pluginName,
        pluginVersion,
        pluginGuid,
        sections,
        rawContent: content
    };
}

export function serializeConfigFile(config: PluginConfigFile): string {
    let output = '';
    
    output += `## Settings file was created by plugin ${config.pluginName} v${config.pluginVersion}\n`;
    output += `## Plugin GUID: ${config.pluginGuid}\n\n`;
    
    for (const section of config.sections) {
        output += `[${section.name}]\n\n`;
        
        for (const entry of section.entries) {
            if (entry.description) {
                output += `## ${entry.description}\n`;
            }
            output += `# Setting type: ${entry.type}\n`;
            output += `# Default value: ${entry.defaultValue}\n`;
            output += `${entry.key} = ${entry.value}\n\n`;
        }
    }
    
    return output.trim() + '\n';
}

export function updateConfigEntry(
    config: PluginConfigFile,
    sectionName: string,
    entryKey: string,
    newValue: string
): PluginConfigFile {
    return {
        ...config,
        sections: config.sections.map(section => {
            if (section.name !== sectionName) return section;
            return {
                ...section,
                entries: section.entries.map(entry => {
                    if (entry.key !== entryKey) return entry;
                    return { ...entry, value: newValue };
                })
            };
        })
    };
}
