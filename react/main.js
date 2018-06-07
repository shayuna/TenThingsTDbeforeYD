import React,{Component} from "react";
import ReactDOM from "react-dom";
import Header from "./components/header";
import ItemsList from "./components/itemslist";

class App extends Component{
    render(){
        return (
            <div>
                <Header login={this.login} register={this.register}/>
                <ItemsList/>
            </div>
        );
    }
    login(){
        alert ("login");
    }
    register(){
        alert ("register");
    }
}



ReactDOM.render(<App/>,document.querySelector("#eRoot"));