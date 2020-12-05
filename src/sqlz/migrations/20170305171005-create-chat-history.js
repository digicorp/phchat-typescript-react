module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('chatHistories', {
      id: {
        allowNull: false,
        type: Sequelize.UUID
      },
      logs: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'AppUsers',
          key: 'id',
          as: 'userId'
        }
      }
    }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('chatHistories')
}
