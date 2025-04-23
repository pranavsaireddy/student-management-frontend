import { useState, useEffect } from 'react';
import StudentList from '../components/StudentList';

const Home = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('https://student-management-backend-7xw2.onrender.com');
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
