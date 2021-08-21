import db from '@db/firebase'
import nc from 'next-connect'

const handler = nc()

handler.get(async (req, res) => {
  await db
    .collection('decks')
    .orderBy('name')
    .get()
    .then(decks => {
      let decksArr = []
      decks.forEach(deck => {
        decksArr.push(deck.data())
      })
      res.status(201).json(decksArr)
    })
    .catch(err => res.status(401).send(`error retrieving decks ${err.message}`))
})

export default handler