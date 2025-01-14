const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class ReadingListItem extends Model {}

ReadingListItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    readingListId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'reading_lists', key: 'id' },
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'blogs', key: 'id' },
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'reading_list_item',
  }
)

module.exports = ReadingListItem
