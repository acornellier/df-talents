import { ReactNode, useState } from 'react'
import classNames from 'classnames'
import { Icon } from '../Icon'

export interface Props {
  children: ReactNode
  title?: string
  content?: ReactNode
  /** Override width of tooltip. Needs `fixed` to be true to have effect. */
  width?: string
  /** Fixed width */
  fixed?: boolean
  /** Display tooltip inline */
  inline?: boolean
  /** Icon to show next to tooltip */
  icon?: string | false
  anchor?: HTMLElement
  style?: any
}

export function Tooltip({
  title,
  content,
  icon,
  children,
  style,
  width,
  fixed,
  inline,
}: Props) {
  const [active, setActive] = useState(false)

  const cn = classNames('tooltip', {
    'tooltip--fixed': fixed,
    'tooltip--inline': inline,
  })

  return (
    <div
      className="Tooltip-Wrapper"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {children}
      {active && (
        <div className={cn} style={{ opacity: 1, ...style }}>
          {icon && <Icon className="tooltip__icon" name={icon} />}
          <div className="tooltip__inner" style={{ width }}>
            <div className="tooltip__top">
              <div className="tooltip__body">
                {title && <div className="tooltip__title tight">{title}</div>}
                {content}
              </div>
            </div>

            <div className="tooltip__footer" />
          </div>
        </div>
      )}
    </div>
  )
}
