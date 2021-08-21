import Router from 'next/router'

import { useState, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'

const Add = ({abilities}) => {
  const [catdogfrog, set_catdogfrog] = useState()
  const [name, set_name] = useState()
  const [flavor, set_flavor] = useState()
  const [attack, set_attack] = useState()
  const [defense, set_defense] = useState()
  const [image, set_image] = useState()
  const [type, set_type] = useState()
  const [card_abilities, set_card_abilities] = useState([])
  const [new_ability_uuid, set_new_ability_uuid] = useState()
  const [error_msg, set_error_msg] = useState()

  const abilitiesRef = useCallback((node) => {
    if (node != null && card_abilities.length > 0) {
      node.innerHTML = ''
      card_abilities.forEach(ability => {
        abilities.forEach(ability_ => {
          if (ability === ability_.uuid) {
            node.insertAdjacentHTML('beforeend', `<li>${ability_.name}</li>`)
          }
        })
      })
    }
  })

  const addAbilitySelectRef = useCallback((node) => {
    if (node != null && abilities != null) {
      node.innerHTML = ''
      node.insertAdjacentHTML('beforeend', '<option value="-1">Select an ability to add</option>')
      abilities.forEach(ability => {
        node.insertAdjacentHTML('beforeend', `<option value="${ability.uuid}">${ability.name}</option>`)
      })
    }
  })

  const addNewAbility = () => {
    set_card_abilities(card_abilities => [...card_abilities, new_ability_uuid])
    set_new_ability_uuid('')
  }

  const handleCreate = async () => {
    let newUuid = uuidv4()

    let card = {
      uuid: newUuid,
      name: name,
      flavor: flavor,
      attack: attack,
      defense: defense,
      image: image,
      type: type,
      abilities: card_abilities
    }

    let apiUrl

    if (catdogfrog == 'cat') {
      apiUrl = `/api/cats`
    } else if (catdogfrog == 'dog') {
      apiUrl = `/api/dogs`
    } else if (catdogfrog == 'frog') {
      apiUrl = `/api/frogs`
    } else {
      set_error_msg('Invalid cat/dog/frog card type selected')
      return
    }

    const cardRes = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(card)
    })

    if (cardRes.status == 201) {
      console.log('Card created successfully')
      Router.replace('/cards')
    } else {
      console.error('Error creating card')
      set_error_msg(await cardRes.text())
    }
  }

  return(<>
    <h2>Create New Card</h2>
    <section>
      {error_msg ? <p style={{color: 'red'}}>{error_msg}</p> : null}
      <div>
        <label>Cat, Dog or Frog</label>
        <select value={catdogfrog} onChange={(e) => set_catdogfrog(e.target.value)}>
          <option value="-1">Select a card type</option>
          <option value="cat">Cat</option>
          <option value="dog">Dog</option>
          <option value="frog">Frog</option>
        </select>
      </div>
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={e => set_name(e.target.value)}/>
      </div>
      <div>
        <label>Flavor</label>
        <input
          type="text"
          value={flavor}
          onChange={e => set_flavor(e.target.value)}/>
      </div>
      <div>
        <label>Attack</label>
        <input
          type="number"
          value={attack}
          onChange={e => set_attack(e.target.value)}/>
      </div>
      <div>
        <label>Defense</label>
        <input
          type="number"
          value={defense}
          onChange={e => set_defense(e.target.value)}/>
      </div>
      <div>
        <label>Image</label>
        <input
          type="text"
          value={image}
          onChange={e => set_image(e.target.value)}/>
      </div>
      <div>
        <label>Abilities</label>
        <ul ref={abilitiesRef}></ul>
        <select
          ref={addAbilitySelectRef}
          value={new_ability_uuid}
          onChange={e => set_new_ability_uuid(e.target.value)}/>
        <button onClick={addNewAbility}>Add Ability</button>
      </div>
      <div>
        <label>Type</label>
        <select
          value={type}
          onChange={e => set_type(e.target.value)}>
          <option value="-1">Select a type</option>
          <option value="Creature">Creature</option>
          <option value="Artifact">Artifact</option>
        </select>
      </div>
      <div>
        <button onClick={handleCreate}>Create Card</button>
      </div>
    </section>
  </>)
}

export async function getServerSideProps() {
  let res = await fetch(process.env.NEXT_PUBLIC_URL + 'api/abilities')
  let abilities = await res.json()

  return { props: { abilities } }
}

export default Add