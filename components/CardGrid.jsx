import Link from 'next/link'
import styles from './CardGrid.module.css'

function Card({ title, href, children }) {
  return (
    <Link href={href} className={styles.card}>
      <span className={styles.description}>{children}</span>
      <span className={styles.title}>{title}</span>
    </Link>
  )
}

export default function CardGrid({ children }) {
  return <div className={styles.grid}>{children}</div>
}

CardGrid.Card = Card
