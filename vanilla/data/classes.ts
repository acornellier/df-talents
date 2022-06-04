export const classes = [
  {
    id: 1,
    name: 'Warrior',
    icon: 'class_warrior',
    specs: [161, 164, 163],
  },
  {
    id: 2,
    name: 'Paladin',
    icon: 'class_paladin',
    specs: [382, 383, 381],
  },
  {
    id: 3,
    name: 'Hunter',
    icon: 'class_hunter',
    specs: [361, 363, 362],
  },
  {
    id: 4,
    name: 'Rogue',
    icon: 'class_rogue',
    specs: [182, 181, 183],
  },
  {
    id: 5,
    name: 'Priest',
    icon: 'class_priest',
    specs: [201, 202, 203],
  },
  {
    id: 7,
    name: 'Shaman',
    icon: 'class_shaman',
    specs: [261, 263, 262],
  },
  {
    id: 8,
    name: 'Mage',
    icon: 'class_mage',
    specs: [81, 41, 61],
  },
  {
    id: 9,
    name: 'Warlock',
    icon: 'class_warlock',
    specs: [302, 303, 301],
  },
  {
    id: 11,
    name: 'Druid',
    icon: 'class_druid',
    specs: [283, 281, 282],
  },
] as const

export type Class = typeof classes[number]
export type ClassId = Class['id']
export type SpecId = Class['specs'][number]

export const classById: { [key: number]: Class } = classes.reduce(
  (previousValue: object, currentValue: Class) => {
    return {
      ...previousValue,
      [currentValue.id]: currentValue,
    }
  },
  {}
)

export const classByName: { [key: string]: Class } = classes.reduce(
  (previousValue: object, currentValue: Class) => {
    return {
      ...previousValue,
      [currentValue.name.toLowerCase()]: currentValue,
    }
  },
  {}
)

export const specNames: Record<SpecId, string> = {
  41: 'Fire',
  61: 'Frost',
  81: 'Arcane',
  161: 'Arms',
  163: 'Protection',
  164: 'Fury',
  181: 'Combat',
  182: 'Assassination',
  183: 'Subtlety',
  201: 'Discipline',
  202: 'Holy',
  203: 'Shadow',
  261: 'Elemental',
  262: 'Restoration',
  263: 'Enhancement',
  281: 'Feral',
  282: 'Restoration',
  283: 'Balance',
  301: 'Destruction',
  302: 'Affliction',
  303: 'Demonology',
  361: 'Beast Mastery',
  362: 'Survival',
  363: 'Marksmanship',
  381: 'Retribution',
  382: 'Holy',
  383: 'Protection',
}

export const specByName: string = classes.reduce(
  (previousValue: object, currentValue: Class) => {
    return {
      ...previousValue,
      [currentValue.name.toLowerCase()]: currentValue,
    }
  },
  {}
)
