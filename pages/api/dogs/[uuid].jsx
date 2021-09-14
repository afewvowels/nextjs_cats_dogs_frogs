import db from '@db/firebase'
import nc from 'next-connect'

const handler = nc()

handler.get(async (req, res) => {
  const {
    query: { uuid }
  } = req

  await db
    .collection('dogs')
    .where('uuid', '==', uuid)
    .get()
    .then(dogs => {
      let dogsArr = []
      dogs.forEach(dog => {
        dogsArr.push(dog.data())
      })
      res.status(201).json(dogsArr[0])
    })
    .catch(err => {
      res.status(401).send(`error getting dog with ${uuid} ${err.message}`)
    })
})

handler.post(async (req, res) => {
  const {
    query: { uuid }
  } = req

  const dog = {
    uuid: req.body.uuid,
    name: req.body.name,
    description: req.body.description,
    attack: req.body.attack,
    defense: req.body.defense,
    casters: req.body.casters
  }

  await db
    .collection('dogs')
    .doc(uuid)
    .update(dog)
    .then(() => res.status(201).send(`successfully updated dog with uuid ${uuid}`))
    .catch((err) => res.status(500).send(`error getting dog with uuid ${uuid} ${err.message}`))
})

handler.delete(async (req, res) => {
  const {
    query: { uuid }
  } = req

  await db
    .collection('dogs')
    .doc(uuid)
    .delete()
    .then(() => res.status(201).send(`successfully deleted dog with uuid ${uuid}`))
    .catch((err) => res.status(500).send(`error getting dog with uuid ${uuid} ${err.message}`))
})

export default handler