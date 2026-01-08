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
import { purple_fade } from "@/constants/theme-chart";
export interface DataChart {
  label: string[];
  data: number[];
}

export default function LessOutStock({
  serchDate = "",
}: {
  serchDate?: Date | string;
}) {
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
      try {
        const res = await fetch("/medadm/api/dashboard/less-out-stock");
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error(error)
      }
    };
    getItems();
  }, [serchDate]);

  //   const data = {
  //   labels: ["วัสดุ A", "วัสดุ B", "วัสดุ C"],
  //   datasets: [
  //     {
  //       label: "ใกล้หมด",
  //       data: [5, 2, 0],
  //       backgroundColor: "#f59e0b", // สีส้ม
  //     },
  //     {
  //       label: "หมดแล้ว",
  //       data: [0, 1, 3],
  //       backgroundColor: "#ef4444", // สีแดง
  //     },
  //   ],
  // };

  // const options = {
  //   indexAxis: "x", // ทำแนวนอน
  //   responsive: true,
  //   plugins: { legend: { position: "top" } },
  //   scales: {
  //     x: { beginAtZero: true },
  //   },
  // };

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
        label: "จำนวนคงเหลือ",
        data: items?.data,
        backgroundColor: purple_fade,
      },
    ],
  };

  return (
    <div className="p-5 flex flex-col shadow-lg rounded-md w-full h-[360px]">
      <div className="text-lg font-medium mb-2">
        แผนภูมิแสดงวัสดุ-อุปกรณ์ที่ใกล้หมดคลัง , หมดคลัง
      </div>
      <div className="flex-1">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}
