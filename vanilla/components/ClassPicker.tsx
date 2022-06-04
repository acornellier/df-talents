import React from 'react'
import { SpecId, classes, specNames } from '../data/classes'
import { Icon } from './Icon'
import classNames from 'classnames'
import { Tooltip } from './Tooltip'
import Link from 'next/link'

interface Props {
  selected: SpecId | null
  center?: boolean
  className?: string
}

const classNameForItem = (spec: SpecId, selected: SpecId | null) =>
  classNames('class-picker__class', {
    'class-picker__class--active': spec === selected,
    'class-picker__class--inactive': !!selected && spec !== selected,
  })

export function ClassPicker({ selected, center = false, className }: Props) {
  const cn = classNames(
    'class-picker',
    {
      'class-picker--has-selection': !!selected,
      'class-picker--center': center,
    },
    className
  )

  return (
    <ul className={cn}>
      {classes.flatMap((c) =>
        c.specs.map((spec) => (
          <li key={spec} className={classNameForItem(spec, selected)}>
            <Tooltip title={specNames[spec]}>
              <Link href={`/${spec}`}>
                <Icon name={c.icon} golden={selected === spec} />
              </Link>
            </Tooltip>
          </li>
        ))
      )}
    </ul>
  )
}
