import { Request, Response } from 'express'
import * as formidable from 'formidable'
import * as mv from 'mv'
import * as path from 'path'
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

export function upload(req: Request, res: Response) {
  try {
    let form = new formidable.IncomingForm()
    form.on('progress', function (bytesRecieved, bytesExpected) {
      console.log('received: ' + bytesRecieved, bytesExpected)
      console.log('perc :>> ', (bytesRecieved * 100) / bytesExpected)
    })

    form.parse(req, function (err, fields, files) {
      if (err) {
        return res.boom.badRequest(err)
      }

      // ===========================================
      const uid = new Date().getTime().toString(36)
      let { file: { path: filePath = '', name: fileName = '' } = {} } = files

      let newFileName = fileName.replace(/(\.[\w\d_-]+)$/i, `_${uid}$1`)
      newFileName = newFileName.replace(/ /g, '_')
      // console.log('fileName :>> ', fileName)
      // console.log('newfileName :>> ', newFileName)

      const newpath = path.join(`${__dirname}/../../../public`, newFileName)

      mv(filePath, newpath, function (e) {
        if (e) return res.boom.badRequest(e)
        const dataLinkUrl = `${req.protocol}://${req.get(
          'host'
        )}/${newFileName}`
        return res.status(201).send({ image: encodeURI(dataLinkUrl) })
      })
    })
  } catch (error) {
    console.log('catch error...', error)
    return res.boom.badRequest(error)
  }
}

export function login(req: Request, res: Response) {
  return AppUserDao.login(req.body)
    .then((appuser) => res.status(200).send(appuser))
    .catch((error) => res.boom.badRequest(error))
}
