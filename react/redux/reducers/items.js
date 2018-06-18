
const initialState = {
}

const itemsReducer = (state=initialState,action) => {
    switch (action.type){
        case "GET_ITEMS_SUCCESS":
            let objToRet={
                ...state,
            };
            objToRet[action.tag]=action.items;
            return objToRet;
        case "UPDATE_LIKES_SUCCESS":
            let objToRet1={
                ...state,
            };
            for (const prop in objToRet1){
                if (Array.isArray(objToRet1[prop])){
                    objToRet1[prop].forEach((itm,ii)=>{
                        if (itm.id===action.id){
                            itm.likes++;
                        }
                    })
                }
            };
            return objToRet1;
        default:
            return[];
        }
}


export default itemsReducer;