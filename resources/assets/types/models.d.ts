interface Texture<T extends 'steve' | 'alex' | 'cape' = 'steve'> {
    readonly tid: number;
    name: string;
    type: T;
    likes: number;
    hash: string;
    size: number;
    uploader: User | null;
    public: boolean;
}

declare enum UserPermission {
    Banned = 'BANNED',
    Normal = 'NORMAL',
    Admin = 'ADMIN',
    SuperAdmin = 'SUPER_ADMIN'
}

interface User {
    readonly uid: number;
    nickname: string;
    email: string;
    score: number;
    avatar: number;
    ip: string;
    permission: UserPermission;
    last_signed_at: string;
    registered_at: string;
    players: Player[];
    closet: ClosetItem[];
}

interface Player {
    readonly pid: number;
    owner: User;
    player_name: string;
    preference: 'default' | 'slim';
    steve: Texture<'steve'>;
    alex: Texture<'alex'>;
    cape: Texture<'cape'>;
    last_modified: string;
}

interface ClosetItem {
    texture: Texture<'steve' | 'alex' | 'cape'>;
    item_name: string;
}
