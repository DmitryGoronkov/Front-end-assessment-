import React from 'react';
import "./student.scss"
import plus from "../../assets/svg/plus.svg"
import minus from "../../assets/svg/minus.svg"
import Tag from '../InputTag/Tag';

class Student extends React.Component {
    state={
        showDetails: false,
        text: "",
        tags: []
    }
    onClickDetails=()=>{
        this.setState({showDetails:!this.state.showDetails})
    }
    onTextChanged = (e) => {
        const value = e.target.value;
        this.setState({text: value });
      }
    onKeyUp=(e)=>{
        if (e.which === 32 || e.which === 13){
          let input = e.target.value;
            if (input.length === 0 || input[0] === "") return;
            if (input === " "){
              e.target.value="";
              return;
            }
            this.setState({
              tags: [...this.state.tags, input,], text: ""
            })
            this.props.action([...this.state.tags, input,],this.props.id);
              e.target.value = "";
            }
      }
    render(){
      const {pic,firstName,lastName,email,company,skill,grades} = this.props;
      const name = `${firstName} ${lastName}`;
      const sum = grades.reduce((total,num)=>total+parseInt(num),0);
      const average = Math.round(sum/grades.length*1000)/1000;
      let toggle = {};
      let tags = this.props.tags.map((tag) => {
        return <Tag key={tag} value={tag} />
      })
      if (this.state.showDetails){
        toggle = minus;
      } else {
        toggle = plus;
      }
    return (
        <div className="student">
            <img src={`${pic}`} alt="Avatar" className="student__image"/>
            <div className="student__info">
                <h1>{name.toUpperCase()}</h1>
                <div className="student__info__data">
                    <div>Email: {email}</div>
                    <div>Company: {company}</div>
                    <div>Skill: {skill}</div>
                    <div className="student__info__data__average">Average: {average}%</div>
                    {this.state.showDetails?(<> 
                                                {grades.map((grade,index)=>{
                                                    return(
                                                        <div>Test{index+1}:<span style={{marginLeft:"1.5rem"}}>{grade}%</span></div>
                                                    )
                                                })}
                                            <div className="student__tags">{tags}</div>
                                            <input className="student__inputText" placeholder="Add a tag" onKeyUp={(e)=>this.onKeyUp(e)} value = {this.state.text} onChange={this.onTextChanged}/> 
                                            </>):null}
                    </div>
            </div>
            <button className="student__button" onClick={this.onClickDetails}><img src={toggle}></img></button>
            
        </div>
        );
    }
}

export default Student;