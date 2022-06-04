import {
  CalculatorActionTypes,
  ADD_POINT,
  REMOVE_POINT,
  SET_POINTS,
  Points,
  RESET_SPEC,
} from './types'

export const addPoint = (talentId: number): CalculatorActionTypes => ({
  type: ADD_POINT,
  talentId,
})

export const removePoint = (talentId: number): CalculatorActionTypes => ({
  type: REMOVE_POINT,
  talentId,
})

export const setPoints = (points: Points): CalculatorActionTypes => ({
  type: SET_POINTS,
  points,
})

export const resetSpec = (specId: number): CalculatorActionTypes => ({
  type: RESET_SPEC,
  specId,
})
