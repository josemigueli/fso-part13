const router = require('express').Router()
const { Session } = require('../models')
const { userExtractor } = require('../util/middleware')

router.delete('/', userExtractor, async (req, res) => {
  const token = await Session.findOne({ where: { token: req.token } })

  if (token.userId !== req.user.id) {
    return res.status(401).end()
  }

  await token.destroy()
  res.status(204).end()
})

module.exports = router
