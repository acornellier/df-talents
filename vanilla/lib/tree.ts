import { Map } from 'immutable'
import {
  talentsBySpec,
  talentToSpec,
  talentsBySpecArray,
  talentsById,
} from '../data/talents'
import { classById } from '../data/classes'

export const MAX_SPEC_POINTS = 30
export const MAX_ROWS = 9

export const SORT_TALENTS = (a: TalentData, b: TalentData) => {
  if (a.row === b.row) {
    return a.col - b.col
  }
  return a.row - b.row
}

export const SORT_TALENTS_DESC = (a: TalentData, b: TalentData) => {
  if (a.row === b.row) {
    return b.col - a.col
  }
  return b.row - a.row
}

export const SORT_TALENTS_BY_SPEC = (a: TalentData, b: TalentData) => {
  const aSpec = talentToSpec[a.id]
  const bSpec = talentToSpec[b.id]
  if (aSpec === bSpec) {
    return SORT_TALENTS(a, b)
  }
  return aSpec - bSpec
}

/**
 * Returns the overall points spent in the tree.
 */
export function getPointsInSpec(
  specId: number,
  known: Map<number, number>
): number {
  // TODO: Hard to test this method when referencing talents from a file. Improve this.
  return Object.values(talentsBySpec[specId]).reduce(
    (prev: number, current: TalentData) => {
      return prev + known.get(current.id, 0)
    },
    0
  )
}

export function calcAvailablePoints(known: Map<number, number>): number {
  return Math.max(
    0,
    MAX_SPEC_POINTS - known.reduce((prev, current) => prev + current, 0)
  )
}

/**
 * Returns whether a talent's other talent requirements are met.
 */
export function calcMeetsRequirements(
  talent: TalentData,
  known: Map<number, number>
) {
  return talent.requires.every((req) => {
    const dependencyTalent = talentsById[req]
    return known.get(req, 0) >= dependencyTalent.ranks
  })
}

export function getUnmetRequirements(
  talent: TalentData,
  known: Map<number, number>,
  pointsInSpec: number,
  specName: string
): string {
  const missing = []
  const dependency = talent.requires[0]

  if (dependency) {
    const dependencyTalent = talentsById[dependency]

    if (known.get(dependency, 0) < dependencyTalent.ranks) {
      missing.push(
        `Requires ${dependencyTalent.ranks} point${
          dependencyTalent.ranks !== 1 ? 's' : ''
        } in ${dependencyTalent.name}`
      )
    }
  }

  if (talent.row >= 4 && pointsInSpec < 8) {
    missing.push(`Requires 8 points in ${specName}`)
  } else if (talent.row >= 7 && pointsInSpec < 20) {
    missing.push(`Requires 20 points in ${specName}`)
  }

  // Hackfix: Returning an Array will cause the prop to change everytime, causing re-renders on all
  // of the components. Returning a string makes the shallow compare easier and prevents re-renders.
  // Could add Memoization to this function, but not sure of another "better" more "React" way..
  return missing.join('_')
}

export const canLearnTalent = (
  known: Map<number, number>,
  talent: TalentData
) => {
  // Reached the max rank?
  if (known.get(talent.id, 0) >= talent.ranks) {
    return false
  }
  // Spend a maximum of 51 points
  if (calcAvailablePoints(known) === 0) {
    return false
  }

  // Support for specific Talent dependency requirement.
  if (talent.requires.length && !calcMeetsRequirements(talent, known)) {
    return false
  }

  // Check we have the required amount of points spent in the tree for this talent
  const pointsInSpec = getPointsInSpec(talentToSpec[talent.id], known)
  if (talent.row >= 4 && pointsInSpec < 8) {
    return false
  } else if (talent.row >= 7 && pointsInSpec < 20) {
    return false
  }

  return true
}

export const getCumulativePointsPerRow = (
  known: Map<number, number>,
  specId: number
): number[] => {
  return known.reduce<number[]>((reduction, points, talentId) => {
    const t = talentsBySpec[specId][talentId]
    if (t && points > 0) {
      for (let row = t.row; row <= MAX_ROWS; row++) {
        reduction[row] = (reduction[row] || 0) + points
      }
    }
    return reduction
  }, [])
}

export const canUnlearnTalent = (
  known: Map<number, number>,
  talent: TalentData
): boolean => {
  const currentPoints = known.get(talent.id, 0)
  const specId = talentToSpec[talent.id]

  // No points to reduce for this talent
  if (currentPoints === 0) {
    console.warn('no points to reduce')
    return false
  }

  // Prevent if another talent depends on this
  const isDependency = known.some((points, talentId) => {
    const t = talentsBySpec[specId][talentId]
    return points > 0 && !!t?.requires.some((req) => req === talent.id)
  })
  if (isDependency) {
    console.warn('is dependency')
    return false
  }

  // Walk through every talent and ensure no requirements are breached
  let cumulativePointsPerRow = getCumulativePointsPerRow(known, specId)
  for (let r = talent.row; r < cumulativePointsPerRow.length; r++) {
    // Calculate what the points would look like when this one is removed
    cumulativePointsPerRow[r] = cumulativePointsPerRow[r] - 1
  }
  const wouldBreach = known.some((points, talentId) => {
    const t = talentsBySpec[specId][talentId]
    return (
      t &&
      points > 0 &&
      ((t.row <= 4 && cumulativePointsPerRow[4] < 8) ||
        (t.row <= 7 && cumulativePointsPerRow[4] < 20))
    )
  })

  if (wouldBreach) {
    console.warn('point requirements would be breached')
    return false
  }

  return true
}

/**
 * Adds a single talent point to the Map, if possible.
 */
export const addTalentPoint = (
  known: Map<number, number>,
  talent: TalentData
): Map<number, number> => {
  const currentPoints = known.get(talent.id, 0)

  if (!canLearnTalent(known, talent)) {
    return known
  }

  return known.set(talent.id, currentPoints + 1)
}

/**
 * Removes a single talent point from the Map, if possible.
 */
export const removeTalentPoint = (
  known: Map<number, number>,
  talent: TalentData
): Map<number, number> => {
  const currentPoints = known.get(talent.id, 0)

  if (!canUnlearnTalent(known, talent)) {
    return known
  }

  return currentPoints === 1
    ? known.remove(talent.id)
    : known.set(talent.id, currentPoints - 1)
}

/**
 * Either adds or removes a talent point based on the modifier.
 */
export const modifyTalentPoint = (
  known: Map<number, number>,
  talent: TalentData,
  modifier: 1 | -1
): Map<number, number> => {
  if (modifier === 1) {
    return addTalentPoint(known, talent)
  } else {
    return removeTalentPoint(known, talent)
  }
}

/**
 * Encodes a Map of known talents into a URL-friendly string.
 */
export function encodeKnownTalents(
  known: Map<number, number>,
  classId: number
): string {
  let string = ''
  const { specs } = classById[classId]
  for (let i = 0; i < specs.length; i++) {
    const specId = specs[i]
    const unsortedTalents = talentsBySpecArray[specId]
    if (!unsortedTalents) break

    const talents = unsortedTalents.sort(SORT_TALENTS)
    string += i > 0 ? '-' : ''
    string += removeTrailingCharacters(
      talents.map((talent) => known.get(talent.id, 0)).join(''),
      '0'
    )
  }
  return removeTrailingCharacters(string, '-')
}

/**
 * Decodes a string of points into a Map of talents.
 */
export function decodeKnownTalents(
  pointString: string,
  classId: number
): Map<number, number> {
  const { specs } = classById[classId]
  let known = Map<number, number>()

  // TODO: Make sure we validate the point string
  const parts = pointString.split('-')
  for (let i = 0; i < parts.length; i++) {
    const specId = specs[i]
    const specPointStr = parts[i]
    const talents = talentsBySpecArray[specId].sort(SORT_TALENTS)

    for (let y = 0; y < specPointStr.length; y++) {
      const talent = talents[y]
      const points = parseInt(specPointStr[y], 10)

      // Validation: break out loop if there's more points in the string than this talent can have
      if (points > talent.ranks) {
        break
      }

      // Step through each point and see that we can assign it
      for (let p = 0; p < points; p++) {
        if (canLearnTalent(known, talent)) {
          known = known.set(talent.id, p + 1)
        } else {
          break
        }
      }
    }
  }

  return known
}

/**
 * Removes repeated characters from the end of a string.
 */
function removeTrailingCharacters(str: string, char: string): string {
  while (str[str.length - 1] === char) {
    str = str.slice(0, -1)
  }
  return str
}
