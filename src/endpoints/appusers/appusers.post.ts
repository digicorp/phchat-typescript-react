import { Request, Response } from 'express'
import { AppUserDao, EventDao } from '../../dao/_index'

export function create(req: Request, res: Response) {
  return AppUserDao.create(req.body)
    .then((appuser) => res.status(201).send(appuser))
    .catch((error) => res.boom.badRequest(error))
}

export function searchUser(req: Request, res: Response) {
  return AppUserDao.searchUser(req.body)
    .then((appuser) => res.status(201).send(appuser))
    .catch((error) => res.boom.badRequest(error))
}

export function event(req: Request, res: Response) {
  return EventDao.create(req.body)
    .then((appuser) => res.status(201).send(appuser))
    .catch((error) => res.boom.badRequest(error))
}

export function listEvent(req: Request, res: Response) {
  return EventDao.findAll(req.body)
    .then((appuser) => res.status(201).send(appuser))
    .catch((error) => res.boom.badRequest(error))
}

export function login(req: Request, res: Response) {
  return AppUserDao.login(req.body)
    .then((appuser) => res.status(200).send(appuser))
    .catch((error) => res.boom.badRequest(error))
}
