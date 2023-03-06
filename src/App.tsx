import { useState }  from 'react';

import Select from "./Select";


const options = [
  {label: "First", value: 1},
  {label: "Second", value: 2},
  {label: "Third", value: 3},
  {label: "Fourth", value: 4},
  {label: "Fifth", value: 5},
]

function App() {
  // here we are setting up the first set of the array as the default state
  const [value, setValue] = useState<typeof options[0] | undefined> (options[0])
  

  return (
    <>
    <Select options={options} value={value} onChange={option => setValue(option)} />
    </>
      
  )
}
// this get exported to index . tsx
export default App;
