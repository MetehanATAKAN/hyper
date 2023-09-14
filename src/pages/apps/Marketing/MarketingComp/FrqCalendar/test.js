import React from 'react'

const Test = ({item}) => {
  return (
        <div>
            {item.id}
            {item.fName}
            {item.lName}
        </div>
  )
}

export default Test;