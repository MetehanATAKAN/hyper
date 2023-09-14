const initialState={
    name:"metehan",
    num:null,
}

 const counter=(state=initialState,{type,payload})=>{
    switch (type) {
        case "INCREMENT":
            return(
                state.num=payload
                
            )
    
        default:
            return state
    }
}

export default counter;