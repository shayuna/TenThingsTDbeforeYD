export const getlist = (type="",id="")=>({
    type,
    id
});

export const getpopularitems_success = (items)=>({
    type:"GET_POPULAR_ITEMS_SUCCESS",
    items
})

export const updatelikes_success = (id)=>({
    type:"UPDATE_LIKES_SUCCESS",
    id,
});

export const updatelikes = (id,likes)=>{
    return (dispatch) => {
        const database = firebase.database();
        database.ref("items/"+id).update({
            likes
        },()=>{
            return dispatch(updatelikes_success(id));
        });
    };
}

export function getpopularitems() {
    return (dispatch) => {
        const database = firebase.database();
        database.ref("items").once("value")
        .then((snapshot)=>{
            let items=[];
            snapshot.forEach((childsnapshot)=>{
                items.push(
                    {
                        id:childsnapshot.key,
                        ...childsnapshot.val()
                    }                    
                );
            });
            return dispatch(getpopularitems_success(items));
        })
        .catch((err)=>{
            console.log ("error in loading data. err is - ",err);
        });
    };
}
