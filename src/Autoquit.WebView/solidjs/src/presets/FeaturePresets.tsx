import { IGlobalStoreKeyPreset } from "../interfaces/IGlobalStore";

export const featurePresets : IGlobalStoreKeyPreset[] = [
    { key: 'scanThrottling', name: 'Scan throttling', desc: "Improve performance by reducing scan frequency" },
    { key: 'recordMouseMovement', name: 'Trace mouse movement', desc: "Record mouse movement as well" },
    { key: 'scanAll', name: 'Include system processes', desc: "Display system processes in the scan result" },
    { key: 'enableLogging', name: 'Enable Logging', desc: "To detect issues' root cause, enabling logging could help we figure out what happened" },
]
