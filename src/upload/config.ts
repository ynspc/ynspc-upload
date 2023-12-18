import path from "path"
import { Request } from "express"
import { FileFilterCallback } from "multer"
import { CONFIG, UPLOAD_CONFIG } from "../types/upload"

export const manageConfiguration = (fieldConfig: {field: string, config: CONFIG}[]): UPLOAD_CONFIG => {
    let recordConfig: UPLOAD_CONFIG = {}
    for (const config of fieldConfig) {
        recordConfig[config.field] = config.config
    }

    return recordConfig
}

const validateFile = (config: CONFIG, extension: string): boolean => config.extensions.includes(extension)

export const manageFileNaming = (request: Request, file: Express.Multer.File, cb:(error: Error | null, filename: string) => void): void => {
    const currentTime = new Date().getTime()
    const extension = path.extname(file.originalname)
    const fileNameLogic = `${currentTime}${extension}`
    cb(null, fileNameLogic)
}

export const manageFileFilter = (request: Request, file: Express.Multer.File, cb: Function, config: UPLOAD_CONFIG): void => {
    const extension = path.extname(file.originalname)
    const fieldName = file.fieldname
    let success = false

    for (const field in config) {
        console.log({field, fieldName})
        if (field === fieldName) {
            // const error = new Error("Invalid field name provided")
            // // error.status = 400
            // success = false
            // return cb(error)
            console.log(config[field], extension);
            if (!validateFile(config[field], extension)) {
                let detailedMessage = `${fieldName} is receiving bad input.` 
                const error = new Error(config[field].message)
                error.stack = detailedMessage;
                // error.status = 422
                success = false
                cb(error)
            }
            else {
                success = true
            }
        }
        
        
    }

    if(success) {
        cb(null, true)
    }
    else {

    }
}
