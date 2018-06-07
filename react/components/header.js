import React from "react";
import Logo from "./logo";
import Button from "./button";

const Header = (props)=>(
    <div style={styles.header}>
        <Logo/>
        <Button caption="Login" activateProperFunctionBoy={props.login}/>
        <Button caption="Register" activateProperFunctionBoy={props.register}/>
    </div>
)

const styles = {
    header:{
        display:"flex",
        alignItems:"center",
    },
}

export default Header;