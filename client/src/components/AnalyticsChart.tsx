import React from 'react';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';

interface DataPoint {
    created_at: string;
    ram: number;
    cpu: number;
}

const generateFakeData = (count: number): DataPoint[] => {
    const data: DataPoint[] = [];

    for (let i = 0; i < count; i++) {
        const hour = i % 12 || 12;
        const minute = i < 10 ? `0${i}` : i;
        const period = i < 12 ? 'AM' : 'PM';

        data.push({
            created_at: `${hour}:${minute} ${period}`,
            ram: Number(((Math.floor(Math.random() * 100) * 24) / 24 / 6).toFixed(2).toLocaleString(),),
            cpu: Number(((Math.floor(Math.random() * 100) * 24) / 24 / 6).toFixed(2).toLocaleString(),),
        });
    }

    return data;
};

interface CustomToolTipProps {
    active?: boolean;
    payload?: Array<{ value: number; dataKey: string }>;
}

const CustomToolTip: React.FC<CustomToolTipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
        // @ts-expect-error This issue is almost impossible to solve
        const dataPoint: DataPoint = payload[0].payload as DataPoint;

        return (
            <div className="rounded-md border border-zinc-800 bg-zinc-950 px-2 py-2">
                <p className="text-zinc-300">{`${dataPoint.created_at}`}</p>
                <p className="mt-2 dark:text-zinc-300">
                    <span className="text-red-500">CPU Usage:</span> {dataPoint.cpu}%
                </p>
                <p className="mt-2 dark:text-zinc-300">
                    <span className="text-green-500">RAM Usage:</span> {dataPoint.ram}%
                </p>
            </div>
        );
    }

    return null;
};

const AnalyticsChart: React.FC = () => {
    const fakeData: DataPoint[] = generateFakeData(12);

    return (
        <ResponsiveContainer width="100%" height={450}>
            <AreaChart data={fakeData}>
                <defs>
                    <linearGradient id="c91010" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#c91010" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#c91010" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="369649" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#369649" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#369649" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="created_at" />
                <YAxis />

                <CartesianGrid horizontal={false} vertical={false} />

                <Legend />
                <Tooltip content={<CustomToolTip />} />

                <Area
                    type="monotone"
                    dataKey="cpu"
                    name="CPU Usage"
                    stroke="#c91010"
                    strokeWidth={1}
                    activeDot={{
                        r: 2,
                    }}
                    fill="url(#c91010)"
                />

                <Area
                    type="monotone"
                    dataKey="ram"
                    name="RAM Usage"
                    stroke="#369649"
                    strokeWidth={2}
                    activeDot={{
                        r: 2,
                    }}
                    fill="url(#369649)"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export { AnalyticsChart, CustomToolTip };
