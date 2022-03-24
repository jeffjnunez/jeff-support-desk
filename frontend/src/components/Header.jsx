import { Link } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';

const Header = () => {
    return (
        <header className='header'>
            <div className='logo'>
                <Link to='/'>Support Desk</Link>
            </div>
            <ul>
                <li>
                    <Link to='/login'>
                        <FaSignInAlt /> Log In
                    </Link>
                </li>
                <li>
                    <Link to='/register'>
                        <FaSignOutAlt /> Register
                    </Link>
                </li>
            </ul>
        </header>
    );
};

export default Header;