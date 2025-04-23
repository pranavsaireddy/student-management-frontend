import { useState, useEffect } from 'react';
import AddStudent from './AddStudent';

const Students = () => {
  const API_URL = 'https://student-management-backend-7xw2.onrender.com';
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${API_URL}/students`);
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }
        const data = await response.json();
        setStudents(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching students:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  // Add new student
  const onAddStudent = async (student) => {
    try {
      const response = await fetch(`${API_URL}/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add student');
      }

      const newStudent = await response.json();
      setStudents([...students, newStudent]);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error adding student:', err);
    }
  };

  if (loading) return <div>Loading students...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="students-container">
      <h2>Student Management</h2>
      
      <AddStudent onAddStudent={onAddStudent} />
      
      <h3>Student List</h3>
      <ul className="student-list">
        {students.length > 0 ? (
          students.map((student) => (
            <li key={student._id} className="student-item">
              <span>{student.name}</span> - <span>{student.email}</span>
            </li>
          ))
        ) : (
          <li>No students found</li>
        )}
      </ul>
    </div>
  );
};

export default Students;
