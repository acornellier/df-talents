import React from 'react'
import { connect } from 'react-redux'
import Calculator from '../components/Calculator'
import { ClassPicker } from '../components/ClassPicker'
import { classByName, classById } from '../data/classes'
import { AppState } from '../store'
import { setClass, setPoints } from '../store/calculator/actions'
import { Points } from '../store/calculator/types'
import { decodeKnownTalents, encodeKnownTalents } from '../lib/tree'
import classNames from 'classnames'

interface Props {
  selectedClass: string
  pointString: string
  classId: number
  points: Points
  setClass: typeof setClass
  setPoints: typeof setPoints
}

export class Home extends React.PureComponent<Props> {
  get classSlug() {
    return (
      classById[this.props.classId] &&
      classById[this.props.classId].name.toLowerCase()
    )
  }

  componentDidMount() {
    this.loadFromUrlParams()
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.selectedClass !== this.props.selectedClass) {
      // Class changed in route
      this.loadFromUrlParams()
    } else if (this.props.classId) {
      // Changes within same class
      if (prevProps.pointString !== this.props.pointString) {
        // Same class but point string changed
        const decoded = decodeKnownTalents(
          this.props.pointString || '',
          this.props.classId
        )
        if (!this.props.points.equals(decoded)) {
          this.props.setPoints(decoded)
        }
      } else if (prevProps.points !== this.props.points) {
        // Points map changed, update the URL
        this.updateURL(this.props.points)
      }
    }
  }

  componentWillUnmount() {
    this.props.setClass(null)
  }

  loadFromUrlParams() {
    const { selectedClass, pointString } = this.props
    const c = selectedClass && classByName[selectedClass]
    if (c) {
      const points = pointString && decodeKnownTalents(pointString || '', c.id)
      this.props.setClass(c.id, points)
    } else {
      this.props.setClass(null)
      // this.props.history.replace('/')
    }
  }

  updateURL(points: Points) {
    const { classId } = this.props
    const pointsString = encodeKnownTalents(points, classId)
    // if (pointsString !== this.props.match.params.pointString) {
    // this.props.history.replace(
    // `/${this.classSlug}` + (pointsString ? `/${pointsString}` : '')
    // )
    // }
  }

  render() {
    const { selectedClass, classId } = this.props

    const currentClass = classById[classId]
    if (classId && !currentClass) {
      // We're redirecting to /
      return null
    }

    const classPickerCn = classNames('home__class-picker', {
      'home__class-picker--highlight': !selectedClass,
    })

    return (
      <div className="home">
        <div className="container">
          <div className={classPickerCn}>
            {!selectedClass && (
              <h3 className="home__class-picker-title">Choose a class</h3>
            )}
            <ClassPicker center selected={selectedClass} />
          </div>

          {currentClass && (
            <Calculator classId={classId} points={this.props.points} />
          )}
        </div>
      </div>
    )
  }
}

export default connect(
  ({ calculator }: AppState) => ({
    classId: calculator.classId,
    points: calculator.points,
  }),
  { setClass, setPoints }
)(Home)
