import { Model, STRING } from 'sequelize'
import sequelize from './_index'
import { AppUser } from './appuser'

export class Event extends Model {}

export class EventModel {
  id: string
  logs: string
  createdAt: Date
  updatedAt: Date
}

Event.init(
  {
    logs: STRING(255)
  },
  { sequelize, modelName: 'chatHistory' }
)

Event.belongsTo(AppUser, {
  foreignKey: 'userId'
})
