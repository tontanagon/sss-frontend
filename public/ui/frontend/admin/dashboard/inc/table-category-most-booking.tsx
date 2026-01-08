"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Colors,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { DataChart } from "./table-product-most-booking";
import { purple_fade } from "@/constants/theme-chart";

export default function CategoryMostBooking({ serchDate = "" }: { serchDate?: Date | string }) {
  const [items, setItems] = useState<DataChart>();

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Colors,
    ArcElement,
    Legend
  );

  useEffect(() => {
    const getItems = async () => {
      const res = await fetch("/medadm/api/dashboard/most-category-booking");
      const data = await res.json();
      setItems(data);
    };
    getItems();
  }, [serchDate]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#171717",
          font: {
            size: 14,
          },
          // usePointStyle: true,
          boxWidth: 15,
        },
      },
    },
  } as const;

  const data = {
    labels: items?.label,
    datasets: [
      {
        label: "จำนวนครั้ง",
        data: items?.data,
        backgroundColor: purple_fade,
      },
    ],
  };

  return (
    <div className="p-5 shadow-lg rounded-md w-full h-[360px] flex flex-col">
      <div className="text-lg font-medium mb-2">
        แผนภูมิแสดงประเภทวัสดุ-อุปกรณ์ที่ยืมบ่อยที่สุด
      </div>
      <div className="flex-1">
        <Doughnut options={options} data={data} />
      </div>
    </div>
  );
}
