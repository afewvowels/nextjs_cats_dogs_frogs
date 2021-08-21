import { useState } from 'react'
import Image from 'next/image'
import useSWR from 'swr'

import styles from '@styles/components.module.css'

const fetcher = (...args) => fetch(...args).then(res => res.json())

function useAbility(uuid) {
  const { data, error } = useSWR(`/api/abilities/${uuid}`, fetcher)
  return { ability: data, isLoading: !error && !data, isError: error }
}

function Ability({uuid}) {
  const { ability, isLoading, isError } = useAbility(uuid)

  if (isLoading) return(<><h3>Loading ability</h3></>)
  if (isError) return(<><h3>Error fetching ability</h3></>)
  return(<>
    <div>
      <p>{ability.name}</p>
    </div>
  </>)
}

const Card = ({card}) => {
  return(<>
    <section className={styles.cardBorderWrapper}>
      <div className={styles.cardWrapper}>
        <div className={styles.cardImageWrapper}>
          <Image className={styles.cardImage} src={card.image} alt='card image art' width={200} height={150} layout='responsive' />
        </div>
        <div>
          <p>{card.type}</p>
        </div>
        <div>
          <p>{card.name}</p>
        </div>
        <div>
          <p>{card.flavor}</p>
        </div>
        <div>
          <p>{card.attack} / {card.defense}</p>
        </div>
        {card.abilities.map((uuid, key) => (<Ability key={key} uuid={uuid}/>))}
      </div>
    </section>
  </>)
}

export default Card