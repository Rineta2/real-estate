import { ChartData } from "../types/dashboard";

export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "top" as const,
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: "rgba(0, 0, 0, 0.05)",
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};

export const initialChartData: ChartData = {
  labels: [],
  datasets: [
    {
      label: "Property Listings",
      data: [],
      fill: true,
      backgroundColor: "rgba(124, 58, 237, 0.1)",
      borderColor: "rgba(124, 58, 237, 1)",
      tension: 0.4,
    },
    {
      label: "Inquiries",
      data: [],
      fill: true,
      backgroundColor: "rgba(16, 185, 129, 0.1)",
      borderColor: "rgba(16, 185, 129, 1)",
      tension: 0.4,
    },
    {
      label: "New Users",
      data: [],
      fill: true,
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      borderColor: "rgba(59, 130, 246, 1)",
      tension: 0.4,
    },
  ],
};
