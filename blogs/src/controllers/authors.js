const router = require('express').Router()
const Blog = require('../models/blog')
const { Sequelize } = require('sequelize')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: [
      'author',
      [Sequelize.fn('COUNT', Sequelize.col('author')), 'articles'],
      [Sequelize.fn('SUM', Sequelize.col('likes')), 'likes'],
    ],
    group: ['author'],
    order: [['likes', 'DESC']],
  })

  res.json(blogs)
})

module.exports = router
