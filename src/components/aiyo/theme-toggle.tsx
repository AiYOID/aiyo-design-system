import { Moon, Sun } from "@gravity-ui/icons"
import { Button, useTheme } from "@heroui/react"

/**
 * Light/dark switch. Follows the OS until the user picks, then remembers the choice
 * (HeroUI's `useTheme`, key "heroui-theme"). Render it once per page: each instance
 * keeps its own state.
 */
function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme("system")
  const dark = resolvedTheme === "dark"
  return (
    <Button
      isIconOnly
      variant="ghost"
      className={className}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      onPress={() => setTheme(dark ? "light" : "dark")}
    >
      {dark ? <Sun aria-hidden /> : <Moon aria-hidden />}
    </Button>
  )
}

export { ThemeToggle }
