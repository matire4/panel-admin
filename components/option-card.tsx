import Link from "next/link"
import type { LucideIcon } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface OptionCardProps {
  title: string
  href: string
  icon: LucideIcon
  description?: string
}

export function OptionCard({ title, href, icon: Icon, description }: OptionCardProps) {
  return (
    <Link href={href} className="block transition-transform hover:scale-105">
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="rounded-full bg-primary/10 p-3">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Haga clic para acceder a esta opción</p>
        </CardContent>
      </Card>
    </Link>
  )
}

