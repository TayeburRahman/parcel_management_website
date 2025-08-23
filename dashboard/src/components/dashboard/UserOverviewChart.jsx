'use client';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import { useState } from 'react';

const chartData = {
  2024: [
    { name: 'Jan', value: 80 },
    { name: 'Feb', value: 70 },
    { name: 'Mar', value: 100 },
    { name: 'Apr', value: 60 },
    { name: 'May', value: 90 },
    { name: 'Jun', value: 75 },
    { name: 'Jul', value: 85 },
    { name: 'Aug', value: 70 },
    { name: 'Sept', value: 95 },
    { name: 'Oct', value: 80 },
    { name: 'Nov', value: 70 },
    { name: 'Dec', value: 90 },
  ],
  2023: [
    { name: 'Jan', value: 50 },
    { name: 'Feb', value: 60 },
    { name: 'Mar', value: 75 },
    { name: 'Apr', value: 55 },
    { name: 'May', value: 68 },
    { name: 'Jun', value: 72 },
    { name: 'Jul', value: 65 },
    { name: 'Aug', value: 70 },
    { name: 'Sept', value: 78 },
    { name: 'Oct', value: 82 },
    { name: 'Nov', value: 75 },
    { name: 'Dec', value: 80 },
  ],
};

const UserOverviewChart = () => {
  const [selectedYear, setSelectedYear] = useState('2024');

  return (
    <div className="p-5 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-[15px] font-medium">User Overview</h2>
        <div className="relative w-fit">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="appearance-none border border-gray-400 outline-none rounded px-2 py-[2] text-[10px] pr-6"
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
          <div className="pointer-events-none absolute right-1 top-[60%] -translate-y-1/2">
            <svg className="w-[12px] h-[12px] text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          className="text-[10px]"
          data={chartData[selectedYear]}
          margin={{ top: 10, right: 0, left: -5, bottom: -5 }}
        >
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tickMargin={8}
            tick={{ fontSize: 10 }}
          />
          <YAxis
            width={35}
            ticks={[0, 20, 40, 60, 80, 100]}
            axisLine={false}
            tickLine={false}
            tickMargin={8}
            tick={{ fontSize: 10 }}
          />
          <Tooltip wrapperStyle={{ fontSize: '14px' }} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#00B047"
            fill="url(#userOverviewGradient)"
          />
          <defs>
            <linearGradient id="userOverviewGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="50%" stopColor="#00B047" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#28a745" stopOpacity={0.1} />
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default UserOverviewChart;