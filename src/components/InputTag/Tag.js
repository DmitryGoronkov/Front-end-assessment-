import React from 'react';
const tagStyle = {
    display: "inline-block",
    backgroundColor: "#F0EFE7",
    fontSize: "0.9em",
    margin: "5px",
    padding: "0.7rem",
    borderRadius: "40px",
    boxSizing:"border-box",	
    color: "rgba(0,0,0,0.4)"
}
export default class Tag extends React.Component{
    render (){
        var tag = (
            <div 
            style={tagStyle}>
                {this.props.value}
            </div>
        )
        return(
            <React.Fragment>
                {tag}
            </React.Fragment>
        )
    }
}