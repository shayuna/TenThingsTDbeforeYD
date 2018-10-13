
const initialState = {
    name:"",
}

const userReducer = (state=initialState,{type,name,id}) => {
    switch (type){
        case "SET_USER":
            return {
                ...state,
                name,
                id,
            };
        default:
            return state;
    }
}


export default userReducer;