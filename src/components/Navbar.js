import styles from './Navbar.module.css'
import {Link} from 'react-router-dom'
import {useLogOut} from '../hooks/useLogOut'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Navbar() {
    const {logout} = useLogOut()
    const {user} = useAuthContext()

    return (
        <div>
            <nav className={styles.navbar}>
                <ul>
                    <li className={styles.title}><Link to="/">myMoney</Link></li>
                    {!user && (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </>
                    )}
                    {user && (
                        <>
                            <li>Hello, {user.displayName}</li>
                            <li><button className='btn' onClick={logout}>Log Out</button></li>
                        </>
                    )}
                    
                </ul>
            </nav>
        </div>
    )
}
