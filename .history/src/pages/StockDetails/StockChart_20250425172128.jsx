import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactApexChart from "react-apexcharts";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarketChart } from "@/Redux/Coin/Action";

const timeSeries = [
  { lable: "1 Day", value: 1 },
  { lable: "1 Week", value: 7 },
  { lable: "1 Month", value: 30 },
  { lable: "3 Month", value: 90 },
  { lable: "6 Month", value: 180 },
  { lable: "1 Year", value: 365 },
];

const StockChart = ({ coinId }) => {
  const [activeType, setActiveType] = useState(timeSeries[0]);
  const { coin } = useSelector((store) => store);
  const dispatch = useDispatch();

  const series = [
    {
      data: coin.marketChart.data?.prices?.map(([timestamp, price]) => ({
        x: new Date(timestamp).toISOString(),
        y: price,
      })) || [],
    },
  ];

  const options = {
    chart: {
      id: "area-datetime",
      type: "area",
      height: 350,
      zoom: { autoScaleYaxis: true },
    },
    xaxis: { type: "datetime", tickAmount: 6 },
    colors: ["#758AA2"],
    tooltip: { theme: "dark" },
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.9, stops: [0, 100] },
    },
    grid: { borderColor: "#47535E", strokeDashArray: 4, show: true },
  };

  useEffect(() => {
    if (coinId) {
      dispatch(fetchMarketChart({ coinId, days: activeType.value }));
    }
  }, [coinId, activeType.value]);

  if (coin.marketChart.loading) {
    return (
      <div className="h-full w-full inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
        <div className="w-16 h-16 border-4 border-t-4 border-t-gray-200 border-gray-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <div id="charts">
        <div className="toolbars space-x-2">
          {timeSeries.map((item) => (
            <Button
              onClick={() => setActiveType(item)}
              key={item.lable}
              variant={activeType.lable !== item.lable ? "outline" : ""}
            >
              {item.lable}
            </Button>
          ))}
        </div>
        <div id="chart-timelines">
          <ReactApexChart options={options} series={series} type="area" height={450} />
        </div>
      </div>
    </div>
  );
};
StockChart.propTypes = {
  coinId: PropTypes.string.isRequired,
};
export default StockChart;
