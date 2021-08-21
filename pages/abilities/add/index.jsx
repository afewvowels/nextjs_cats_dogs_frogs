import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const Add = () => {
  const [name, set_name] = useState()
  const [description, set_description] = useState()
  const [attack, set_attack] = useState()
  const [defense, set_defense] = useState()
  const [casters, set_casters] = useState()
  const [error_msg, set_error_msg] = useState()

  const handleCreate = async () => {
    let newUuid = uuidv4()

    const ability = {
      uuid: newUuid,
      name: name,
      description: description,
      attack: attack,
      defense: defense,
      casters: casters
    }

    const abilityRes = await fetch('/api/abilities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ability)
    })

    if(abilityRes.status == 201) {
      console.log('created ability successfully')
    } else {
      console.error('error creating ability')
      set_error_msg(await abilityRes.text())
    }
  }

  return(<>
    <h2>Abilities Add</h2>
    <section>
      {error_msg ? <p style={{color: 'red'}}>{error_msg}</p> : null}
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={e => set_name(e.target.value)}/>
      </div>
      <div>
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={e => set_description(e.target.value)}/>
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
        <label>Casters</label>
        <input
          type="number"
          value={casters}
          onChange={e => set_casters(e.target.value)}/>
      </div>
      <button onClick={handleCreate}>Create</button>
    </section>
  </>)
}

export default Add