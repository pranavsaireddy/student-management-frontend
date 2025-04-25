// import { useState, useEffect } from 'react';
// import AddStudent from '../components/AddStudent';

// const Students = () => {
//   const API_BASE_URL = 'https://student-management-backend-7xw2.onrender.com';
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch all students
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await fetch(`${API_BASE_URL}/students`, {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
        
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
        
//         const contentType = response.headers.get('content-type');
//         if (!contentType || !contentType.includes('application/json')) {
//           throw new Error("Response is not JSON");
//         }
        
//         const data = await response.json();
//         setStudents(data);
//         setError(null);
//       } catch (err) {
//         setError(err.message);
//         console.error('Fetch error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStudents();
//   }, []);

//   // Add new student
//   const onAddStudent = async (student) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/students`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(student),
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const newStudent = await response.json();
//       setStudents([...students, newStudent]);
//     } catch (err) {
//       setError(err.message);
//       console.error('POST error:', err);
//     }
//   };

//   if (loading) return <div>Loading students...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h2>Students</h2>
//       <AddStudent onAddStudent={onAddStudent} />
      
//       <ul>
//         {students.map(student => (
//           <li key={student._id}>
//             {student.name} - {student.email}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Students;
import { useState, useEffect } from 'react';
import AddStudent from '../components/AddStudent';

const Students = () => {
  const API_BASE_URL = 'https://student-management-backend-7xw2.onrender.com';
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    age: '',
    grade: ''
  });

  // Fetch all students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/students`);
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        setStudents(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  // Add new student
  const onAddStudent = async (student) => {
    try {
      const response = await fetch(`${API_BASE_URL}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student),
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const newStudent = await response.json();
      setStudents([...students, newStudent]);
    } catch (err) {
      setError(err.message);
      console.error('POST error:', err);
    }
  };

  // Delete student
  const onDeleteStudent = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/students/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      setStudents(students.filter(student => student._id !== id));
    } catch (err) {
      setError(err.message);
      console.error('DELETE error:', err);
    }
  };

  // Start editing a student
  const startEditing = (student) => {
    setEditingId(student._id);
    setEditFormData({
      name: student.name,
      email: student.email,
      age: student.age,
      grade: student.grade
    });
  };

  // Handle edit form changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  // Submit edited student
  const submitEdit = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/students/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editFormData),
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const updatedStudent = await response.json();
      setStudents(students.map(student => 
        student._id === editingId ? updatedStudent : student
      ));
      setEditingId(null);
    } catch (err) {
      setError(err.message);
      console.error('PUT error:', err);
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
  };

  if (loading) return <div>Loading students...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
  <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
    <h2 style={{ marginBottom: '20px' }}>Students</h2>
    <AddStudent onAddStudent={onAddStudent} />

    <ul style={{ listStyle: 'none', padding: 0 }}>
      {students.map(student => (
        <li
          key={student._id}
          style={{
            background: '#f9f9f9',
            marginBottom: '15px',
            padding: '15px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
        >
          {editingId === student._id ? (
            <div>
              <input
                type="text"
                name="name"
                value={editFormData.name}
                onChange={handleEditChange}
                style={{ marginRight: '8px', padding: '5px' }}
              />
              <input
                type="email"
                name="email"
                value={editFormData.email}
                onChange={handleEditChange}
                style={{ marginRight: '8px', padding: '5px' }}
              />
              <input
                type="number"
                name="age"
                value={editFormData.age}
                onChange={handleEditChange}
                style={{ marginRight: '8px', padding: '5px' }}
              />
              <input
                type="text"
                name="grade"
                value={editFormData.grade}
                onChange={handleEditChange}
                style={{ marginRight: '8px', padding: '5px' }}
              />
              <button
                onClick={submitEdit}
                style={{
                  marginRight: '6px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  padding: '6px 12px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Save
              </button>
              <button
                onClick={cancelEdit}
                style={{
                  backgroundColor: '#9e9e9e',
                  color: 'white',
                  padding: '6px 12px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <span style={{ marginRight: '10px' }}>
                {student.name} - {student.email} (Age: {student.age}, Grade: {student.grade})
              </span>
              <button
                onClick={() => startEditing(student)}
                style={{
                  marginRight: '6px',
                  backgroundColor: '#1976d2',
                  color: 'white',
                  padding: '6px 12px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Edit
              </button>
              <button
                onClick={() => onDeleteStudent(student._id)}
                style={{
                  backgroundColor: '#e53935',
                  color: 'white',
                  padding: '6px 12px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  </div>
);
};

export default Students;
