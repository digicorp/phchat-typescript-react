import { Model, STRING } from 'sequelize'
import sequelize from './_index'
import { AppUser } from './appuser'

export class Event extends Model {}

export class EventModel {
  id: string
  message: string
  createdAt: Date
  updatedAt: Date
}

Event.init(
  {
    message: STRING(255)
  },
  { sequelize, modelName: 'chatHistory' }
)

Event.belongsTo(AppUser, {
  foreignKey: 'receiver'
})
