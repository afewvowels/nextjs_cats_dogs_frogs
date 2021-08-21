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

export default handler