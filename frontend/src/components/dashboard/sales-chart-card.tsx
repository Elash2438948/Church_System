import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

type SalesChartCardProps = {
  emoji: string;
  title: string;
  data: { month: string; revenue: number }[];
};

export function SalesChartCard({ emoji, title, data }: SalesChartCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {emoji} {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
              labelFormatter={(label: string) => `Month: ${label}`}
            />
            <Bar dataKey="revenue" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
