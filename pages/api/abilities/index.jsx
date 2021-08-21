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

export default handler