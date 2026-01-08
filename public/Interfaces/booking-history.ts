import { BookingStatus } from "@/lib/bookingStatus";

export interface fetchDataBookingHistory {
    booking_list:BookingList;
    count_booking_list:number;
}

export interface links {
    url:string | null;
    label:string;
    active:boolean;
}

export interface BookingList{
    current_page:number;
    data:any[] | [];
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

export interface BookingHistory {
    id:number;
    booking_number:string;
    user_id:number;
    user_code:string;
    user_name:string;
    user_grade:string;
    phone_number:string;
    return_at:string;
    subject:string;
    teacher:string;
    activity_name:string;
    participants:number;
    status:BookingStatus;
    remark:string;
    booking_status_histories:booking_status_last[] | null | undefined;
    item_booking_histories:item_booking_histories[];
    subjects?:any;
    created_at:string;
    updated_at:string;
}

export interface item_booking_histories {
    id:number;
    product_id: number | null;
    product_name: string;
    product_stock_history_id:number;
    booking_history_id:number;
    product_category:string;
    product_type:string;
    product_unit?:string;
    product_quantity:number;
    product_quantity_return:number;
    status:string;
    created_at:string;
    updated_at:string;
    product?:any;
}

export interface booking_status_last {
    id:number;
    booking_id:number;
    status:string;
    remark:string
    created_at:string;
    updated_at:string;
}
