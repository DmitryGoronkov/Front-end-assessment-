import React from 'react';
import './App.css';
import Student from './components/student/student'
import axios from 'axios'

class App extends React.Component {
  state = {
    students: []
  }
  componentDidMount(){
    axios.get (`https://www.hatchways.io/api/assessment/students`)
      .then (response => {
        this.setState({students: response.data.students})
      })
      .catch (error => {
        console.log("Error receiving data")
      })
  }
  render(){
    console.log(this.state.students)
  return (
      <div className="App">
        {this.state.students.map(student=>{
          return(<Student
            key={student.id} 
            pic={student.pic}
            company={student.company}
            email={student.email}
            firstName={student.firstName}
            lastName={student.lastName}
            skill={student.skill}
            grades={student.grades}
          ></Student>)
        })}
      </div>
    );
  }
}

export default App;
