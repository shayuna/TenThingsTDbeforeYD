
const initialState = {
    user:null,
}

const userReducer = (state=initialState,action) => {
    switch (action.type){
        case "SET_USER":
            return action.name;
        default:
            return null;
    }
}


export default userReducer;