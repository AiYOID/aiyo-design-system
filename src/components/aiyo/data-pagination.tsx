import { Label, ListBox, Pagination, Select, cn } from "@heroui/react"

/** 1-based page list with ellipses, e.g. [1, "ellipsis", 4, 5, 6, "ellipsis", 25]. */
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

type DataPaginationProps = {
  /** Current page, 1-based. */
  page: number
  pageSize: number
  /** Total rows across all pages (from the API on server-side lists). */
  total: number
  onPageChange: (page: number) => void
  /** Omit to hide the rows-per-page select. Changing it jumps back to page 1. */
  onPageSizeChange?: (pageSize: number) => void
  pageSizeOptions?: number[]
  className?: string
}

/**
 * Footer for every list page: "Showing 11 to 20 of 248", rows per page, previous / pages / next.
 * Always render it under a data table, even when there is only one page.
 */
function DataPagination({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
  className,
}: DataPaginationProps) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const current = Math.min(Math.max(1, page), pageCount)
  const from = total === 0 ? 0 : (current - 1) * pageSize + 1
  const to = Math.min(current * pageSize, total)
  const fmt = (n: number) => n.toLocaleString("id-ID")

  return (
    <Pagination data-slot="data-pagination" aria-label="Pagination" className={cn("gap-4", className)}>
      <Pagination.Summary className="flex-wrap gap-x-6 gap-y-2">
        <span aria-live="polite">
          Showing{" "}
          <span className="font-medium text-foreground tabular-nums">
            {fmt(from)} to {fmt(to)}
          </span>{" "}
          of <span className="font-medium text-foreground tabular-nums">{fmt(total)}</span>
        </span>
        {onPageSizeChange && (
          <Select
            className="flex-row items-center gap-2"
            value={String(pageSize)}
            onChange={(key) => {
              onPageSizeChange(Number(key))
              onPageChange(1)
            }}
          >
            <Label className="text-sm font-normal text-muted">Rows</Label>
            <Select.Trigger className="w-20">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {pageSizeOptions.map((n) => (
                  <ListBox.Item key={n} id={String(n)} textValue={String(n)}>
                    {n}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        )}
      </Pagination.Summary>

      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous isDisabled={current <= 1} onPress={() => onPageChange(current - 1)} aria-label="Previous page">
            <Pagination.PreviousIcon />
          </Pagination.Previous>
        </Pagination.Item>
        {getPageItems(current, pageCount).map((item, i) =>
          item === "ellipsis" ? (
            <Pagination.Item key={`e${i}`} className="hidden sm:inline-flex">
              <Pagination.Ellipsis />
            </Pagination.Item>
          ) : (
            <Pagination.Item key={item} className="hidden sm:inline-flex">
              <Pagination.Link isActive={item === current} aria-label={`Page ${item}`} onPress={() => onPageChange(item)}>
                {item}
              </Pagination.Link>
            </Pagination.Item>
          ),
        )}
        {/* Below sm the page numbers do not fit, so the position is spelled out instead. */}
        <Pagination.Item className="sm:hidden">
          <span className="min-w-24 px-2 text-center text-sm text-muted tabular-nums">
            Page <span className="font-medium text-foreground">{current}</span> of {pageCount}
          </span>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Next isDisabled={current >= pageCount} onPress={() => onPageChange(current + 1)} aria-label="Next page">
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  )
}

export { DataPagination, getPageItems, type DataPaginationProps }
