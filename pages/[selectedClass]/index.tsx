import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Home from '../../vanilla/containers/Home'

const HomePage: NextPage = () => {
  const router = useRouter()
  const { selectedClass } = router.query

  return <Home selectedClass={selectedClass} pointString={''} />
}

export default HomePage
