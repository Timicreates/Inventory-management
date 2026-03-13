"use client";
import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Area,
  Tooltip,
} from "recharts";

interface chartData {
  week: string;
  products: number;
}

const ProductsChart = ({ data }: { data: chartData[] }) => {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          /* margin left is set to -20 to pull the numbers closer to the edge. 
             This gives the actual chart area more width to stretch. 
          */
          margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--background)"
            className="opacity-30"
            vertical={false}
          />
          <XAxis
            dataKey="week"
            stroke="#666"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            minTickGap={20}
          />
          <YAxis
            stroke="#666"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
            /* width 40 ensures there is enough room for the numbers without wasting space */
            width={40}
          />
          <Area
            type="monotone"
            dataKey="products"
            stroke="#8b5cf6"
            fill="#8b5cf6"
            fillOpacity={0.2}
            strokeWidth={2}
            dot={{ fill: "#8b5cf6", r: 2 }}
            activeDot={{ fill: "#8b5cf6", r: 4 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductsChart;
