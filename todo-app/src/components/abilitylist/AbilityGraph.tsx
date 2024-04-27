import React, { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import { fireStoreJob } from "../../initFirebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  QuerySnapshot,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import styled from "styled-components";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const MyRadarChart = () => {
  const [chartData, setChartData] = useState({
    labels: ["체력", "지력", "창의력", "정서", "재력"],
    datasets: [
      {
        label: "능력치",
        data: [0, 0, 0, 0, 0],
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        aspectRatio: 1,
      },
    ],
  });

  useEffect(() => {
    const q = query(
      collection(fireStoreJob, "todos"),
      where("status", "==", "DONE")
    );

    const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot) => {
      const stats = { 체력: 0, 지력: 0, 창의력: 0, 정서: 0, 재력: 0 };

      snapshot.forEach((doc: QueryDocumentSnapshot) => {
        const task = doc.data();
        if (task.category && stats.hasOwnProperty(task.category)) {
          stats[task.category as keyof typeof stats] += 1;
        }
      });

      setChartData((prevChartData) => ({
        ...prevChartData,
        datasets: [
          {
            ...prevChartData.datasets[0],
            data: Object.values(stats),
          },
        ],
      }));
    });

    return () => unsubscribe();
  }, []);

  return (
    <ChartContainer>
      <Radar data={chartData} />
    </ChartContainer>
  );
};

const ChartContainer = styled.div`
  width: 40%;
  height: auto;
`;

export default MyRadarChart;
