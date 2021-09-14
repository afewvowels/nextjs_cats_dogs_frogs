import Ability from '@components/Ability'

const Abilities = ({abilities}) => {
  return(<>
    <h2>Abilities</h2>
    {abilities.map((ability, key) => <Ability ability={ability} key={key}/>)}
  </>)
}

export async function getServerSideProps() {
  let res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/abilities`)
  let abilities = await res.json()

  return { props: { abilities } }
}

export default Abilities