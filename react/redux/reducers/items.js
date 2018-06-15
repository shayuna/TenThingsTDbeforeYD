const itemsReducer = (state=[],action) => {
    switch (action.type){
        case "GET_POPULAR_ITEMS_SUCCESS":
            return action.items;
        case "UPDATE_LIKES_SUCCESS":
            return state.map((itm,ii)=>{
                if (itm.id===action.id)itm.likes++;
                return itm;
            })
        default:
            return[];
        }
}


export default itemsReducer;