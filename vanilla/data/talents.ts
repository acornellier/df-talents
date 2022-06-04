interface Root {
  /** Spec ID */
  [key: number]: {
    /** ID of the talent */
    [key: number]: TalentData
  }
}

interface RootArray {
  /** ID of the talent tree */
  [key: number]: TalentData[]
}

const feralTalents = [
  {
    id: 1,
    name: "Tiger's Fury",
    description:
      'Instantly restores 20 Energy, and increases the damage of all your attacks by 15% for their full duration. Lasts 10 seconds.',
    row: 0,
    col: 3,
    ranks: 1,
    icon: 'ability_mount_jungletiger',
  },
  {
    id: 2,
    name: 'Increased Energy',
    description: 'Energy increased by [10/20/30].',
    row: 1,
    col: 2,
    ranks: 3,
    requires: [1],
    icon: 'spell_chargepositive',
  },
  {
    id: 3,
    name: 'Omen of Clarity',
    description:
      'Your auto attacks have a chance to cause a Clearcasting state, making your next Shred, Thrash, or Swipe cost no Energy.',
    row: 1,
    col: 3,
    ranks: 1,
    requires: [1],
    icon: 'spell_nature_crystalball',
  },
  {
    id: 4,
    name: "Improved Tiger's Fury",
    description: "Tiger's Fury generates an additional [10/20/30] energy.",
    row: 1,
    col: 4,
    ranks: 3,
    requires: [1],
    icon: 'ability_mount_jungletiger',
  },
  {
    id: 5,
    name: 'Improved Shred',
    description: 'While stealthed, Shred generates 1 additional combo point.',
    row: 2,
    col: 2,
    ranks: 1,
    requires: [3],
    icon: 'spell_shadow_vampiricaura',
  },
  {
    id: 6,
    name: 'Scent of Blood',
    description:
      'Each enemy hit by Thrash reduces the cost of Swipe by 3 Energy for the next 6 seconds.',
    row: 2,
    col: 3,
    ranks: 1,
    requires: [3],
    icon: 'spell_druid_thrash',
  },
  {
    id: 7,
    name: 'Predator',
    description:
      "The cooldown on Tiger's Fury resets when a target dies with one of your Bleed effects active, and Tiger's Fury lasts 5 additional seconds.",
    row: 2,
    col: 4,
    ranks: 1,
    requires: [3],
    icon: 'ability_hunter_catlikereflexes',
  },
  {
    id: 8,
    name: 'Improved Prowl',
    description:
      'While stealthed, Shred deals increased damage, and has double the chance to critically strike. While stealthed, Rake will stun the target for 4 sec, and deal increased damage.',
    row: 3,
    col: 2,
    ranks: 2,
    requires: [5],
    icon: 'ability_druid_disembowel',
  },
  {
    id: 9,
    name: 'Improved Shred and Swipe',
    description:
      'Shred & Swipe deal 20% increased damage against bleeding targets. Two Rank Talent. Swipe deals 20% increased damage against bleeding targets.',
    row: 3,
    col: 4,
    ranks: 2,
    requires: [7],
    icon: 'spell_shadow_vampiricaura',
  },
  {
    id: 10,
    name: 'Sudden Ambush',
    description:
      'Finishing moves have a [1/2/3] % chance per combo point spent to make your next Rake or Shred deal damage as though you were stealthed.',
    row: 4,
    col: 1,
    ranks: 3,
    requires: [8],
    icon: 'ability_hunter_catlikereflexes',
  },
  {
    id: 11,
    name: 'Berserk: Relentlessness',
    description:
      'Go berserk for 20 sec, giving finishing moves a 20% chance per combo point spent to refund 2 combo points. Combines with other Berserk abilities, granting all known Berserk effects while active.',
    row: 4,
    col: 3,
    ranks: 1,
    requires: [8, 9],
    icon: 'ability_druid_berserk',
  },
  {
    id: 12,
    name: 'Taste for Blood',
    description:
      'Ferocious Bite deals [2/4/6]% increased damage for each of your Bleeds on the target.',
    row: 4,
    col: 5,
    ranks: 3,
    requires: [9],
    icon: 'ability_druid_ferociousbite',
  },
  {
    id: 13,
    name: 'Lunar Inspiration',
    description:
      'Moonfire is usable in Cat Form, costs 30 energy, and generates 1 combo point.',
    row: 5,
    col: 0,
    ranks: 1,
    requires: [10],
    icon: 'spell_druid_lunarinspiration',
  },
  {
    id: 14,
    name: 'Primal Wrath',
    description:
      'Finishing move that deals instant damage and applies Rip to all enemies within 8 yards. Lasts longer per combo point.',
    row: 5,
    col: 2,
    ranks: 1,
    requires: [10],
    icon: 'artifactability_feraldruid_ashamanesbite',
  },
  {
    id: 15,
    name: 'Moment of Clarity',
    description:
      'Omen of Clarity now triggers 50% more often, can accumulate up to 2 charges, and increases the damage of your next Shred, Thrash, or Swipe by 15%.',
    row: 5,
    col: 3,
    ranks: 1,
    requires: [11],
    icon: 'spell_druid_momentofclarity',
  },
  {
    id: 16,
    name: 'Brutal Slash',
    description:
      'Strikes all nearby enemies with a massive slash, inflicting Physical damage. Deals reduced damage beyond 5 targets. Awards 1 combo point.',
    row: 5,
    col: 4,
    ranks: 1,
    requires: [12],
    icon: 'ability_druid_ravage',
  },
  {
    id: 17,
    name: 'Savage Roar',
    description:
      'Finishing move that increases damage by 15% and energy regeneration rate by 10% while in Cat Form. Lasts longer per combo point.',
    row: 5,
    col: 6,
    ranks: 1,
    requires: [12],
    icon: 'ability_druid_skinteeth',
  },
  {
    id: 18,
    name: 'Predatory Swiftness',
    description:
      'Your finishing moves have a 20% chance per combo point to make your next Regrowth or Entangling Roots instant, free, and castable in all forms.',
    row: 6,
    col: 1,
    ranks: 1,
    requires: [14],
    icon: 'ability_hunter_pet_cat',
  },
  {
    id: 19,
    name: 'Infected Wounds',
    description:
      "Rake causes an Infected Wound in the target, reducing the target's movement speed by 20% for 12 seconds.",
    row: 6,
    col: 3,
    ranks: 1,
    requires: [14, 16],
    icon: 'ability_druid_infectedwound',
  },
  {
    id: 20,
    name: 'Survival Instincts',
    description: 'Reduces all damage you take by 50% for 6 seconds.',
    row: 6,
    col: 5,
    ranks: 1,
    requires: [16],
    icon: 'ability_druid_tigersroar',
  },
  {
    id: 21,
    name: 'Berserk: Jungle Stalker',
    description:
      'Go berserk for 20 sec, causing Rake and Shred to deal damage as though you were stealthed and allowing the use of Prowl once while in combat. Combines with other Berserk abilities, granting all known Berserk effects while active.',
    row: 7,
    col: 0,
    ranks: 1,
    requires: [18],
    icon: 'ability_druid_berserk',
  },
  {
    id: 22,
    name: 'Carnivorous Instinct',
    description: "Tiger's Fury's damage bonus is increased by [3/6]%.",
    row: 7,
    col: 1,
    ranks: 2,
    requires: [18],
    icon: 'ability_mount_jungletiger',
  },
  {
    id: 23,
    name: 'Eye of Fearful Symmetry',
    description:
      "Tiger's Fury causes your next 2 finishing moves to restore [1/2] combo points",
    row: 7,
    col: 3,
    ranks: 2,
    requires: [19],
    icon: 'ability_druid_healinginstincts',
  },
  {
    id: 24,
    name: 'Cat-Eye Curio',
    description: 'Clearcast abilities generate [15/30]% of their Energy cost.',
    row: 7,
    col: 5,
    ranks: 2,
    requires: [20],
    icon: 'inv_jewelcrafting_gem_30',
  },
  {
    id: 25,
    name: 'Berserk: Frenzy',
    description:
      'Go berserk for 20 sec, causing your combo point-generating abilities to bleed the target for an additional 150% of their damage over 8 seconds. Combines with other Berserk abilities, granting all known Berserk effects while active. Passive: Combo-point generating abilities reduce the cooldown of Berserk by 0.3 seconds.',
    row: 7,
    col: 6,
    ranks: 1,
    requires: [20],
    icon: 'ability_druid_berserk',
  },
  {
    id: 26,
    name: 'Feral Frenzy',
    description:
      'Unleash a furious frenzy, clawing your target 5 times for Physical damage and additional Bleed damage over 6 seconds. Awards 5 combo points.',
    row: 8,
    col: 0,
    ranks: 1,
    requires: [22],
    icon: 'ability_druid_rake',
  },
  {
    id: 27,
    name: 'Adaptive Swarm',
    description:
      'Command a swarm that heals or deals Shadow damage over 12 sec to a target, and increases the effectiveness of your periodic effects on them by 20%. Upon expiration, finds a new target, preferring to alternate between friend and foe up to 3 times.',
    row: 8,
    col: 2,
    ranks: 1,
    requires: [22, 23],
    icon: 'ability_maldraxxus_druid',
  },
  {
    id: 28,
    name: 'Convoke the Spirits',
    description:
      'Call upon the Night Fae for an eruption of energy, channeling a rapid flurry of 16 Druid spells and abilities over 4 seconds. You will cast Ferocious Bite, Shred, Tiger’s Fury, Moonfire, Wrath, Regrowth, Rejuvenation, Rake, and Thrash on appropriate nearby targets, favoring your current shapeshift form.',
    row: 8,
    col: 3,
    ranks: 1,
    requires: [23],
    icon: 'ability_ardenweald_druid',
  },
  {
    id: 29,
    name: 'Soul of the Forest',
    description:
      'Your finishing moves grant 5 Energy per combo point spent and deal 5% increased damage.',
    row: 8,
    col: 4,
    ranks: 1,
    requires: [23, 24],
    icon: 'ability_druid_manatree',
  },
  {
    id: 30,
    name: "Apex Predator's Craving",
    description:
      'Rip damage has a 4% chance to make your next Ferocious Bite free and deal the maximum damage.',
    row: 8,
    col: 6,
    ranks: 1,
    requires: [24],
    icon: 'ability_druid_primaltenacity',
  },
  {
    id: 31,
    name: 'Improved Incarnation and Convoke',
    description:
      'Shifting out of Incarnation before it expires ends the effect and refunds a portion of its cooldown. Convoke the Spirits has an increased chance to use an exceptional spell or ability.',
    row: 9,
    col: 3,
    ranks: 1,
    requires: [28],
    icon: 'ability_druid_naturalperfection',
  },
  {
    id: 32,
    name: 'Circle of Life and Death',
    description:
      'Your damage over time effects deal their damage in 25% less time, and your healing over time effects in 15% less time.',
    row: 9,
    col: 5,
    ranks: 1,
    requires: [29],
    icon: 'ability_druid_cyclone',
  },
]

export const talents: RootArray = {
  281: feralTalents,
}

const allIds: number[] = []
Object.values(talents).forEach((talents: TalentData[]) => {
  talents.forEach((talent) => {
    if (allIds.includes(talent.id)) throw `DUPLICATE ID: ${talent.id}`
    allIds.push(talent.id)
  })
})

export const talentsBySpec: Root = Object.entries(talents).reduce<Root>(
  (acc, [key, value]) => {
    acc[Number(key)] = (value as TalentData[]).reduce<
      Record<number, TalentData>
    >((acc2, talent) => {
      acc2[talent.id] = talent
      return acc2
    }, {})
    return acc
  },
  {}
)

export const talentsById: { [key: number]: TalentData } = {}
export const talentsBySpecArray: { [key: number]: TalentData[] } = {}
export const talentToSpec: { [key: number]: number } = {}

for (let specId in talentsBySpec) {
  for (let talentId in talentsBySpec[specId]) {
    talentsById[talentId] = talentsBySpec[specId][talentId]
    talentsBySpecArray[specId] = Object.values(talentsBySpec[specId])
    talentToSpec[talentId] = parseInt(specId, 10)
  }
}
