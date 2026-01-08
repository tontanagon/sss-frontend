export interface Role {
    id: number;
    name: string;
    permissions: any[];
}

export interface UserInformation {
    id: number;
    name: string;
    login_type: string;
    image: any;
    password: string | null;
    email: string;
    roles: string[];
}

export interface Permissions {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
}
