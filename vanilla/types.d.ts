interface TalentTree {
  id: number
  name: string // e.g. Affliction
  icon: string
  talents: Talent[]
}

interface TalentData {
  id: number
  name: string
  description: string
  /** Row for talent. Starts at 0 */
  row: number
  /** Column for talent. Starts at 0 */
  col: number
  icon: string
  ranks: number
  /** Ids of talent dependencies for this talent */
  requires?: number[]
}

interface Talent {
  name: string
  row: number
  column: number
  type: 'ability' | 'talent'
  ranks: string[]
  prerequisite?: [number, number] | number // [row, column] OR index
}

type TalentClickHandler = (talentId: number, modifier: 1 | -1) => void

type TooltipPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'left'
  | 'right'
