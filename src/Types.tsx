export type ShinyComponent = {
    id: string;
    nuget: string;
    description: string;
    version: string;
}

export const DEFAULT_VERSION: string = "3.0.0-alpha-0560";

export const ShinyComponents: ShinyComponent[] = [
    {
        "id": "beacons",
        "nuget": "Shiny.Beacons",
        "description": "Beacons",
        "version": DEFAULT_VERSION
    },
    {
        "id": "ble",
        "nuget": "Shiny.BluetoothLE",
        "description": "Bluetooth LE",
        "version": DEFAULT_VERSION
    },
    {
        "id": "blehosting",
        "nuget": "Shiny.BluetoothLE.Hosting",
        "description": "Bluetooth LE Hosting",
        "version": DEFAULT_VERSION
    },
    {
        "id": "jobs",
        "nuget": "Shiny.Jobs",
        "description": "Periodic Jobs",
        "version": DEFAULT_VERSION
    },
    {
        "id": "gps",
        "nuget": "Shiny.Locations",
        "description": "GPS",
        "version": DEFAULT_VERSION
    },
    {
        "id": "geofencing",
        "nuget": "Shiny.Locations",
        "description": "Geofencing",
        "version": DEFAULT_VERSION
    },
    {
        "id": "httptransfers",
        "nuget": "Shiny.Net.Http",
        "description": "HTTP file uploads and downloads",
        "version": DEFAULT_VERSION
    },
    {
        "id": "notifications",
        "nuget": "Shiny.Notifications",
        "description": "Local Notifications",
        "version": DEFAULT_VERSION
    },
    {
        "id": "speech",
        "nuget": "Shiny.SpeechRecognition",
        "description": "Speech Recognition",
        "version": DEFAULT_VERSION
    },
    {
        "id": "push",
        "nuget": "Shiny.Push",
        "description": "Push Notifications (Native)",
        "version": DEFAULT_VERSION
    },
    {
        "id": "config",
        "nuget": "Shiny.Extensions.Configuration",
        "description": "Configuration",
        "version": DEFAULT_VERSION
    },
    {
        "id": "appcenter",
        "nuget": "Shiny.Logging.AppCenter",
        "description": "AppCenter Logging",
        "version": DEFAULT_VERSION
    }
    // {
    //     "id": "framework",
    //     "nuget": "Shiny.Framework",
    //     "description": "Shiny Framework (Brings Together Prism, ReactiveUI, & Shiny)",
    //     "version": "3.0.0-alpha-0065"
    // }
];

export const Data = {
    hasComponent(id: string, comps: ShinyComponent[]): boolean {
        return comps.find(c => c.id === id) !== undefined;
    },

    usesPush(compos: ShinyComponent[]): boolean {
        return compos.filter(x => x.id.indexOf('push') > -1).length > 0;
    }
};