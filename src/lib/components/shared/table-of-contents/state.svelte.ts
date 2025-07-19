import type { TOCStack } from "@/lib/table-of-contents";

export const tocState = $state<{ hasToc: boolean, tocStack: TOCStack }>({
  hasToc: false,
  tocStack: []
})
