import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function AnalyticsCard({
  emoji,
  title,
  value,
}: {
  emoji: string;
  title: string;
  value: string | number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {emoji} {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-2xl font-bold">
        {value}
      </CardContent>
    </Card>
  );
}
