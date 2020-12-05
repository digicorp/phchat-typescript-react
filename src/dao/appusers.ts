import * as uuid from 'uuid'
import { AppUser } from './../sqlz/models/appuser'
import { Language } from '../sqlz/models/language'

export function create(appUser: any): Promise<any> {
  return AppUser.create({
    id: uuid.v1(),
    name: appUser.name,
    email: appUser.email,
    pwd: appUser.pwd
  })
}

export function findAll(): Promise<any> {
  return AppUser.findAll({ include: [{ all: true }] })
}

export function searchUser(appUser: any): Promise<any> {
  return AppUser.findAll({
    where: {
      name: appUser.name
    }
  })
}

export function login(appUser: any): Promise<any> {
  return AppUser.findOne({
    where: {
      email: appUser.email,
      pwd: appUser.pwd
    }
  })
}

// export function login(appUser: any): Promise<any> {
//   return AppUser.findOne({
//     where: {
//       email: appUser.email,
//       pwd: appUser.pwd
//     },
//     include: [Language]
//   })
// }
