const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('reading_lists', 'user_id', {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'users', key: 'id' },
    })

    await queryInterface.sequelize.query(
      `UPDATE reading_lists SET user_id = 1;`
    )

    await queryInterface.changeColumn('reading_lists', 'user_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    })
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('reading_lists', 'user_id')
  },
}
