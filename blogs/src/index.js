const express = require('express')
require('express-async-errors')
const app = express()

const { connectToDatabase } = require('./util/db')
const { PORT } = require('./util/config')
const {
  tokenExtractor,
  unknownEndPoint,
  errorHandler,
} = require('./util/middleware')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const authorsRouter = require('./controllers/authors')
const readingListsRouter = require('./controllers/reading_lists')
const logoutRouter = require('./controllers/logout')

app.use(express.json())
app.use(tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorsRouter)
app.use('/api/readinglists', readingListsRouter)
app.use('/api/logout', logoutRouter)

app.use(unknownEndPoint)
app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
