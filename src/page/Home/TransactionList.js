import './Home.css'
import { useFirestore } from '../../hooks/useFirestore'

export default function TransactionList({documents}) {
    const {deleteDocument} = useFirestore('transactions')
    return (
        <div className="transactions">
            {documents.map((transaction) => (
                <li key={transaction.id}>
                    <p className="name">{transaction.name}</p>
                    <p className="amount">₹ {transaction.amount}</p>
                    <button onClick={() => deleteDocument(transaction.id)}>x</button>
                </li>
            ))}
        </div>
    )
}
