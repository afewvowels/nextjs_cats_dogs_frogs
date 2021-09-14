import db from '@db/firebase'
import nc from 'next-connect'

const handler = nc()

handler.get(async (req, res) => {
  const {
    query: { uuid }
  } = req

  await db
    .collection('abilities')
    .where('uuid', '==', uuid)
    .get()
    .then(abilities => {
      let abilitiesData
      abilities.forEach(ability => {
        abilitiesData = ability.data()
      })
      res.status(201).json(abilitiesData)
    })
    .catch(err => {
      res.status(401).send(`error getting ability with ${uuid} ${err.message}`)
    })
})

handler.post(async (req, res) => {
  const {
    query: { uuid }
  } = req

  const ability = {
    uuid: req.body.uuid,
    name: req.body.name,
    description: req.body.description,
    attack: req.body.attack,
    defense: req.body.defense,
    casters: req.body.casters
  }

  await db
    .collection('abilities')
    .doc(uuid)
    .update(ability)
    .then(() => res.status(201).send(`successfully updated ability with uuid ${uuid}`))
    .catch((err) => res.status(500).send(`error getting ability with uuid ${uuid} ${err.message}`))
})

handler.delete(async (req, res) => {
  const {
    query: { uuid }
  } = req

  await db
    .collection('abilities')
    .doc(uuid)
    .delete()
    .then(() => res.status(201).send(`successfully deleted ability with uuid ${uuid}`))
    .catch((err) => res.status(500).send(`error getting ability with uuid ${uuid} ${err.message}`))
})

export default handler