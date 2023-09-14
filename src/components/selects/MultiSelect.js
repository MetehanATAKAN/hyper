import React from 'react'
import  {MDBDropdown} from "mdb-react-ui-kit";
const MultiSelect = () => {
  const state = {
    options: [
      {
        text: "Option nr 1",
        value: "1"
      },
      {
        text: "Option nr 2",
        value: "2"
      },
      {
        text: "Option nr 3",
        value: "3"
      }
    ]
  };
  return (
    <div>
        <MDBDropdown
          multiple
          options={state.options}
          selected="Choose your option"
          label="Example label"
        />
      </div>
  )
}

export default MultiSelect