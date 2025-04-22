import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/students">Students</Link>
    </div>
  );
};

export default Navbar;