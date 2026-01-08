import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string;
    name: string;
    code: string;
    type: string;
    category: string;
    image: string | null;
    stock: number;
    quantity: number;
}

interface CartStore {
    // items: CartItem[];
    // setItem: (item: CartItem) => void;
    // removeItem: (id: string) => void;
    // clearCart: () => void;
    cart_count: number;
    cart_count_list: number;
    setCartCount: (count: number) => void;
    setCartCountList: (count: number) => void;
}

export const useCartStore = create<CartStore>()(persist(
    (set) => ({
        cart_count: 0,
        cart_count_list: 0,
        setCartCount: (count) => set({ cart_count: count }),
        setCartCountList: (count) => set({ cart_count_list: count }),
        // items: [],
        // setItem: (item) => set((state) => {
        //     const existing = state.items.find((i) => i.id === item.id);
        //     if (existing) {
        //         return {
        //             items: state.items.map((i) =>
        //                 i.id === item.id
        //                     ? { ...i, quantity: item.quantity }
        //                     : i
        //             )
        //         };
        //     }
        //     return { items: [...state.items, item] };
        // }),

        // removeItem: (id) => set((state) => ({
        //     items: state.items.filter((item) => item.id !== id)
        // })),


        // clearCart: () => set(() => {
        //     return { items: [] };
        // }),
    }),
    { name: 'cart-store' }
));

