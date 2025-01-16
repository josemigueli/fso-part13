const User = require('./user')
const Blog = require('./blog')
const ReadingList = require('./reading_list')
const ReadingListItem = require('./reading_list_item')
const Session = require('./session')

User.hasMany(Blog)
Blog.belongsTo(User)

ReadingList.hasMany(ReadingListItem, { as: 'blogs' })
ReadingListItem.belongsTo(ReadingList)
ReadingListItem.belongsTo(Blog)

User.belongsToMany(ReadingList, {
  through: ReadingListItem,
  as: 'readingLists',
})

module.exports = {
  User,
  Blog,
  ReadingList,
  ReadingListItem,
  Session
}
