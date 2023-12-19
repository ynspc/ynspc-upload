import ynspcS3 from "./setup"
import { GENERAL, bucketName, keySize, signedUrlExpiry } from "./config"
import { generalisedKey, generateKey, SignedUrlResponse, SIGNED_URL_CONFIG } from "./types"
import { AWSError, S3 } from "aws-sdk"
import { PromiseResult } from "aws-sdk/lib/request"

export const generateSignedUrl = async <TCONTTYPE extends string, TExt extends string>(prefix: string, contentType: TCONTTYPE, extWithOutDot: TExt): Promise<SignedUrlResponse> => {
    const s3 = new ynspcS3()
    const key = generalisedKey(prefix, generateKey(keySize), extWithOutDot)

    const signedUrlConfig: SIGNED_URL_CONFIG = {
        Bucket: bucketName,
        ContentType: contentType,
        Expires: signedUrlExpiry,
        Key: key
    }

    try {
        return {
            url: await s3.generateSignedUrl("putObject", signedUrlConfig),
            key
        }
    }
    catch(exception: unknown) {
        if (typeof exception === "string") {
            throw new TypeError(exception)
        }
        else if (exception instanceof Error) {
            throw new TypeError(exception.message)
        }
        else {
            throw new TypeError(GENERAL.CREATE_BUG)
        }
    }
}

export const getFileObject = (key: string): Promise<PromiseResult<S3.GetObjectOutput, AWSError>> => {
    const s3 = new ynspcS3()
    try{
        return s3.getFileObject(key)
    }
    catch(exception: unknown) {
        if (typeof exception === "string") {
            throw new TypeError(exception)
        }
        else if (exception instanceof Error) {
            throw new TypeError(exception.message)
        }
        else {
            throw new TypeError(GENERAL.CREATE_BUG)
        }
    }
}

export const checkObject = (key: string): Promise<boolean> => {
    const s3 = new ynspcS3()
    try{
        return s3.checkObject(key)
    }
    catch(exception: unknown) {
        if (typeof exception === "string") {
            throw new TypeError(exception)
        }
        else if (exception instanceof Error) {
            throw new TypeError(exception.message)
        }
        else {
            throw new TypeError(GENERAL.CREATE_BUG)
        }
    }
}
