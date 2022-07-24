import SampleType from 'types/sample'
import { setData } from 'redux/slice/sample'
import { useSelector, useDispatch } from 'react-redux'

export interface SampleI {}

export function SampleComponent({}: SampleI) {
  const dispatch = useDispatch()
  const data = useSelector((state: { sample: { data: SampleType } }) => ({ ...state.sample.data }))

  return (
    <div>
      <h2>Component Sample</h2>
      <p>{data.value1}</p>
    </div>
  )
}
