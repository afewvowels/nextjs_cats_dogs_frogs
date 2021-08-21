import db from '@db/firebase'
import nc from 'next-connect'

const handler = nc()

handler.get(async (req, res) => {
  await db
    .collection('abilities')
    .orderBy('name')
    .get()
    .then(abilities => {
      let abilitiesArr = []
      abilities.forEach(ability => {
        abilitiesArr.push(ability.data())
      })
      res.status(201).json(abilitiesArr)
    })
    .catch(err => res.status(201).json(`error retrieving abilities ${err.message}`))
})

handler.post(async (req, res) => {
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
  .doc(ability.uuid)
  .set(ability)
  .then(() => res.status(201).send('successfully created new ability with uuid ' + ability.uuid))
  .catch(err => res.status(201).send('error creating ability with uuid ' + ability.uuid + ' ' + err.message))
})

export default handler