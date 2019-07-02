import React from 'react';
import './App.scss';
import Student from './components/student/student'
import axios from 'axios'

class App extends React.Component {
  state = {
    students: [],
    textByName:  "",
    textByTag: "",
    suggestions: [],
    regexByName: "" 
  }
  
  onTextChanged = (e) => {
    const valueByName = this.refs.byName.value;
    const valueByTag = this.refs.byTag.value;
    let suggestions = [];
    if (valueByName.length >= 0) {
        const regexByName = new RegExp(`^${valueByName}`, 'i');
        const regexByTag = new RegExp(`^${valueByTag}`, 'i');
        suggestions = this.state.students.sort(function(a, b){
          if(a.lastName < b.lastName) { return -1; }
          if(a.lastName > b.lastName) { return 1; }
          return 0;
        })
        let suggestionsFiltered=suggestions.filter(v => (regexByName.test(v.lastName))||(regexByName.test(v.firstName)));
        function regexTrue(element, index, array) {
          return regexByTag.test(element)
        }
        let suggestionsFiltered2=suggestionsFiltered;
        if (valueByTag.length>0){
          suggestionsFiltered2=suggestionsFiltered.filter(suggestion => (suggestion.tags.some(regexTrue)),);
        } 
        this.setState({suggestions:suggestionsFiltered2, textByName: valueByName, textByTag: valueByTag });
    }
    
    
  }
  componentDidMount(){
    axios.get (`https://www.hatchways.io/api/assessment/students`)
      .then (response => {
        const data = response.data.students;
        let students = data.map(function(element) {
          var object = Object.assign({}, element);
          object.tags = [];
          return object;
        })
        this.setState({students: students, suggestions: students})
      })
      .catch (error => {
        console.log("Error receiving data")
      })
  }
  render(){
    console.log(this.state.students)
  return (
      <div className="App">
        <input ref="byName" className="inputText" placeholder="Search by name" value = {this.state.textByName} onChange={this.onTextChanged}/>
        <input ref="byTag" className="inputText" placeholder="Search by tag" value = {this.state.textByTag} onChange={this.onTextChanged}/>
        {this.state.suggestions.map(student=>{
          const childHandler=(dataFromChild, id)=> {
            let newStudent = {...student, tags: dataFromChild}
            var foundIndexSt = this.state.students.findIndex(item => item.id == id);
            var foundIndexSug = this.state.suggestions.findIndex(item => item.id == id);
            let updatedSuggestions = this.state.suggestions;
            updatedSuggestions[foundIndexSug] = newStudent;
            let updatedStudents = this.state.students;
            updatedStudents[foundIndexSt] = newStudent;
            this.setState({
                suggestions: updatedSuggestions, students: updatedStudents
            })
          }
          return(<Student
            action={childHandler}
            tags={student.tags}
            id={student.id}
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

