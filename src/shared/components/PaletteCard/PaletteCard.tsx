import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import type { PaletteCardProps } from './types-card';

export function PaletteCard({ title, description }: PaletteCardProps) {
  return (
    <Card className="w-full dark:bg-slate-500 dark:text-white cursor-move">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
