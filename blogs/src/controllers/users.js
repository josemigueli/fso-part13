const router = require('express').Router()
const bcrypt = require('bcrypt')
const { User, Blog, ReadingList, ReadingListItem } = require('../models')
const { Op } = require('sequelize')

router.get('/', async (_req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] },
    },
  })
  res.json(users)
})

router.get('/:id', async (req, res) => {
  const where = {}

  if (req.query.read) {
    where[Op.or] = [{ read: req.query.read }]
  }

  const user = await User.findByPk(req.params.id, {
    attributes: ['name', 'username'],
    include: [
      {
        model: ReadingList,
        as: 'readingLists',
        attributes: { exclude: ['id', 'userId'] },
        through: {
          attributes: [],
          where: {},
        },
        include: {
          model: ReadingListItem,
          as: 'blogs',
          attributes: { exclude: ['id', 'userId', 'blogId'] },
          where,
          include: {
            model: Blog,
            attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
          },
        },
      },
    ],
  })

  if (!user) {
    return res.status(404).end()
  }

  res.json(user)
})

router.post('/', async (req, res) => {
  const { username, name, password } = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = await User.create({ username, name, passwordHash })

  res.json(user)
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } })

  if (user) {
    user.update(req.body)
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router
