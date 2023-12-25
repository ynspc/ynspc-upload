import FileUpload from "./upload"
import { manageConfiguration, manageFileNaming } from "./upload/config"
import { FileUploadMiddleware, parseFormData } from "./middleware"

import { generateSignedUrl, getFileObject, checkObject } from "./aws"
import { generateGoogleSignedUrl } from "./google"

export default FileUpload

export {
    manageConfiguration,
    manageFileNaming,
    FileUploadMiddleware,
    parseFormData,
    generateSignedUrl,
    getFileObject,
    checkObject,
    generateGoogleSignedUrl
}
