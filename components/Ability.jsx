import { useState } from 'react'
import Image from 'next/image'
import useSWR from 'swr'

import styles from '@styles/components.module.css'

const Ability = ({ability}) => {
  return(<>
    <section>
      <div>
        <div>
          <p>{ability.name}</p>
        </div>
        <div>
          <p>{ability.description}</p>
        </div>
        <div>
          <p>{ability.attack}</p>
        </div>
        <div>
          <p>{ability.defense}</p>
        </div>
        <div>
          <p>{ability.casters}</p>
        </div>
      </div>
    </section>
  </>)
}

export default Ability