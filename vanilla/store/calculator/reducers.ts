import { Map } from 'immutable'
import {
  CalculatorState,
  CalculatorActionTypes,
  ADD_POINT,
  REMOVE_POINT,
  SET_POINTS,
  RESET_SPEC,
} from './types'
import { canLearnTalent, canUnlearnTalent } from '../../lib/tree'
import { talentsById, talentsBySpec } from '../../data/talents'

const initialState: CalculatorState = {
  points: Map<number, number>(),
  pointsEncoded: '',
}

export default function reducer(
  state = initialState,
  action: CalculatorActionTypes
): CalculatorState {
  const { points } = state

  switch (action.type) {
    case ADD_POINT: {
      const { talentId } = action
      const talent = talentsById[talentId]
      if (!canLearnTalent(points, talent)) {
        return state
      }
      const nextPoints = points.set(talentId, points.get(talentId, 0) + 1)
      return {
        ...state,
        points: nextPoints,
        // pointsEncoded: encodeKnownTalents(nextPoints, specId),
      }
    }

    case REMOVE_POINT: {
      const { talentId } = action
      const talent = talentsById[talentId]
      console.log(canUnlearnTalent(points, talent))
      if (!canUnlearnTalent(points, talent)) {
        return state
      }
      const nextPoints = points.set(talentId, points.get(talentId, 1) - 1)
      return {
        ...state,
        points: nextPoints,
        // pointsEncoded: encodeKnownTalents(nextPoints, specId),
      }
    }

    case SET_POINTS: {
      if (points.equals(action.points)) {
        return state
      }
      return {
        ...state,
        points: action.points,
      }
    }

    case RESET_SPEC: {
      const resetIds = Object.values(talentsBySpec[action.specId]).map(
        (t) => t.id
      )
      const nextPoints = points.filter((_, id) => resetIds.indexOf(id) === -1)
      return {
        ...state,
        points: nextPoints,
      }
    }

    default:
      return state
  }
}
