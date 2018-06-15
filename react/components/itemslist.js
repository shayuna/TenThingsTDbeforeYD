import React,{Component} from "react";
import Button from "./button";
import {connect} from "react-redux";
import {getpopularitems,updatelikes} from "../redux/actions/items";

class ItemsList extends Component {

    constructor(){
        super();
        this.state={
            items:[]
        };
    }
    render(){
        return (
            <div>
                <h3>items list:</h3>
                {
                    this.state.items.map((itm,ii)=>(
                        <div style={styles.itmStyle} className="itm" key={ii} data-id={itm.id}>
                            <span>{itm.caption +" - " +itm.description+" - "}</span>
                            <Button caption={itm.likes} withBorder="1" activateProperFunctionBoy={(event)=>{this.plusOne(event)}}/>
                        </div>
                    ))
                }
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
        const database = firebase.database();
        //actually, you don't need here to reload the data. all you need is to add one to the likes
//        e.target.innerHTML=parseInt(e.target.innerHTML,10)+1;
        this.props.updatelikes(id,parseInt(elm.innerHTML,10)+1);
    }
    componentDidMount(){
        this.props.getpopularitems();
    }
    componentWillReceiveProps(newProps){
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
        items:state.items
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
        getpopularitems: () => dispatch(getpopularitems()),
        updatelikes:(id,likes)=>dispatch(updatelikes(id,likes)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);
//export default ItemsList;