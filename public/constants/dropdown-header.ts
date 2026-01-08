export const dropdowns = [
    {
        permission: null,
        links: [
            {
                label: "ประวัติการจอง",
                link: "/booking-history"
            },
            {
                label: "บัญชีของฉัน",
                link: "/personal-information"
            },

        ]
    },
    {
        permission: "Teacher",
        links: [
            {
                label: "ภาพรวม",
                link: "/medtch/dashboard"
            },
            {
                label: "รายการอนุมัติ",
                link: "/medtch"
            },
        ]
    },
    {
        permission: "Administrator",
        links: [
            {
                label: "รายงานสรุปผล",
                link: "/medadm"
            },
            {
                label: "จัดการคำขอ",
                link: "/medadm/requests"
            },
            {
                label: "จัดการวัสดุ",
                link: "/medadm/products"
            },
        ]
    },
]