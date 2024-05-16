
    export type RemoteKeys = 'host/counterStore';
    type PackageType<T> = T extends 'host/counterStore' ? typeof import('host/counterStore') :any;