import { useState } from 'react'
import styles from './Signup.module.css'
import { useSignUp } from '../../hooks/useSignUp'

export default function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const {signup, isPending, error} = useSignUp()

    const handleSubmit = (e) => {
        e.preventDefault()
        signup(email,password,displayName)
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className={styles['signup-form']}>
                <h2>Sign-Up</h2>
                <label>
                    <span>Name:</span>
                    <input 
                    type="text" 
                    onChange={(e) => setDisplayName(e.target.value)} 
                    value={displayName}
                    />
                </label>
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
                {!isPending && <button className="btn">SignUp</button>}
                {isPending && <button className='btn' disabled><em>Loading....</em></button>}
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}
