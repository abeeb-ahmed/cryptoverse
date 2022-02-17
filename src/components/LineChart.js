import React from "react";
import { Stack, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import millify from "millify";

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }
  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(
      new Date(
        coinHistory?.data?.history[i]?.timestamp * 1000
      ).toLocaleDateString()
    );
  }
  console.log(coinTimestamp);

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `${coinName} Line Chart`,
      },
    },
  };

  return (
    <div className="line-chart">
      <div className="live-chart-header">
        <Typography
          gutterBottom
          variant="h5"
          color="#1a1a40"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          {coinName} Price Chart
        </Typography>
        <Stack direction="row" justifyContent="space-around">
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {coinName} Price Change: {coinHistory?.data?.change}%
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {coinName} Current Price:{" "}
            {currentPrice && millify(Number(currentPrice))}$
          </Typography>
        </Stack>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
