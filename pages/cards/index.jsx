import Card from '@components/Card'

import styles from '@styles/components.module.css'

const Index = ({cats, dogs, frogs}) => {
  return(<>
    <h1>Cards index page</h1>
    <section className={styles.cardsGridWrapper}>
      {cats.map((cat, index) => <Card key={index} card={cat} />)}
      {dogs.map((dog, index) => <Card key={index} card={dog} />)}
      {frogs.map((frog, index) => <Card key={index} card={frog} />)}
    </section>
  </>)
}

export async function getServerSideProps() {
  let res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/cats`)
  let cats = await res.json()

  res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/dogs`)
  let dogs = await res.json()

  res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/frogs`)
  let frogs = await res.json()

  return { props: { cats, dogs, frogs } }
}

export default Index