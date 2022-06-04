import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Home from '../../vanilla/containers/Home'
import { SpecId } from '../../vanilla/data/classes'

const HomePage: NextPage = () => {
  const router = useRouter()
  const { selectedSpec } = router.query

  return <Home specId={Number(selectedSpec) as SpecId} />
}

export default HomePage
