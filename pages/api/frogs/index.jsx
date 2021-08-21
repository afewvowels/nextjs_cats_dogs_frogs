import db from '@db/firebase'
import nc from 'next-connect'

const handler = nc()

handler.get(async (req, res) => {
  await db
    .collection('frogs')
    .orderBy('name')
    .get()
    .then(frogs => {
      let frogsArr = []
      frogs.forEach(frog => {
        frogsArr.push(frog.data())
      })
      res.status(201).json(frogsArr)
    })
    .catch(err => res.status(401).send(`error getting frogs cards ${err.message}`))
})

export default handler