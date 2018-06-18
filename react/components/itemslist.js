import React,{Component} from "react";
import Button from "./button";
import {connect} from "react-redux";
import {getitems,updatelikes} from "../redux/actions/items";

class ItemsList extends Component {

    constructor(){
        super();
        this.state={
            items:{}
        };
    }
    render(){
        return (
            <div>
                <h3>items list:</h3>
                {
                    this.state.items.currentList && this.state.items[this.state.items.currentList].map((itm,ii)=>(
                        <article style={styles.itmStyle} className="itm" key={ii} data-id={itm.id}>
                            <span>{"itm.caption" +" - " +itm.description+" - "}</span>
                            <Button caption={itm.username} withBorder="1" activateProperFunctionBoy={(event)=>{this.getList("username",itm.username)}}/>
                            <Button caption={itm.likes} withBorder="1" activateProperFunctionBoy={(event)=>{this.plusOne(event)}}/>
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
        this.props.updatelikes(id,parseInt(elm.innerHTML,10)+1);
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
            this.props.getitems(filter,valToMatch);
        }
        else{
            console.log("not going to db");
            this.setState({
                items:{
                        ...this.props.items,
                        currentList:id
                },
            })
        }
        
    }
    componentDidMount(){
        this.getList("likes");
    }
    componentWillReceiveProps(newProps){
//        console.log ("current list is - "+newProps.items.currentList);
        this.setState({items:newProps.items});
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
        updatelikes:(id,likes)=>dispatch(updatelikes(id,likes)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);
//export default ItemsList;