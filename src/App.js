import React from 'react';
import './App.scss';
import Student from './components/student/student'
import axios from 'axios'

class App extends React.Component {
  state = {
    students: [],
    text:  "",
    suggestions: []
  }
  onTextChanged = (e) => {
    const value = e.target.value;
    let suggestions = [];
    if (value.length >= 0) {
        const regex = new RegExp(`^${value}`, 'i');
        suggestions = this.state.students.sort(function(a, b){
          if(a.lastName < b.lastName) { return -1; }
          if(a.lastName > b.lastName) { return 1; }
          return 0;
        })
        let suggestionsFiltered=suggestions.filter(v => (regex.test(v.lastName))||(regex.test(v.firstName)));
        this.setState({suggestions:suggestionsFiltered, text: value });
        
    }
    
    
  }
  componentDidMount(){
    axios.get (`https://www.hatchways.io/api/assessment/students`)
      .then (response => {
        this.setState({students: response.data.students, suggestions: response.data.students})
      })
      .catch (error => {
        console.log("Error receiving data")
      })
  }
  render(){
    console.log(this.state.students)
  return (
      <div className="App">
        <input className="inputText" value = {this.state.text} onChange={this.onTextChanged}/>
        {this.state.suggestions.map(student=>{
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
