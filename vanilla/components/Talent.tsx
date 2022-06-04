import React from 'react'
import { Icon } from './Icon'
import classNames from 'classnames'
import { TalentTooltip } from './TalentTooltip'

interface Props {
  talent: TalentData
  points: number
  disabled?: boolean
  errors?: string
  onClick: (talentId: number) => void
  onRightClick: (talentId: number) => void
}

export class Talent extends React.PureComponent<Props> {
  static defaultProps = {
    points: 0,
    disabled: false,
    onClick: () => undefined,
    onRightClick: () => undefined,
  }

  render() {
    const { talent, points, errors, disabled } = this.props
    const showPoints = !disabled || points > 0

    const containerClassNames = classNames('talent', {
      'talent--disabled': disabled && points === 0,
      'talent--available': !disabled && points < talent.ranks,
      'talent--disabled-with-points':
        points >= talent.ranks || (points > 0 && disabled),
    })

    const pointsClassNames = classNames('point-label', {
      'point-label--enabled': !disabled,
    })

    return (
      <div
        className={containerClassNames}
        data-row={talent.row}
        data-col={talent.col}
        onClick={!disabled ? () => this.props.onClick(talent.id) : () => {}}
        onContextMenu={(e) => {
          this.props.onRightClick(talent.id)
          e.preventDefault()
          return false
        }}
      >
        <TalentTooltip
          content={
            <>
              {!disabled && points < talent.ranks && (
                <p className="green tight">Click to learn</p>
              )}
              {points > 0 && <p className="green">Right-click to unlearn</p>}
            </>
          }
          talent={talent}
          points={points}
          errors={errors}
        >
          <>
            <div className="talent__status" />
            <Icon name={talent.icon} size="medium" />

            {showPoints && (
              <div className={pointsClassNames}>
                {points}/{talent.ranks}
              </div>
            )}
          </>
        </TalentTooltip>
      </div>
    )
  }
}
