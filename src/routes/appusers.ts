import { Express } from 'express'
import { AppUserController } from '../endpoints/_index'

export function routes(app: Express) {
  app.get('/api/appUsers', AppUserController.AppUserGet.list)
  app.post('/api/appUsers', AppUserController.AppUserPost.create)
  app.post('/api/searchUser', AppUserController.AppUserPost.searchUser)
  app.post('/api/appUsers/chats', AppUserController.AppUserPost.event)
  app.post('/api/appUsers/getChats', AppUserController.AppUserPost.listEvent)
  app.post('/api/appUsers/login', AppUserController.AppUserPost.login)
  app.post('/api/upload', AppUserController.AppUserPost.upload)
}
