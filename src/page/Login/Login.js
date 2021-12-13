import { useState } from 'react'
import styles from './Login.module.css'
import { useLogin } from '../../hooks/useLogin'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {isPending, login,error} = useLogin()

    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password)
    }

    return (
        <>
            <form onSubmit={handleSubmit} className={styles['login-form']}>
                <h2>Login</h2>
                <label>
                    <span>E-mail:</span>
                    <input 
                    type="email" 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email}
                    required
                    />
                </label>
                <label>
                    <span>Password:</span>
                    <input 
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password} 
                    required
                    />
                </label>
                {!isPending && <button className="btn">Login</button>}
                {isPending && <button className='btn' disabled><em>Loading...</em></button>}
                {error && <p>{error}</p>}
            </form>
        </>
    )
}
