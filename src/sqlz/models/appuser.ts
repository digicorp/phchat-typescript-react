import { Model, STRING } from 'sequelize'
import sequelize from './_index'
import { Language } from './language'

export class AppUser extends Model {}

export class AppUserModel {
  id: string
  name: string
  email: string
  pwd: string
  createdAt: Date
  updatedAt: Date
}

AppUser.init(
  {
    name: STRING(50),
    email: STRING(50),
    pwd: STRING(50)
  },
  { sequelize, modelName: 'AppUser' }
)

// AppUser.belongsTo(Language, {
//   foreignKey: 'languageId'
// })
