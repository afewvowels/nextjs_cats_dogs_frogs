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
          <Image className={styles.cardImage} src={card.image} alt='card image art' width={300} height={150} layout='responsive' />
        </div>
        <div className={styles.cardInfoWrapper}>
          <p>{card.name}</p>
          {card.abilities.map((uuid, key) => (<Ability key={key} uuid={uuid}/>))}
          <p>{card.flavor}</p>
        </div>
        <div className={styles.cardAttack}>
          <p>{card.attack}</p>
        </div>
        <div className={styles.cardType}>
          <p>{card.type}</p>
        </div>
        <div className={styles.cardDefense}>
          <p>{card.defense}</p>
        </div>
      </div>
    </section>
  </>)
}

export default Card