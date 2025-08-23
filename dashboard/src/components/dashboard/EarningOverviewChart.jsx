'use client';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import { useState } from 'react';

const chartData = {
    2024: [
        { name: "Jan", active: 900, cancel: 600, earnings: 55 },
        { name: "Feb", active: 850, cancel: 400, earnings: 50 },
        { name: "Mar", active: 700, cancel: 500, earnings: 50 },
        { name: "Apr", active: 950, cancel: 300, earnings: 38 },
        { name: "May", active: 800, cancel: 600, earnings: 42 },
        { name: "Jun", active: 880, cancel: 450, earnings: 46 },
        { name: "Jul", active: 870, cancel: 200, earnings: 52 },
        { name: "Aug", active: 780, cancel: 300, earnings: 56 },
        { name: "Sept", active: 860, cancel: 500, earnings: 60 },
        { name: "Oct", active: 900, cancel: 400, earnings: 70 },
        { name: "Nov", active: 940, cancel: 600, earnings: 80 },
        { name: "Dec", active: 850, cancel: 500, earnings: 85 },
    ],
    2023: [
        { name: "Jan", active: 120, cancel: 840, earnings: 40 },
        { name: "Feb", active: 770, cancel: 350, earnings: 35 },
        { name: "Mar", active: 640, cancel: 420, earnings: 45 },
        { name: "Apr", active: 670, cancel: 860, earnings: 30 },
        { name: "May", active: 740, cancel: 520, earnings: 38 },
        { name: "Jun", active: 310, cancel: 390, earnings: 42 },
        { name: "Jul", active: 760, cancel: 180, earnings: 37 },
        { name: "Aug", active: 790, cancel: 250, earnings: 41 },
        { name: "Sept", active: 780, cancel: 430, earnings: 48 },
        { name: "Oct", active: 830, cancel: 350, earnings: 55 },
        { name: "Nov", active: 260, cancel: 300, earnings: 62 },
        { name: "Dec", active: 730, cancel: 430, earnings: 70 },
    ],
};

const EarningOverviewChart = () => {
    const [selectedYear, setSelectedYear] = useState('2024');

    return (
        <div className="p-5 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-[15px] font-medium ">Earning Overview</h2>
                <div className="relative w-fit">
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="appearance-none border border-gray-400 outline-none rounded px-2 py-[2] text-[10px] pr-6">
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
                <BarChart
                    className='text-[10px]'
                    data={chartData[selectedYear]}
                    barSize={10}
                    margin={{ top: 10, right: 0, left: -5, bottom: -5 }}
                >
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
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
                    <Bar
                        dataKey="earnings"
                        fill="#00B047"
                        radius={[10, 10, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default EarningOverviewChart;