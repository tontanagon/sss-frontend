import { faBookBookmark, faBookmark, faBox, faBoxOpen, faChartPie, faClipboardList, faClockRotateLeft, faFileCircleCheck, faFileCircleXmark, faFileText, faFolder, faGears, faList, faNewspaper, faSquareCheck, faSquareXmark, faTags, faUser, faUserShield, IconDefinition } from "@fortawesome/free-solid-svg-icons";


interface ISidemenu {
    title: string;
    menu: IMenu[]
}

interface IMenu {
    name: string;
    link: string;
    icon: IconDefinition;
    styleIcon: string;
    status?: string | null;
}

export const sidemenus: ISidemenu[] = [
    {
        title: 'รายงานสรุปผล',
        menu: [
            {
                name: 'ภาพรวม',
                link: "/medadm",
                icon: faChartPie,
                styleIcon: 'mr-1',
            }
        ],
    },
    {
        title: 'รายการคำขอ',
        menu: [
            {
                name: 'ทั้งหมด',
                link: "/medadm/requests",
                icon: faList,
                styleIcon: 'mr-3',
                status: null,
            },
            {
                name: 'รออนุมัติ',
                link: "/medadm/requests",
                icon: faFileText,
                styleIcon: 'mr-3',
                status: "pending",
            },
            {
                name: 'รอจัดของ',
                link: "/medadm/requests",
                icon: faFileCircleCheck,
                styleIcon: 'mr-1',
                status: "approved",
            },
            {
                name: 'รอรับอุปกรณ์',
                link: "/medadm/requests",
                icon: faBox,
                styleIcon: 'mr-3',
                status: "packed",
            },
            {
                name: 'กำลังใช้งาน',
                link: "/medadm/requests",
                icon: faBoxOpen,
                styleIcon: 'mr-1',
                status: "inuse",
            },
            {
                name: 'รอตรวจสอบคืน',
                link: "/medadm/requests",
                icon: faBox,
                styleIcon: 'mr-2',
                status: "returned",
            },
            {
                name: 'ของไม่ครบ',
                link: "/medadm/requests",
                icon: faSquareXmark,
                styleIcon: 'mr-2',
                status: "incomplete",
            },
            {
                name: 'เกินกำหนดคืน',
                link: "/medadm/requests",
                icon: faClockRotateLeft,
                styleIcon: 'mr-1',
                status: "overdue",
            },
            {
                name: 'คืนสำเร็จ',
                link: "/medadm/requests",
                icon: faSquareCheck,
                styleIcon: 'mr-1',
                status: "completed",
            },
            {
                name: 'ยกเลิก',
                link: "/medadm/requests",
                icon: faFileCircleXmark,
                styleIcon: 'mr-1',
                status: "reject",
            },
        ],
    },
    {
        title: 'วัสดุอุปกรณ์',
        menu: [
            {
                name: 'รายการวัสดุ',
                link: "/medadm/products",
                icon: faClipboardList,
                styleIcon: 'mr-2'
            },
            {
                name: 'หมวดหมู่',
                link: "/medadm/categories",
                icon: faFolder,
                styleIcon: 'mr-2'
            },
            {
                name: 'Tag',
                link: "/medadm/tags",
                icon: faTags,
                styleIcon: 'mr-2'
            },
        ],
    },
    {
        title: 'ผู้ใช้งาน',
        menu: [
            {
                name: 'จัดการผู้ใช้งาน',
                link: "/medadm/users",
                icon: faUser,
                styleIcon: 'mr-2'
            },
            {
                name: 'จัดการสิทธิ์ผู้ใช้งาน',
                link: "/medadm/roles",
                icon: faUserShield,
                styleIcon: 'mr-1'
            },
        ],
    },
    {
        title: 'จัดการเว็บไซต์',
        menu: [
            {
                name: 'จัดการ Banner',
                link: "/medadm/banner-management",
                icon: faBookmark,
                styleIcon: 'mr-2'
            },
            {
                name: 'จัดการกระบวนวิชา',
                link: "/medadm/subject-management",
                icon: faBookBookmark,
                styleIcon: 'mr-2'
            },
            {
                name: 'ตั้งค่าเว็บไซต์',
                link: "/medadm/setting-website",
                icon: faNewspaper,
                styleIcon: 'mr-2'
            },
        ],
    },

]