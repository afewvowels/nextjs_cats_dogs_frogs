const Add = ({abilities}) => {
  return(<>
    {abilities.map((ability, key) => {
      return(<p key={key}>{ability.name}</p>)
    })}
  </>)
}

export async function getServerSideProps() {
  let res = await fetch(process.env.NEXT_PUBLIC_URL + 'api/abilities')
  let abilities = await res.json()

  return { props: { abilities } }
}

export default Add