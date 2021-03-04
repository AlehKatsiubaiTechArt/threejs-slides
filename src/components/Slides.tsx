import { LinearProgress } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
} from 'react-router-dom'

export interface ISlide {
  path: string
  component: any
}

export default function Slides({ slides = [] }: { slides: ISlide[] }) {
  const location = useLocation()
  const history = useHistory()
  const currentSlideIndex = slides.findIndex(
    (slide) => `/${slide.path}` === location.pathname
  )
  const setPage = (page: number) => {
    history.push(
      `/${slides[Math.min(Math.max(0, page), slides.length - 1)].path}`
    )
  }
  return (
    <div>
      <LinearProgress
        style={{ position: 'absolute', top: 0, right: 0, left: 0, zIndex: 2 }}
        variant="determinate"
        value={(currentSlideIndex * 100) / slides.length}
      />
      <main style={{ position: 'relative', height: '100vh' }}>
        <Switch>
          {slides.map((slide) => (
            <Route key={slide.path} exact path={`/${slide.path}`}>
              {slide.component()}
            </Route>
          ))}
          {slides.map((slide, i) => (
            <Redirect
              key={i}
              exact
              path={`/page/${i + 1}`}
              to={`/${slide.path}`}
            />
          ))}
          <Redirect path="/" to="/page/1" />
        </Switch>
      </main>
      <PageSwitch
        currentSlideIndex={currentSlideIndex}
        slides={slides}
        setPage={setPage}
      />
    </div>
  )
}

function PageSwitch({
  currentSlideIndex,
  setPage,
  slides,
}: {
  currentSlideIndex: number
  setPage: any
  slides: ISlide[]
}) {
  const [value, setValue] = useState(currentSlideIndex + 1)

  useEffect(() => {
    setValue(currentSlideIndex + 1)
  }, [currentSlideIndex])

  const prevPage = useCallback(() => {
    // setValue(currentSlideIndex)
    setPage(currentSlideIndex - 1)
  }, [currentSlideIndex, setPage])

  const nextPage = useCallback(() => {
    // setValue(currentSlideIndex + 2)
    setPage(currentSlideIndex + 1)
  }, [currentSlideIndex, setPage])

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setValue(Math.min(Math.max(1, +value), slides.length))

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
      e.stopPropagation()
    }
  }

  const handleBlur = () => setPage(value - 1)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      console.log(e.code)
      if (e.code === 'ArrowLeft') {
        prevPage()
      } else if (e.code === 'ArrowRight') {
        nextPage()
      }
    }
    document.addEventListener('keyup', handler)
    return () => document.removeEventListener('keyup', handler)
  }, [nextPage, prevPage])

  return (
    <div className="page-switch ">
      <button disabled={currentSlideIndex <= 0} onClick={prevPage}>
        {'<='}
      </button>
      <input
        style={{ width: '30px' }}
        type="number"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyUp={handleKeyUp}
      />
      <button
        disabled={currentSlideIndex >= slides.length - 1}
        onClick={nextPage}
      >
        {'=>'}
      </button>
      <div>{slides[currentSlideIndex]?.path}</div>
    </div>
  )
}
