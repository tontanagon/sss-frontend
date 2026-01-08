'use client'
import { useRouter } from "next/navigation";

export function useSearchParamsHandler() {
    const router = useRouter();

    const setSearchParams = (params_type: string, value: any) => {
        const currentParams = new URLSearchParams(window.location.search);

        if (params_type === "search_status") {
            currentParams.set("page", "1");
            currentParams.set("search_status", encodeURIComponent(JSON.stringify(value)));
        } else if (params_type === "limit" || params_type === "search_text") {
            currentParams.set(params_type, value.toString());
            currentParams.set("page", "1");
        } else if (params_type === "page") {
            currentParams.set(params_type, value.toString());
        } else if (params_type === "all") {
            router.replace(window.location.pathname, { scroll: false });
            return;
        }

        router.replace(`?${currentParams.toString()}`, { scroll: false });
    };

    return { setSearchParams };
}