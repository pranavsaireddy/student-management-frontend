import { useState, useEffect } from 'react';  // Added useEffect here
import StudentList from '../components/StudentList';
import AddStudent from '../components/AddStudent';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {  // Now properly defined
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

  const handleAddStudent = async (studentData) => {
    try {
      const response = await fetch('https://student-management-backend-7xw2.onrender.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });
      const newStudent = await response.json();
      setStudents([...students, newStudent]);
      setShowAddForm(false);
    } catch (err) {
      console.error('Error adding student:', err);
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await fetch(`https://student-management-backend-7xw2.onrender.com/${id}`, {
        method: 'DELETE',
      });
      setStudents(students.filter(student => student._id !== id));
    } catch (err) {
      console.error('Error deleting student:', err);
    }
  };

  return (
    <div>
      <h1>Student Management</h1>
      <button onClick={() => setShowAddForm(!showAddForm)}>
        {showAddForm ? 'Cancel' : 'Add New Student'}
      </button>
      
      {showAddForm && <AddStudent onAddStudent={handleAddStudent} />}
      
      <StudentList 
        students={students} 
        onDeleteStudent={handleDeleteStudent}
        readOnly={false}
      />
    </div>
  );
};

export default Students;
