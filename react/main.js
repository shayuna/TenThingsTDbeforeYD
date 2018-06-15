import React,{Component} from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import Header from "./components/header";
import ItemsList from "./components/itemslist";
import configureStore from "./redux/store/configurestore";

const store = configureStore();

class App extends Component{
    render(){
        return (
            <Provider store={store}>
                <div>
                    <Header login={this.login} register={this.register}/>
                    <ItemsList/>
                </div>
            </Provider>
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