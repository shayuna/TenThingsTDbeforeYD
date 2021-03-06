import React,{Component} from "react";
import Button from "./button";
import {connect} from "react-redux";
import {getitems,updatelikes,clearitems} from "../redux/actions/items";
import {updatelikesinuser} from "../redux/actions/user";

class ItemsList extends Component {
    constructor(){
        super();
        this.state={
            currentList:null
        };
    }
    render(){
        return (
            <div>
                <h3>items list:</h3>
                {
                    this.state.currentList && this.props.items[this.state.currentList] && this.props.items[this.state.currentList].map((itm,ii)=>(
                        <article style={styles.itmStyle} className="itm" key={ii} data-id={itm.id}>
                            <span>{itm.caption +" - " +itm.description+" - "}</span>
                            <Button caption={itm.username} withBorder="1" activateProperFunctionBoy={(event)=>{this.getList("username",itm.username)}}/>
                            <Button caption={itm.likes} withBorder="1" activateProperFunctionBoy={(event)=>{/*this.plusOne(event)*/this.updatelikes_new(event)}}/>
                            {itm.userid===this.props.user.id && <Button caption="Edit" withBorder="1" activateProperFunctionBoy={()=>this.editItem(itm.id,itm.caption,itm.description)}/>}
                            {itm.userid===this.props.user.id && <Button caption="Del" withBorder="1" activateProperFunctionBoy={()=>this.delItem(itm.id)}/>}
                        </article>
                    ))
                }
                <button onClick={()=>this.getpopular()}>popular</button>
            </div>
        )
    }

    plusOne(e){
        const elm=e.target;
        const id=elm.closest(".itm").getAttribute("data-id");
        
        /* the registered user should be allowed to vote, so the localstorage mechanism is pretty useless ? not sure*/
/*
        if (localStorage.getItem("likes-"+id)==="1")return;
        localStorage.setItem("likes-"+id,"1");
  */      
        //actually, you don't need here to reload the data. all you need is to add one to the likes
//        e.target.innerHTML=parseInt(e.target.innerHTML,10)+1;
// 15/10/2018 - one more thing. since the updatelikes has to update both users and items stores,
// we should perform the actual db update in a neutral place, aka here.

//        this.props.updatelikes(id,parseInt(elm.innerHTML,10)+1);
        this.updatelikes(id,parseInt(elm.innerHTML,10)+1);
        
    }
    updatelikes_new(e){
        const sUserID=this.props.user.id;
        const sItemID=e.target.closest(".itm").getAttribute("data-id");
        const iLikes=parseInt(e.target.innerHTML,10);
        if (sUserID){
            const bExists = this.props.user.likes.reduce((bExists1,val)=>{
                return bExists1 || val===sItemID;
            },false);
            this.props.updatelikesinuser(sItemID,bExists ? "REMOVE" : "ADD");
            this.props.updatelikes(sItemID,bExists ? -1 : 1);
        }
    }
    updatelikes(sID,iLikes){
//        alert (sId+" *** "+iLikes+" *** "+this.props.user.id);
        const database = firebase.database(),sUID=this.props.user.id;
        database.ref("items/"+sID).update({
            likes:iLikes
        })
        .then(()=>{
            database.ref("users/"+sUID+"/likes").push({
                "itemID":sID
            })
            .then(()=>{
                  this.props.updatelikes_success(sID);
                  this.props.updatelikesinuser_success(sID);
    //            return dispatch(updatelikes_success(id));
            })
            .catch((err)=>{
                alert ("something went wrong when updating user. err is - "+err);
            });

//            return dispatch(updatelikes_success(id));
        })
        .catch((err)=>{
            alert ("something went wrong when updating likes on item. err is - "+err);
        });

    }
    getpopular(){
        this.getList("likes");
    }
    addTestData(){
/*
        const database = firebase.database();
        database.ref("items").push({
            caption:"omega",
            description:"this omega will blow your mind out, i guarantee it",
            username:"shay1",
            likes:80
        })
        database.ref("items").push({
            caption:"diving",
            description:"diving is fun, especially when you do it with sharks",
            username:"shay",
            likes:40
        })
        database.ref("items").push({
            caption:"screaming",
            description:"stand on a hilltop and scream, nothing beats it",
            username:"shay",
            likes:82
        })
        database.ref("items").push({
            caption:"sing",
            description:"sing softly, sing loud just sing",
            username:"shay1",
            likes:53
        })
        database.ref("items").push({
            caption:"eat candies",
            description:"eat them of all kinds religion and gender",
            username:"shay1",
            likes:74
        })
*/
    }
    getList(filter,valToMatch){
        // establish the list identifier to look for
        const id=valToMatch ? valToMatch : filter;
        if (!this.props.items[id]){
            console.log("going to db");
            this.state.currentList=id;
            this.props.getitems(filter,valToMatch);
        }
        else{
            console.log("not going to db");
            this.setState({
                currentList:id,
            });
        }
        
    }
    componentDidMount(){
        this.getList("likes");
    }
    componentWillReceiveProps(newProps){
//        console.log ("current list is - "+newProps.items.currentList);
        this.setState();
    }
    editItem(sID,sCaption,sDescription){
        this.props.editItem(sID,sCaption,sDescription);
    }
    delItem(sID){
        const database = firebase.database();
        database.ref("items/"+sID)
        .remove()
        .then(()=>{
            this.props.clearItems();//by this we are forcing the itemslist component to update from db
            this.getList(this.state.currentList);
        })
        .catch((err)=>{
            alert ("an error was detected in del item. err is - "+err);
        })
    }
};

const styles={
    itmStyle:{
        display:"flex",
        alignItems:"center",
    }
}

const mapStateToProps = (state) => {
    return {
        items:state.items,
        user:state.user,
        /*
        NodesManager: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading,
        selectedID:state.nodeSelection,
        treeHasChanged:state.treeHasChanged,
*/
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getitems: (filter,valToMatch) => dispatch(getitems(filter,valToMatch)),
        updatelikesinuser:(id,operation)=>dispatch(updatelikesinuser(id,operation)),
        updatelikes:(id,vl)=>dispatch(updatelikes(id,vl)),
        clearItems:()=>dispatch(clearitems()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);
//export default ItemsList;