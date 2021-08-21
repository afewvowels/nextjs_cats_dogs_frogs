import db from '@db/firebase'
import nc from 'next-connect'

const handler = nc()

handler.get(async (req, res) => {
  await db
    .collection('cats')
    .orderBy('name')
    .get()
    .then((cats) => {
      let catsArr = []
      cats.forEach(cat => {
        catsArr.push(cat.data())
      })
      res.status(201).json(catsArr)
    })
    .catch(err => res.status(401).send(`error getting cats cards ${err.message}`))
})

handler.post(async (req, res) => {
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
    .doc(cat.uuid)
    .set(cat)
    .then(() => res.status(201).send('successfully created new cat card with uuid ' +  req.body.uuid)
    .catch(err => res.status(401).send(`error creating new cat card ${err.message}`)))
})

export default handler