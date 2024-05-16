
    export type RemoteKeys = 'dashboard1/dashboard';
    type PackageType<T> = T extends 'dashboard1/dashboard' ? typeof import('dashboard1/dashboard') :any;