import Card from '@components/Card'

import styles from '@styles/components.module.css'

const Index = ({cats}) => {
  return(<>
    <h1>Cat Cards</h1>
    <section className={styles.cardsGridWrapper}>
      {cats.map((cat, index) => <Card key={index} card={cat} />)}
    </section>
  </>)
}

export async function getServerSideProps() {
  let res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/cats`)
  let cats = await res.json()

  return { props: { cats } }
}

export default Index