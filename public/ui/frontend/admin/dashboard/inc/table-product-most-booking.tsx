"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Colors,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { mixed_colors, purple_fade } from "@/constants/theme-chart";
export interface DataChart {
  label: string[];
  data: number[];
}

export default function ProductMostBooking({ serchDate = "" }: { serchDate?: Date | string }) {
  const [items, setItems] = useState<DataChart>();

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Colors,
    Legend
  );

  useEffect(() => {
    const getItems = async () => {
      const res = await fetch("/medadm/api/dashboard/most-product-booking");
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
        display: false,
      },
    },
  };

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
    <div className="p-5 flex flex-col shadow-lg rounded-md w-full h-[360px]">
      <div className="text-lg font-medium mb-2">
        แผนภูมิแสดงวัสดุ-อุปกรณ์ที่ยืมบ่อยที่สุด
      </div>
      <div className="flex-1">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}