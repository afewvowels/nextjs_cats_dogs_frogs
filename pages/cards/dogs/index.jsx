import Card from '@components/Card'

import styles from '@styles/components.module.css'

const Index = ({dogs}) => {
  return(<>
    <h1>Dog Cards</h1>
    <section className={styles.cardsGridWrapper}>
      {dogs.map((dog, index) => <Card key={index} card={dog} />)}
    </section>
  </>)
}

export async function getServerSideProps() {
  let res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/dogs`)
  let dogs = await res.json()

  return { props: { dogs } }
}

export default Index