import db from '@db/firebase'
import nc from 'next-connect'

const handler = nc()

handler.get(async (req, res) => {
  const {
    query: { uuid }
  } = req

  await db
    .collection('frogs')
    .where('uuid', '==', uuid)
    .get()
    .then(frogs => {
      let frogData
      frogs.forEach(frog => {
        frogData = frog.data()
      })
      res.status(201).json(frogData)
    })
    .catch(err => {
      res.status(401).send(`error getting frog with ${uuid} ${err.message}`)
    })
})

handler.post(async (req, res) => {
  const {
    query: { uuid }
  } = req

  const frog = {
    uuid: req.body.uuid,
    name: req.body.name,
    description: req.body.description,
    attack: req.body.attack,
    defense: req.body.defense,
    casters: req.body.casters
  }

  await db
    .collection('frogs')
    .doc(uuid)
    .update(frog)
    .then(() => res.status(201).send(`successfully updated frog with uuid ${uuid}`))
    .catch((err) => res.status(500).send(`error getting frog with uuid ${uuid} ${err.message}`))
})

handler.delete(async (req, res) => {
  const {
    query: { uuid }
  } = req

  await db
    .collection('frogs')
    .doc(uuid)
    .delete()
    .then(() => res.status(201).send(`successfully deleted frog with uuid ${uuid}`))
    .catch((err) => res.status(500).send(`error getting frog with uuid ${uuid} ${err.message}`))
})

export default handler