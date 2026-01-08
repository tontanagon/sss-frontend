import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            provider_id: string;
            name?: string | null;
            user_code?: string | null;
            user_grade?: string | null;
            email: string;
            token: string;
            role: string;
        };
    }

    interface User {
        user_info: {
            id: string;
            provider_id: string;
            name?: string | null;
            user_code?: string | null;
            user_grade?: string | null;
            email: string;
            token: string;
            role: string;
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        provider_id: string;
        name?: string | null;
        user_code?: string | null;
        user_grade?: string | null;
        email: string;
        accessToken: string;
        role: string;
    }
}
