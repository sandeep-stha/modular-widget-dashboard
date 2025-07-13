import {
  CardDescription,
  CardHeader,
  CardTitle,
  Card as ShadcnCard,
} from '@/components/ui/card';

export function Card({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <ShadcnCard className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </ShadcnCard>
  );
}
