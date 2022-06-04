import { ReactElement, ReactNode } from 'react'
import { Props as BaseProps, Tooltip } from './Tooltip'

interface Props extends BaseProps {
  children: ReactElement
  content?: ReactNode
  talent: TalentData
  points: number
  errors?: string
  currentSpellId?: number
  nextSpellId?: number
}

export function TalentTooltip({
  children,
  talent,
  points,
  errors,
  content,
}: Props) {
  const title = talent.name
  const description = talent.description

  return (
    <Tooltip
      fixed
      title={title}
      content={
        <>
          <p className="tight">
            Rank {points}/{talent.ranks}
          </p>
          {errors &&
            errors.split('_').map((err, index) => (
              <p key={index} className="tight" style={{ color: 'red' }}>
                {err}
              </p>
            ))}
          <p className="yellow">{description}</p>

          {/* TODO: use rank to get correct description */}
          {/* <> */}
          {/* <p className="tight">Next rank:</p> */}
          {/* <p className="yellow">{talent.description}</p> */}
          {/* </> */}

          {content}
        </>
      }
      icon={false}
    >
      {children}
    </Tooltip>
  )
}
