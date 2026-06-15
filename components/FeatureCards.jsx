import styles from './FeatureCards.module.css'
import Link from 'next/link'

const features = [
  {
    title: 'Saknes',
    description: 'Uzvārda izcelsme, Tālava un Hronoloģija',
    href: '/saknes',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
    )
  },
  {
    title: 'Hronoloģija',
    description: 'Laika līnija no 1826. gada',
    href: '/hronologija',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
    )
  },
  {
    title: 'Vieta',
    description: 'Tauriņupe, Kamaldas stacija, Sateka',
    href: '/vieta',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
    )
  },
  {
    title: 'Mājas',
    description: 'Kamaldiņu sēta un apkārtne',
    href: '/majas',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
    )
  },
  {
    title: 'Cilvēki',
    description: 'Dzimtas koks, profili un statistika',
    href: '/cilveki',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
    )
  },
  {
    title: 'Par Mums',
    description: 'Projekta mērķi un autori',
    href: '/par-mums',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
    )
  },
  {
    title: 'Arhīvs',
    description: 'Dokumenti, foto, atmiņas (1826–2004)',
    href: '/arhivs',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>
    )
  },
  {
    title: 'Kontakti',
    description: 'Sazinies ar mums',
    href: '/kontakti',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
    )
  }
]

export default function FeatureCards() {
  return (
    <div className={styles.grid}>
      {features.map((feature, i) => (
        <Link href={feature.href} key={i} className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.icon}>{feature.icon}</span>
            <h3 className={styles.title}>{feature.title}</h3>
          </div>
          <p className={styles.description}>{feature.description}</p>
        </Link>
      ))}
    </div>
  )
}
