import {Link} from 'react-router-dom'
import './Navbar.css'
import {useLogOut} from '../hooks/useLogOut'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Navbar() {
    const {logout} = useLogOut()
    const {user} = useAuthContext()

    return (
            <nav className="navbar navbar-expand-lg navbar-light" style={{background:'#effaf0'}}>
                <div className="container-fluid">
                    <Link className="navbar-brand fw-bold mx-4" to="/">myMoney</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-center list">
                            {!user && (
                                <div className='loginout d-lg-flex'>
                                    <li className="nav-item">
                                        <p>
                                            <Link className="nav-link" to="/login">&nbsp;Login</Link>
                                        </p>
                                    </li>
                                    <li className="nav-item">
                                        <p>
                                            <Link className="nav-link" to="/signup">&nbsp; SignUp</Link>
                                        </p>
                                    </li>
                                </div>
                            )}
                            {user && (
                                <>
                                    <li className="nav-item">
                                        <p className="nav-link active fs-5" aria-current="page">Hello, {user.displayName}</p>
                                    </li>
                                    <li className="nav-item mx-auto">
                                        <button className='nav-link btn px-3 btn-outline-success text-dark mx-3' onClick={logout}>Log Out</button>
                                    </li>

                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
    )
}