import Card from '@components/Card'

import styles from '@styles/components.module.css'

const Index = ({frogs}) => {
  return(<>
    <h1>Cards index page</h1>
    <section className={styles.cardsGridWrapper}>
      {frogs.map((frog, index) => <Card key={index} card={frog} />)}
    </section>
  </>)
}

export async function getServerSideProps() {
  let res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/frogs`)
  let frogs = await res.json()

  return { props: { frogs } }
}

export default Index