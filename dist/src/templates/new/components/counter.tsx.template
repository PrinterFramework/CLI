'use client'
import { decrement, increment, reset } from 'redux/slice/counter'
import { useDispatch, useSelector } from 'redux/store'

export interface CounterI {}

export function Counter({}: CounterI) {
  const count = useSelector((state) => state.counter.data.value)
  const dispatch = useDispatch()

  return (
    <section className="container page center root-page">
      <h2>Counter is at {count}</h2>

      <div className="buttons">
        <a className="button" onClick={() => dispatch(increment(1))}>
          Increment
        </a>
        <a className="button" onClick={() => dispatch(decrement(1))}>
          Decrement
        </a>
        <a className="button" onClick={() => dispatch(reset())}>
          Reset
        </a>
      </div>
    </section>
  )
}

export default Counter
