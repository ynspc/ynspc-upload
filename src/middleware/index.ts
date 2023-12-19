import {Express, Request, Response, NextFunction} from 'express'
import multer from 'multer'
import FileUpload from '../upload'

// Your custom "middleware" function:
export function FileUploadMiddleware(folder: string, fileName: string, action: "single" | "multiple", config: any) {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const fileUpload = new FileUpload(folder)
            const result: any = action === 'single'
                ? await fileUpload.singleUpload(fileName, req, res, config)
                : await fileUpload.singleUpload(fileName, req, res, config)

            req.body[`uploaded_paths`] = [result.path]

            next()
        }
        catch(error: any) {
            const generalError: any = new Error()
            generalError.title = "Error"
            generalError.status = 422
            generalError.message = error.message
            
            next(generalError)
        }
    }
}
// Your custom "middleware" function:
export function parseFormData(req: Request, res: Response, next: NextFunction): void {
    multer().any()
    next()
}
