import db from '@db/firebase'
import nc from 'next-connect'

const handler = nc()

handler.get(async (req, res) => {
  await db
    .collection('dogs')
    .orderBy('name')
    .get()
    .then((dogs) => {
      let dogsArr = []
      dogs.forEach(dog => {
        dogsArr.push(dog.data())
      })
      res.status(201).json(dogsArr)
    })
    .catch(err => res.status(401).send(`error getting dogs cards ${err.message}`))
})

export default handler