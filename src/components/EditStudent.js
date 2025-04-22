import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: '',
    email: '',
    age: '',
    grade: ''
  });

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`http://localhost:5000/students/${id}`);
        const data = await response.json();
        setStudent(data);
      } catch (err) {
        console.error('Error fetching student:', err);
      }
    };
    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/students/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      });
      const updatedStudent = await response.json();
      toast.success('Student updated successfully!');
      navigate('/students');
    } catch (err) {
      console.error('Error updating student:', err);
      toast.error('Error updating student');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Student</h2>
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
      <button type="submit">Update Student</button>
    </form>
  );
};

export default EditStudent;