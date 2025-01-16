const router = require('express').Router()
const { userExtractor } = require('../util/middleware')
const { ReadingList, ReadingListItem } = require('../models')

router.get('/', async (_req, res) => {
  const lists = await ReadingList.findAll({
    attributes: { exclude: ['id'] },
    include: {
      model: ReadingListItem,
      as: 'blogs',
      attributes: ['blogId'],
    },
    order: [['id', 'ASC']],
  })
  res.json(lists)
})

router.put('/:id', userExtractor, async (req, res) => {
  const userId = req.user.id
  const blogId = req.params.id
  const read = req.body.read

  const item = await ReadingListItem.findOne({
    where: { userId: userId, blogId: blogId },
  })

  if (!item) {
    return res.status(404).end()
  }

  item.read = read
  await item.save()
  res.json(item)
})

module.exports = router
