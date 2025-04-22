import { useState } from 'react';
import { toast } from 'react-toastify';

const AddStudent = ({ onAddStudent }) => {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    age: '',
    grade: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!student.name || !student.email || !student.age || !student.grade) {
      toast.error('Please fill in all fields');
      return;
    }
    onAddStudent(student);
    toast.success('Student added successfully!');
    setStudent({
      name: '',
      email: '',
      age: '',
      grade: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Student</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={student.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={student.email}
        onChange={handleChange}
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={student.age}
        onChange={handleChange}
      />
      <input
        type="text"
        name="grade"
        placeholder="Grade"
        value={student.grade}
        onChange={handleChange}
      />
      <button type="submit">Add Student</button>
    </form>
  );
};

export default AddStudent;