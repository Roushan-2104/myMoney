import styles from './Home.module.css'
import { useFirestore } from '../../hooks/useFirestore'

export default function TransactionList({documents}) {
    const {deleteDocument} = useFirestore('transactions')
    return (
        <div className={styles.transactions}>
            {documents.map((transaction) => (
                <li key={transaction.id}>
                    <p className={styles.name}>{transaction.name}</p>
                    <p className={styles.amount}>₹ {transaction.amount}</p>
                    <button onClick={() => deleteDocument(transaction.id)}>x</button>
                </li>
            ))}
        </div>
    )
}
