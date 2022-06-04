import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import Link from 'next/link'
import store from '../vanilla/store'
import '../styles/App.scss'
import '../styles/Arrow.scss'
import '../styles/Calculator.scss'
import '../styles/ClassPicker.scss'
import '../styles/Home.scss'
import '../styles/Icon.scss'
import '../styles/Talent.scss'
import '../styles/TalentTree.scss'
import '../styles/Tooltip.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className="App">
        <main>
          <Component {...pageProps} />
        </main>
        <footer>
          <Link href="/">Home</Link>
          {' - '}
          <Link
            href="https://github.com/acornellier/df-talents"
            target="_blank"
          >
            Source
          </Link>
        </footer>
      </div>
    </Provider>
  )
}
export default MyApp
