import { cleanEnv, str, num } from 'envalid'
import { GoogleVersionType } from './types'

export const envCheck = cleanEnv(process.env, { STORAGE: str({
        default: "local",
        desc: "Please provide the storage you want to use. [Default: 'local']", 
        choices: ["local", "aws", "google"] 
    }) 
})

const GOOGLE_CLOUD_STORAGE_CONFIG = envCheck.STORAGE === "google" 
    ? cleanEnv(process.env, {
        GOOGLE_CLOUD_VERSION: str({
            default: "v4",
            choices: ["v2", "v4"] 
        }),
        GOOGLE_CLOUD_KEY_FILE: str(),
        GOOGLE_CLOUD_PROJECT_ID: str(),
        SIGNED_URL_EXPIRY: num(),
        BUCKET_NAME: str(),
        SIZE_KEY: num(),
    }) 
    : {
        GOOGLE_CLOUD_VERSION: "",
        GOOGLE_CLOUD_KEY_FILE: "",
        GOOGLE_CLOUD_PROJECT_ID: "",
        SIGNED_URL_EXPIRY: 0,
        BUCKET_NAME: "",
        SIZE_KEY: 0,
    }

export const signedUrlExpiry = GOOGLE_CLOUD_STORAGE_CONFIG.SIGNED_URL_EXPIRY
export const bucketName = GOOGLE_CLOUD_STORAGE_CONFIG.BUCKET_NAME
export const keySize = GOOGLE_CLOUD_STORAGE_CONFIG.SIZE_KEY
export const keyFile = GOOGLE_CLOUD_STORAGE_CONFIG.GOOGLE_CLOUD_KEY_FILE
export const projectId = GOOGLE_CLOUD_STORAGE_CONFIG.GOOGLE_CLOUD_PROJECT_ID
export const version: keyof GoogleVersionType = GOOGLE_CLOUD_STORAGE_CONFIG.GOOGLE_CLOUD_VERSION as keyof GoogleVersionType
export const GENERAL = {
    CREATE_BUG: "Create bug for this error."
}