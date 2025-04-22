import { useState, useEffect } from 'react';
import StudentList from '../components/StudentList';

const Home = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:5000/students');
        const data = await response.json();
        setStudents(data);
      } catch (err) {
        console.error('Error fetching students:', err);
      }
    };
    fetchStudents();
  }, []);

  return (
    <div>
      <h1>Welcome to Student Management System</h1>
      <p>Current student records:</p>
      
      {students.length > 0 ? (
        <StudentList students={students} readOnly={true} />
      ) : (
        <p>No students found</p>
      )}
    </div>
  );
};

export default Home;