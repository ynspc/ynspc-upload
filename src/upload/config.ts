import { Request } from "express"
import path from "path"

interface CONFIG {
    extensions: string[]
    errorMessage: string
}

export const manageConfiguration = (config?: CONFIG): CONFIG => {
    if (config) {
       return config
    }

    return {
        extensions: ['jpg'],
        errorMessage: "Your selection of file is not supported"
    }
}

export const manageFileNaming = (request: Request, file: Express.Multer.File, cb:(error: Error | null, filename: string) => void): void => {
    const currentTime = new Date().getTime()
    const extension = path.extname(file.originalname)
    const fileNameLogic = `${currentTime}${extension}` 
}