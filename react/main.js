import React,{Component} from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import Header from "./components/header";
import ItemsList from "./components/itemslist";
import Login from "./components/login";
import Register from "./components/Register";
import configureStore from "./redux/store/configurestore";

const store = configureStore();

const LOGIN_SCREEN=1;
const REGISTER_SCREEN=2;
const MAIN_SCREEN=3;


class App extends Component{
    constructor(){
        super();
        this.state={
            screen:MAIN_SCREEN,
        }
        this.login=this.login.bind(this);
        this.register=this.register.bind(this);
        this.add=this.add.bind(this);
        this.main=this.main.bind(this);
    }
    render(){
        return (
            <Provider store={store}>
                <article>
                    <Header login={this.login} register={this.register} add={this.add} user={store.getState().user}/>
                        {this.state.screen===MAIN_SCREEN && <ItemsList />}
                        {this.state.screen===LOGIN_SCREEN && <Login switchToMain={this.main}/>} 
                        {this.state.screen===REGISTER_SCREEN && <Register switchToMain={this.main}/>}
                </article>
            </Provider>
        );
    }
    login(){
        this.setState({
            screen:LOGIN_SCREEN,
        });
    }
    register(){
        this.setState({
            screen:REGISTER_SCREEN,
        });
    }
    main(){
        this.setState({
            screen:MAIN_SCREEN,
        });
    }
    add(){
        alert ("adding new item");
    }
}



ReactDOM.render(<App/>,document.querySelector("#eRoot"));