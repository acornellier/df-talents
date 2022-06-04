import React, { useCallback } from 'react'
import { Map } from 'immutable'
import { Talent } from './Talent'
import {
  getPointsInSpec,
  canLearnTalent,
  SORT_TALENTS_DESC,
  getUnmetRequirements,
} from '../lib/tree'
import { talentsBySpec, talentsById } from '../data/talents'
import { Arrow } from './Arrow'
import { resetSpec } from '../store/calculator/actions'
import { connect } from 'react-redux'
import { Tooltip } from './Tooltip'
import { SpecId, specNames } from '../data/classes'

interface Props {
  specId: SpecId
  availablePoints: number
  knownTalents: Map<number, number>
  onTalentPress: TalentClickHandler
  resetSpec: typeof resetSpec
}

export function TalentTree({
  specId,
  knownTalents,
  availablePoints,
  onTalentPress,
  resetSpec,
}: Props) {
  const talents = Object.values(talentsBySpec[specId]).sort(SORT_TALENTS_DESC)
  const pointsInSpec = getPointsInSpec(specId, knownTalents)

  const handleClick = useCallback(
    (talentId: number) => onTalentPress(talentId, 1),
    [onTalentPress]
  )
  const handleRightClick = useCallback(
    (talentId: number) => onTalentPress(talentId, -1),
    [onTalentPress]
  )
  const handleResetSpec = useCallback(
    () => resetSpec(specId),
    [resetSpec, specId]
  )

  return (
    <div className="tree">
      <div className="tree__header">
        <h3>
          {specNames[specId]} ({pointsInSpec})
        </h3>
        {pointsInSpec > 0 && (
          <>
            <div className="tree__reset" onClick={handleResetSpec}>
              <Tooltip
                fixed
                content={
                  <span className="green">
                    Reset points in {specNames[specId]}
                  </span>
                }
              >
                x
              </Tooltip>
            </div>
          </>
        )}
      </div>

      <div className="tree__body">
        {talents.map((talent) => {
          const points = knownTalents.get(talent.id, 0)
          const canLearn = canLearnTalent(knownTalents, talent)
          const unmetRequirements = getUnmetRequirements(
            talent,
            knownTalents,
            pointsInSpec,
            specNames[specId]
          )

          return (
            <React.Fragment key={talent.id}>
              <Talent
                talent={talent}
                points={points}
                errors={unmetRequirements}
                onClick={handleClick}
                onRightClick={handleRightClick}
                disabled={availablePoints === 0 || !canLearn}
              />

              {talent.requires.map((req) => (
                <Arrow
                  key={req}
                  from={talentsById[req]}
                  to={talent}
                  active={points > 0 || canLearn}
                />
              ))}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

export default connect(null, { resetSpec })(TalentTree)
