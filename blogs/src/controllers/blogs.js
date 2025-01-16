const router = require('express').Router()
const { Blog, User } = require('../models')
const { blogFinder, userExtractor } = require('../util/middleware')
const { Op } = require('sequelize')

router.get('/', async (req, res) => {
  const where = {}

  if (req.query.search) {
    where[Op.or] = [
      { title: { [Op.substring]: req.query.search } },
      { author: { [Op.substring]: req.query.search } },
    ]
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name'],
    },
    where,
    order: [['likes', 'DESC']],
  })
  res.json(blogs)
})

router.post('/', userExtractor, async (req, res) => {
  const blog = await Blog.create({ ...req.body, userId: req.user.id })
  res.json(blog)
})

router.put('/:id', blogFinder, async (req, res) => {
  if (!req.body.likes) {
    return res.status(400).json({ error: 'Likes is required' })
  }

  const blog = req.blog
  if (blog) {
    blog.likes = req.body.likes
    await blog.save()
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', userExtractor, blogFinder, async (req, res) => {
  const userId = req.user.id
  const blog = req.blog

  if (!blog) {
    return res.status(404).end()
  }

  if (userId !== blog.userId) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  await blog.destroy()
  res.status(204).end()
})

module.exports = router
