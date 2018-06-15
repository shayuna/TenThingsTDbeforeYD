import React from "react";

const Button = (props)=>(
    <div style={{...styles.button,...(parseInt(props.withBorder,10)===1 ? styles.withBorder : {})}} onClick={props.activateProperFunctionBoy}>
        {props.caption}
    </div>

);

const styles = {
    button:{
        fontSize:"1em",
        margin:"0.5em",
        cursor:"pointer"
    },
    withBorder:{
        padding:"0.5em",
        border:"1px solid black"
    }
}
export default Button;