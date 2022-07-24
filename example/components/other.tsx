import SampleType from 'types/sample'
import { setData } from 'redux/slice/sample'
import { useSelector, useDispatch } from 'react-redux'

export interface OtherI {}

export function OtherComponent({}: OtherI) {
  const dispatch = useDispatch()
  const data = useSelector((state: { sample: { data: SampleType } }) => ({ ...state.sample.data }))

  return (
    <div>
      <h2>Component Other</h2>
      <p>{data.value2}</p>
    </div>
  )
}

export default OtherComponent
