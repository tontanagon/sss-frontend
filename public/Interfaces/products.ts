export interface Items {
    id: number |string;
    name: string;
    code: string;
    image: any;
    description: null | string;
    category_ids: number[];
    tags:string[];
    status: string;
    type: string;
    unit: string;
    stock:any;
    type_id: number;
    category?: string;
    updated_at?:string;
}

export interface Category {
    id:number;
    name: string;
    image: any;
    description:string;
    status:string;
}

export interface Type {
    id:number;
    name: string;
    image: any;
    description:string;
    status:string;
}

export interface Tag {
    id:number;
    name: string;
    image: any;
    description:string;
    status:string;
}

export interface links {
    url:string | null;
    label:string;
    active:boolean;
}

export interface Paginations{
    current_page:number;
    data:any[] | [];
    first_page_url:string;
    from:number;
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
