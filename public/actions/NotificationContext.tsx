"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { fetchWrapper } from "@/lib/fetchwrapper";

interface NotiContextType {
  noti: any[] | undefined;
}

const NotiContext = createContext<NotiContextType>({
  noti: [],
});

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [noti, setNoti] = useState<any>();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  useEffect(() => {
    const getNoti = async () => {
      const res = await fetchWrapper(`/api/notification/unread?limit=100`);
      const data = await res.json();
      setNoti(data.data);
    };

    if (session?.user) {
      getNoti();
    }
  }, [pathname, session?.user]);

  return (
    <NotiContext.Provider value={{ noti }}>{children}</NotiContext.Provider>
  );
};

export const useNotification = () => useContext(NotiContext);
