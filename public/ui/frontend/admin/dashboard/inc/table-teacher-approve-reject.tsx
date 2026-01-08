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
import { chart_stack1, chart_stack2, purple_fade } from "@/constants/theme-chart";
export interface DataChart {
  label: string[];
  data_reject: number[];
  data_approve: number[];
}

export default function TeacherApproveReject({ serchDate = "" }: { serchDate?: Date | string }) {
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
      const res = await fetch(
        "/medadm/api/dashboard/booking-approve-by-teacher"
      );
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
        display: true,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const data = {
    labels: items?.label,
    datasets: [
      {
        label: "อนุมัติ",
        data: items?.data_approve,
        backgroundColor: chart_stack1,
      },
      {
        label: "ปฏิเสธ",
        data: items?.data_reject,
        backgroundColor: chart_stack2,
      },
    ],
  };

  return (
    <div className="p-5 flex flex-col shadow-lg rounded-md w-full h-[360px]">
      <div className="text-lg font-medium mb-2">
        แผนภูมิแสดงอาจารย์แต่ละท่าน อนุมัติ / ปฏิเสธ
      </div>
      <div className="flex-1">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}
