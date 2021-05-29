import './App.css';
import React, { useState } from 'react';
import { Select, Input } from 'antd';
import "antd/dist/antd.css";

function App() {

  const grades = [
    {grade: 'O', credit: 10},
    {grade: 'A+', credit: 9},
    {grade: 'A', credit: 8},
    {grade: 'B+', credit:7},
    {grade: 'B', credit: 6},
    {grade: 'C', credit: 5},
  ];

  const credits = {
    'O': 10,
    'A+': 9,
    'A': 8,
    'B+': 7,
    'B': 6,
    "c": 5
  }

  const [addSubject, setAddSubject] = useState([{credit: 0, grade: ''}]);

  const onChangeValueHandler = (field, index, value) => {
    setAddSubject(prevState => {
      const state = [...prevState];
      state[index][field] = value;
      return state;
    });
  }

  const removeSubject = index => {
    setAddSubject(prevState => {
      const state = [...prevState];
      state.splice(index, 1);
      return state;
    });
  }

  const onSubmitHanlder = () => {
    const totalCredits = addSubject.reduce((sum, subject) => subject.credit + sum, 0);
    const gainedCredits = addSubject.reduce((sum, subject) => subject.credit * credits[subject.grade] + sum, 0);
    alert(`Your SGPA is ${(gainedCredits / totalCredits).toFixed(2)}`);
  }

  const addSubjectHandler = () => {
    setAddSubject(prevState => {
      const state = [...prevState];
      state.push({credit: 0, grade: ''});
      return state;
    });
  }

  return (
    <div className="App">
      <div>
        {addSubject.map((subject, index) => <div key={index}>
          {`Subject ${index + 1}`}
          <Input 
            placeholder={`Enter Credit for Subject ${index + 1}`}
            onChange={value => {onChangeValueHandler('credit',index, Number(value.target.value))}}
            value={subject.credit}
          />
          <Select
            placeholder={`Select Grade for Subject ${index+1}`}
            value={subject.grade}
            onChange={e => {onChangeValueHandler('grade', index, e)}}
          >
            {grades.map(grade => <Select.Option key={grade.grade}>{grade.grade}</Select.Option>)}
          </Select>
          <p onClick={() => removeSubject(index)}>Remove</p>
        </div>)}
        <button onClick={addSubjectHandler}>Add Subject</button>
        <button onClick={onSubmitHanlder}>Submit</button>
      </div>
    </div>
  );
}

export default App;
