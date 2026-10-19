import * as React from "react"
import { Tabs as TabsPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"

/**
 * Horizontal (default): segmented control on a muted track.
 * `orientation="vertical"`: side navigation for pages with many sub-sections
 * (settings, profile). Sticky left column on md+, scrollable row on mobile.
 */
function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn(
        "group/tabs flex flex-col gap-4",
        "data-[orientation=vertical]:gap-6 md:data-[orientation=vertical]:flex-row md:data-[orientation=vertical]:items-start md:data-[orientation=vertical]:gap-10",
        className,
      )}
      {...props}
    />
  )
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        // horizontal
        "inline-flex w-fit items-center gap-1 rounded-xl border border-border bg-muted p-1",
        // vertical
        "group-data-[orientation=vertical]/tabs:-mx-1 group-data-[orientation=vertical]/tabs:flex group-data-[orientation=vertical]/tabs:w-auto group-data-[orientation=vertical]/tabs:max-w-[calc(100%+0.5rem)] group-data-[orientation=vertical]/tabs:overflow-x-auto group-data-[orientation=vertical]/tabs:border-0 group-data-[orientation=vertical]/tabs:bg-transparent group-data-[orientation=vertical]/tabs:p-1",
        "md:group-data-[orientation=vertical]/tabs:sticky md:group-data-[orientation=vertical]/tabs:top-24 md:group-data-[orientation=vertical]/tabs:mx-0 md:group-data-[orientation=vertical]/tabs:w-60 md:group-data-[orientation=vertical]/tabs:shrink-0 md:group-data-[orientation=vertical]/tabs:flex-col md:group-data-[orientation=vertical]/tabs:items-stretch md:group-data-[orientation=vertical]/tabs:overflow-visible md:group-data-[orientation=vertical]/tabs:p-0",
        className,
      )}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex h-9 shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 text-sm font-medium text-muted-foreground transition-all duration-200",
        "hover:text-foreground focus-visible:focus-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
        "data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        // vertical: taller, left-aligned rows; active row gets a border and the gradient bar
        "group-data-[orientation=vertical]/tabs:h-11 group-data-[orientation=vertical]/tabs:justify-start group-data-[orientation=vertical]/tabs:rounded-xl group-data-[orientation=vertical]/tabs:border group-data-[orientation=vertical]/tabs:border-transparent",
        "group-data-[orientation=vertical]/tabs:hover:bg-muted group-data-[orientation=vertical]/tabs:data-[state=active]:border-border group-data-[orientation=vertical]/tabs:data-[state=active]:bg-card group-data-[orientation=vertical]/tabs:data-[state=active]:[&_svg]:text-primary",
        "md:group-data-[orientation=vertical]/tabs:before:absolute md:group-data-[orientation=vertical]/tabs:before:inset-y-2.5 md:group-data-[orientation=vertical]/tabs:before:left-0 md:group-data-[orientation=vertical]/tabs:before:w-[3px] md:group-data-[orientation=vertical]/tabs:before:rounded-full md:group-data-[orientation=vertical]/tabs:data-[state=active]:before:bg-gradient-primary",
        className,
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("outline-none group-data-[orientation=vertical]/tabs:min-w-0 group-data-[orientation=vertical]/tabs:flex-1", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
