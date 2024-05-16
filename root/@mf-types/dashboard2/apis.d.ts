
    export type RemoteKeys = 'dashboard2/dashboard';
    type PackageType<T> = T extends 'dashboard2/dashboard' ? typeof import('dashboard2/dashboard') :any;