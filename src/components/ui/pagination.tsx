import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"

/** 1-based page list with ellipses, e.g. [1, "…", 4, 5, 6, "…", 25]. */
function getPageItems(page: number, pageCount: number): (number | "ellipsis")[] {
  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, i) => i + 1)
  const items: (number | "ellipsis")[] = [1]
  const start = Math.max(2, Math.min(page - 1, pageCount - 4))
  const end = Math.min(pageCount - 1, Math.max(page + 1, 5))
  if (start > 2) items.push("ellipsis")
  for (let i = start; i <= end; i++) items.push(i)
  if (end < pageCount - 1) items.push("ellipsis")
  items.push(pageCount)
  return items
}

type PaginationProps = Omit<React.ComponentProps<"nav">, "onChange"> & {
  /** Current page, 1-based. */
  page: number
  pageSize: number
  /** Total number of rows across all pages. */
  total: number
  onPageChange: (page: number) => void
  /** Omit to hide the rows-per-page select. Changing it jumps back to page 1. */
  onPageSizeChange?: (pageSize: number) => void
  pageSizeOptions?: number[]
}

/**
 * Footer for every list page: "Showing 11–20 of 248", rows-per-page, prev / pages / next.
 * Always render it under a data table, even when there is only one page.
 */
function Pagination({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
  className,
  ...props
}: PaginationProps) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const current = Math.min(Math.max(1, page), pageCount)
  const from = total === 0 ? 0 : (current - 1) * pageSize + 1
  const to = Math.min(current * pageSize, total)
  const fmt = (n: number) => n.toLocaleString("id-ID")

  const pageButton =
    "inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-sm font-medium tabular-nums transition-all duration-200 focus-visible:focus-ring disabled:pointer-events-none disabled:opacity-40"

  return (
    <nav
      data-slot="pagination"
      aria-label="Pagination"
      className={cn("flex flex-col-reverse items-center justify-between gap-4 sm:flex-row", className)}
      {...props}
    >
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
        <span aria-live="polite">
          Showing <span className="font-medium text-foreground tabular-nums">{fmt(from)}–{fmt(to)}</span> of{" "}
          <span className="font-medium text-foreground tabular-nums">{fmt(total)}</span>
        </span>
        {onPageSizeChange && (
          <span className="flex items-center gap-2">
            Rows
            <Select
              value={String(pageSize)}
              onValueChange={(v) => {
                onPageSizeChange(Number(v))
                onPageChange(1)
              }}
            >
              <SelectTrigger size="sm" className="w-20" aria-label="Rows per page">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pageSizeOptions.map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </span>
        )}
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          className={cn(pageButton, "border border-border hover:bg-muted")}
          onClick={() => onPageChange(current - 1)}
          disabled={current <= 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="size-4" />
        </button>
        {getPageItems(current, pageCount).map((item, i) =>
          item === "ellipsis" ? (
            <span key={`e${i}`} aria-hidden className="inline-flex size-9 items-center justify-center text-muted-foreground">
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item)}
              aria-label={`Page ${item}`}
              aria-current={item === current ? "page" : undefined}
              className={cn(
                pageButton,
                item === current
                  ? "bg-gradient-primary text-primary-foreground shadow-accent"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {item}
            </button>
          ),
        )}
        <button
          type="button"
          className={cn(pageButton, "border border-border hover:bg-muted")}
          onClick={() => onPageChange(current + 1)}
          disabled={current >= pageCount}
          aria-label="Next page"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </nav>
  )
}

export { Pagination, getPageItems, type PaginationProps }
