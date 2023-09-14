import React from 'react'
import { Backdrop, CircularProgress } from "@material-ui/core";
const Loading = ({loading}) => {
  return (
    <div>
        <Backdrop style={{zIndex:"999999999"}} open={loading}>
            <CircularProgress />
        </Backdrop>
    </div>
  )
}
export default Loading