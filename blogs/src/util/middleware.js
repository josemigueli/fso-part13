const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
const { Blog, User, Session } = require('../models')

const deleteSession = async (token) => {
  const session = await Session.findOne({ where: { token: token } })
  if (session) {
    await session.destroy()
  }
}

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
  const session = await Session.findOne({ where: { token: req.token } })

  if (!session) {
    const error = new Error()
    error.name = 'JsonWebTokenError'
    error.statusCode = 401
    throw error
  }

  const decodedToken = jwt.verify(req.token, SECRET)
  req.user = await User.findByPk(decodedToken.id)
  next()
}

const unknownEndPoint = (_req, res) => {
  res.status(404).send({
    error: 'Unknown endpoint',
  })
}

const errorHandler = (error, req, res, next) => {
  console.log('Error message:', error.message)
  console.log('Error name:', error.name)

  if (
    error.message === 'Validation error: Username must be a valid email address'
  ) {
    return res
      .status(400)
      .json({ error: 'Username must be a valid email address' })
  }

  if (
    error.message ===
    'Validation error: The year cannot be greater than the current year (2025)'
  ) {
    return res.status(400).json({
      error: 'The year cannot be greater than the current year (2025)',
    })
  }

  if (error.message === 'data and salt arguments required') {
    return res.status(400).json({ error: 'Password is required' })
  }

  if (
    error.message === 'WHERE parameter "token" has invalid "undefined" value'
  ) {
    return res.status(401).json({ error: 'Token is required' })
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
    deleteSession(req.token)
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
