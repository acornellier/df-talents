import Link from 'next/link'
import React from 'react'

const App: React.FC = () => {
  return (
    <div className="App">
      <main>
        {/* <Switch>
          <Route exact path="/playground" component={LoadablePlayground} />
          <Route
            path="/:selectedClass?/:pointString?"
            component={LoadableHome}
          />
        </Switch> */}
      </main>

      <footer>
        <Link href="/">Home</Link>
        {' - '}
        <Link href="/playground">Components</Link>
        {' - '}
        <Link
          href="https://github.com/mirague/wow-talent-calculator"
          target="_blank"
        >
          Source
        </Link>
      </footer>
    </div>
  )
}

export default App
