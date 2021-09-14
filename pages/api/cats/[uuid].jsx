import db from '@db/firebase'
import nc from 'next-connect'

const handler = nc()

handler.get(async (req, res) => {
  const {
    query: { uuid }
  } = req

  await db
    .collection('cats')
    .where('uuid', '==', uuid)
    .get()
    .then((cats) => {
      let catData
      cats.forEach(cat => {
        catData = cat.data()
      })
      res.status(201).json(catData)
    })
    .catch((err) => res.status(500).send(`error getting cat with uuid ${uuid} ${err.message}`))
})

handler.post(async (req, res) => {
  const {
    query: { uuid }
  } = req

  const cat = {
    uuid: req.body.uuid,
    name: req.body.name,
    flavor: req.body.flavor,
    attack: req.body.attack,
    defense: req.body.defense,
    image: req.body.image,
    abilities: req.body.abilities,
    type: req.body.type
  }

  await db
    .collection('cats')
    .doc(uuid)
    .update(cat)
    .then(() => res.status(201).send(`successfully updated cat with uuid ${uuid}`))
    .catch((err) => res.status(500).send(`error getting cat with uuid ${uuid} ${err.message}`))
})

handler.delete(async (req, res) => {
  const {
    query: { uuid }
  } = req

  await db
    .collection('cats')
    .doc(uuid)
    .delete()
    .then(() => res.status(201).send(`successfully deleted cat with uuid ${uuid}`))
    .catch((err) => res.status(500).send(`error getting cat with uuid ${uuid} ${err.message}`))
})

export default handler