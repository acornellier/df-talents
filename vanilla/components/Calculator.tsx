import React from 'react'
import TalentTree from './TalentTree'
import { calcAvailablePoints } from '../lib/tree'
import { SpecId } from '../data/classes'
import { connect } from 'react-redux'
import { addPoint, removePoint } from '../store/calculator/actions'
import { Points } from '../store/calculator/types'

interface Props {
  specId: SpecId
  points: Points
  addPoint: typeof addPoint
  removePoint: typeof removePoint
}

export function Calculator({
  specId,
  points: knownTalents,
  addPoint,
  removePoint,
}: Props) {
  const handleTalentPress = (talentId: number, modifier: 1 | -1) => {
    if (modifier === 1) {
      addPoint(talentId)
    } else {
      removePoint(talentId)
    }
  }

  const availablePoints = calcAvailablePoints(knownTalents)

  return (
    <div className="calculator">
      <div className="trees">
        <TalentTree
          key={specId}
          specId={specId}
          availablePoints={availablePoints}
          knownTalents={knownTalents}
          onTalentPress={handleTalentPress}
        />
      </div>

      <div className="calculator__points">
        {availablePoints < 51 && (
          <span className="subtle">Required level: {60 - availablePoints}</span>
        )}
        <span>Talent points: {availablePoints}</span>
      </div>
    </div>
  )
}

export default connect(null, {
  addPoint,
  removePoint,
})(Calculator)
