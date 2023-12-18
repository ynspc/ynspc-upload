import { cleanEnv, str, num } from 'envalid'
console.log("ENV", process.env);

export const envCheck = cleanEnv(process.env, { STORAGE: str({
        default: "local",
        desc: "Please provide the storage you want to use. [Default: 'local']", 
        choices: ["local", "aws", "google"] 
    }) 
})

const AWS_CONFIG = envCheck.STORAGE === "aws" 
    ? cleanEnv(process.env, {
        BUCKET_NAME: str(),
        REGION: str(),
        SIGNATURE_VERSION: str(),
        ACCESS_KEY: str(),
        SECRET_KEY: str(),
        SIGNED_URL_EXPIRY: num()
    }) 
    : {
        BUCKET_NAME: "",
        REGION: "",
        SIGNATURE_VERSION: "",
        ACCESS_KEY: "",
        SECRET_KEY: "",
        SIGNED_URL_EXPIRY: 0
    }

const GOOGLE_CLOUD_STORAGE_CONFIG = envCheck.STORAGE === "google" 
    ? cleanEnv(process.env, {
        BUCKET_NAME: str(),
        REGION: str(),
        SIGNATURE_VERSION: str(),
        ACCESS_KEY: str(),
        SECRET_KEY: str(),
        SIGNED_URL_EXPIRY: num()
    }) 
    : {
        BUCKET_NAME: "",
        REGION: "",
        SIGNATURE_VERSION: "",
        ACCESS_KEY: "",
        SECRET_KEY: "",
        SIGNED_URL_EXPIRY: 0
    }

export const bucketName = AWS_CONFIG.BUCKET_NAME
export const region = AWS_CONFIG.REGION
export const signatureVersion = AWS_CONFIG.SIGNATURE_VERSION
export const accessKeyId = AWS_CONFIG.ACCESS_KEY
export const secretAccessKey = AWS_CONFIG.SECRET_KEY
export const signedUrlExpiry = AWS_CONFIG.SIGNED_URL_EXPIRY
