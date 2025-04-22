import { Link } from 'react-router-dom';  // Add this import
import { toast } from 'react-toastify';

const StudentList = ({ students, onDeleteStudent, readOnly }) => {
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      onDeleteStudent(id);
      toast.success('Student deleted successfully!');
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Grade</th>
          {!readOnly && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {students.map(student => (
          <tr key={student._id}>
            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.age}</td>
            <td>{student.grade}</td>
            {!readOnly && (
              <td>
                <Link to={`/students/edit/${student._id}`}>Edit</Link>
                <button onClick={() => handleDelete(student._id)}>Delete</button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentList;