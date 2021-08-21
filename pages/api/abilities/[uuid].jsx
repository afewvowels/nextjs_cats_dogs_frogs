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
      let abilitiesArr = []
      abilities.forEach(ability => {
        abilitiesArr.push(ability.data())
      })
      res.status(201).json(abilitiesArr[0])
    })
    .catch(err => {
      res.status(401).send(`error getting ability with ${uuid} ${err.message}`)
    })
})

export default handler