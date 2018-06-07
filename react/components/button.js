import React from "react";

const Button = (props)=>(
    <div style={styles.button} onClick={props.activateProperFunctionBoy}>
        {props.caption}
    </div>

);

const styles = {
    button:{
        fontSize:"1em",
        margin:"0.5em",
        cursor:"pointer"
    }
}
export default Button;