import { Request, Response } from "express"
import multer from "multer"
import path from "path"
import fs from "fs"
import { manageFileNaming } from "./config"

export default class FileUpload {
  private readonly destinationFolder: string

  constructor(folderName: string) {
    folderName = folderName.toLowerCase()
    const folderPath = `${process.cwd()}`
    const folders = folderName.split("/")
    let aggregateFolder = folderPath 
    for (const folder of folders) {
      aggregateFolder += `/${folder}`
      if (!fs.existsSync(aggregateFolder)) {
        fs.mkdirSync(aggregateFolder)  
      }
    }
      
    this.destinationFolder = aggregateFolder
  }

  singleUpload(fileName: string, request: Request, response: Response, config: any) {
    return new Promise((resolve, reject) => {
      this.#uploadFile(request, config).single(fileName)(
        request,
        response,
        function (error) {
          if (error) {
            return reject(error)
          }

          return resolve(request.file)
        }
      )
    })
  }

  #uploadFile(request: Request, { allowedExtension }: any) {
    return multer({
      storage: this.#storage(),
      fileFilter: function (request, file, callback) {
        const extension = path.extname(file.originalname)
        if (!allowedExtension.extensions.includes(extension)) {
          callback(null, false)
          let err: any = new Error(allowedExtension.message)
          err.status = 422
          return callback(err)
        }
        callback(null, true)
      },
      // limits: {
      //   fileSize: 1024 * 1024
      // }
      /*limits:{
            fileSize: 1024 * 1024
        }*/
    })
  }

  #storage() {
    return multer.diskStorage({
      destination: (req: Request, file: Express.Multer.File, cb) => {
        cb(null, `${this.destinationFolder}/`)
      },

      filename: (req, file, cb) => manageFileNaming(req, file, cb)
    })
  }

}
