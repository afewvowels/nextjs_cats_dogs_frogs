import Link from 'next/link'
import styles from '@styles/components.module.css'

const Header = () => {
  return(<>
    <header className={styles.navWrapper}>
      <h1>Cats, Dogs &amp; Frogs</h1>
      <nav>
        <ul>
          <Link href='/cards/cats' passHref><li>Cats</li></Link>
          <Link href='/cards/dogs' passHref><li>Dogs</li></Link>
          <Link href='/cards/frogs' passHref><li>Frogs</li></Link>
          <Link href='/decks' passHref><li>Decks</li></Link>
          <Link href='/abilities' passHref><li>Abilities</li></Link>
        </ul>
      </nav>
    </header>
  </>)
}

export default Header