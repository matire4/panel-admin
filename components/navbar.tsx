import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="font-semibold text-lg">Menu</div>
        <ThemeToggle />
      </div>
    </header>
  )
}

