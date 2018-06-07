import React,{Component} from "react";

class ItemsList extends Component {

    constructor(){
        super();
        this.state={
            items:[]
        }
    }
    render(){
        return (
            <div>
                <h3>items list:</h3>
                {
                    this.state.items.map((itm,ii)=>(
                        <div key={ii}>
                            <span>{itm.caption +" - " +itm.description+" - "+ itm.likes}</span>
                        </div>
                    ))
                }
            </div>
        )
    }
    componentDidMount(){
/*        
        const firebaseItems = {
            items:{
                bla1:{
                    username:"shay1",
                    caption:"dive with sharks1",
                    description:"this hsould befantastic1",
                    likes:100
                },
                bla2:{
                    username:"shay2",
                    caption:"dive with sharks2",
                    description:"this hsould befantastic2",
                    likes:200
                }
                
            }
        }
        const items = [
            {
                username:"shay1",
                caption:"dive with sharks1",
                description:"this hsould befantastic1",
                likes:100
            },
            {
                username:"shay2",
                caption:"dive with sharks2",
                description:"this hsould befantastic2",
                likes:100
            },
            {
                username:"shay3",
                caption:"dive with sharks3",
                description:"this hsould befantastic3",
                likes:100
            },
            {
                username:"shay4",
                caption:"dive with sharks4",
                description:"this hsould befantastic4",
                likes:100
            }
        ]
        const database = firebase.database();
        database.ref().set(items);
*/
/*
        database.ref().once("value")
        .then((snapshot)=>{
            this.setState({
                doc:"111"
            })
        })
        .catch((err)=>{
            console.log ("there was an error, sorry. the err is - ",err);
        });
*/
/*
        database.ref("items").push({
            username:"shay2",
            caption:"dive with sharks2",
            description:"this hsould befantastic2",
            likes:200,
        })

        database.ref("items").on("child_removed",(snapshot)=>{
            console.log(snapshot.key,snapshot.val());
        });
        database.ref("items").on("child_changed",(snapshot)=>{
            console.log(snapshot.key,snapshot.val());
        });
        database.ref("items").on("child_added",(snapshot)=>{
            console.log(snapshot.key,snapshot.val());
        });
*/
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

            this.setState({
                items:items
            })
            console.log(items);
        })
        .catch((err)=>{
            console.log ("there was an error, sorry. the err is - ",err);
        });

    }

};

export default ItemsList;