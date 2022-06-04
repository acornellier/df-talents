import React from 'react'
import { connect } from 'react-redux'
import Calculator from '../components/Calculator'
import { ClassPicker } from '../components/ClassPicker'
import { SpecId } from '../data/classes'
import { AppState } from '../store'
import { setPoints } from '../store/calculator/actions'
import { Points } from '../store/calculator/types'
import classNames from 'classnames'

interface Props {
  specId: SpecId | null
  points: Points
  setPoints: typeof setPoints
}

export function Home({ specId, points }: Props) {
  const classPickerCn = classNames('home__class-picker', {
    'home__class-picker--highlight': !specId,
  })

  return (
    <div className="home">
      <div className="container">
        <div className={classPickerCn}>
          {!specId && (
            <h3 className="home__class-picker-title">Choose a spec</h3>
          )}
          <ClassPicker center selected={specId} />
        </div>

        {specId && <Calculator specId={specId} points={points} />}
      </div>
    </div>
  )
}

export default connect(
  ({ calculator }: AppState) => ({
    points: calculator.points,
  }),
  { setPoints }
)(Home)
