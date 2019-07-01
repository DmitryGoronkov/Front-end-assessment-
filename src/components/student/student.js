import React from 'react';


class Student extends React.Component {
  render(){
      const {pic,firstName,lastName,email,company,skill,grades} = this.props;
      const name = `${firstName} ${lastName}`
      
      const sum = grades.reduce((total,num)=>total+parseInt(num),0);
      const average = Math.round(sum/grades.length*1000)/1000;
    return (
        <div>
            <img src={`${pic}`} alt="Avatar" className="student__image"/>
            <h1>{name}</h1>
            <div>Email: {email}</div>
            <div>Company: {company}</div>
            <div>Skill: {skill}</div>
            <div>Average: {average}%</div>
        </div>
        );
    }
}

export default Student;