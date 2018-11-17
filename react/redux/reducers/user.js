
const initialState = {
    name:"",
    likes:[],
}

const userReducer = (state=initialState,{type,name,id,itemId}) => {
    switch (type){
        case "SET_USER":
            return {
                ...state,
                name,
                id,
            };
        case "UPDATE_LIKES_IN_USER_SUCCESS":
            return {
                ...state,
                likes:[...state.likes,itemId],
            };
        default:
            return state;
    }
}


export default userReducer;