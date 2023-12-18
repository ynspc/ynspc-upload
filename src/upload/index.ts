import fs from "fs"
import path from "path"
import { Request, Response } from "express"
import multer, { FileFilterCallback } from "multer"
import { manageFileFilter, manageFileNaming } from "./config"
import { CONFIG, UPLOAD_CONFIG } from "../types/upload"

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
  
  #uploadFile(request: Request, config: UPLOAD_CONFIG) {
    return multer({
      storage: this.#storage(),
      fileFilter: (request: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
        manageFileFilter(request, file, callback, config)
      }
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

  singleUpload(fileName: string, request: Request, response: Response, config: UPLOAD_CONFIG) {
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

  multipleUpload(fileName: string, request: Request, response: Response, config: any) {
    return new Promise((resolve, reject) => {
      this.#uploadFile(request, config).array(fileName)(
        request,
        response,
        function (error) {
          if (error) {
            return reject(error)
          }

          return resolve(request.files)
        }
      )
    })
  }

  differentFieldsUpload(structuredField: multer.Field[], request: Request, response: Response, config: any) {
    return new Promise((resolve, reject) => {
      this.#uploadFile(request, config).fields(structuredField)(
        request,
        response,
        function (error) {
          if (error) {
            return reject(error)
          }

          return resolve(request.files)
        }
      )
    })
  }

}
