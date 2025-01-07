const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const { Blog, User } = require('../models')
const { blogFinder, userExtractor } = require('../util/middleware')

router.get('/', async (_req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name'],
    },
  })
  res.json(blogs)
})

router.post('/', userExtractor, async (req, res) => {
  jwt.verify(req.token, SECRET)

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
  jwt.verify(req.token, SECRET)

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
