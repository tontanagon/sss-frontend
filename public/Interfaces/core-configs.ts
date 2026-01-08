import { links } from "./booking-history";

export interface CoreConfigs {
    id: number;
    name: string | null;
    code: string | null;
    link: string | null;
    cover: string | null;
    title: string | null;
    description: string | null;
    content: string | null;
    group: string | null;
    category: string | null;
    status: string | null;
    created_at: string | null;
    updated_at: string | null;
}

export interface PagenateCoreConfigs{
    current_page:number;
    data:CoreConfigs[] | [];
    first_page_url:string;
    from:number | null;
    last_page:number;
    last_page_url:string;
    links:links[];
    next_page_url:string | null;
    path:string;
    per_page:number;
    prev_page_url:string | null;
    to:number | null;
    total:number
}

export interface CoreConfigsForm {
    name: string | null;
    code: string | null;
    link: string | null;
    cover: string | null;
    title: string | null;
    description: string | null;
    content: string | null;
    group: string | null;
    category: string | null;
    status: string | null;
}