import * as uuid from 'uuid'
import { AppUser } from './../sqlz/models/appuser'
import { Event } from '../sqlz/models/event'

export function create(appuser: any): Promise<any> {
  return Event.create({
    id: appuser.id,
    message: appuser.message,
    receiver: appuser.receiver
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
