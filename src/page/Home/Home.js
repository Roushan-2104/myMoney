import { useAuthContext } from '../../hooks/useAuthContext'
import './Home.css'
import TransactionForm from './TransactionForm'
import { useCollection } from '../../hooks/useCollection'
import TransactionList from './TransactionList'

export default function Home() {
    const { user } = useAuthContext()

    const {documents,error,isPending} = useCollection(
        'transactions',
        ['uid','==',user.uid],
        ['createdAt','desc']
        )
    
    return (
        <div className="container">
            <div className="sidebar d-md-block d-lg-none">
                <TransactionForm uid={user.uid}/>
            </div>
            <div className="content">
                {error && <p>{error}</p>}
                {isPending && <p className='fs-3 text-center text-dark'><em>Loading....</em></p>}
                {documents && <TransactionList documents={documents}/>}
                
            </div>
            <div className="sidebar d-lg-block d-none">
                <TransactionForm uid={user.uid}/>
            </div>
        </div>
    )
}
