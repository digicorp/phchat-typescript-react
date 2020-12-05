import * as uuid from 'uuid'
import { AppUser } from './../sqlz/models/appuser'
import { Event } from '../sqlz/models/event'

export function create(chats: any): Promise<any> {
  return AppUser.findOne({
    where: { email: chats.email }
  }).then((appuser) => {
    return Event.create({
      id: chats.id,
      logs: chats.logs,
      userId: appuser.get('id')
    })
  })
}

export function findAll(appUser: any): Promise<any> {
  // return Event.findAll({ include: [{ all: true }] })
  return Event.findAll({
    where: {
      id: appUser.id
    },
    include: [AppUser]
  })
}
