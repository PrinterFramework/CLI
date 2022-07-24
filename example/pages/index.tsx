import OtherComponent from "components/other";
import { SampleComponent } from "components/sample";

export interface IndexI {}

export default function Index({}: IndexI) {
  return (
    <>
      <SampleComponent />
      <OtherComponent />
    </>
  )
}
