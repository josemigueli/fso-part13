const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
const { Blog, User } = require('../models')

const blogFinder = async (req, _res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

const tokenExtractor = (req, _res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '')
  }
  next()
}

const userExtractor = async (req, _res, next) => {
  const decodedToken = jwt.verify(req.token, SECRET)
  req.user = await User.findByPk(decodedToken.id)
  next()
}

const unknownEndPoint = (_req, res) => {
  res.status(404).send({
    error: 'Unknown endpoint',
  })
}

const errorHandler = (error, _req, res, next) => {
  console.log('Message', error.message)
  console.log('Name', error.name)

  if (
    error.message === 'Validation error: Username must be a valid email address'
  ) {
    return res
      .status(400)
      .json({ error: 'Username must be a valid email address' })
  }

  if (error.message === 'data and salt arguments required') {
    return res.status(400).json({ error: 'Password is required' })
  }

  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: 'Required field is missing' })
  }

  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({ error: 'Username is already taken' })
  }

  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid token' })
  }

  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Expired token' })
  }

  next(error)
}

module.exports = {
  blogFinder,
  tokenExtractor,
  userExtractor,
  unknownEndPoint,
  errorHandler,
}
