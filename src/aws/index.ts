import ynspcS3 from "./setup"
import { GENERAL, bucketName, signedUrlExpiry } from "./config"
import { generalisedKey, SignedUrlResponse, SIGNED_URL_CONFIG, FileConfig, UploadOption } from "./types"
import { AWSError, S3 } from "aws-sdk"
import { PromiseResult } from "aws-sdk/lib/request"

export const generateSignedUrl = async <TContentType extends string, TExt extends string>(
    fileConfig: FileConfig<TContentType, TExt>, 
    uploadOption?: UploadOption
): Promise<SignedUrlResponse> => {
    const s3 = new ynspcS3()
    let key = `${fileConfig?.prefix?.replace(/\/$/, "")}/` ?? ""

    if (uploadOption?.keepSameName) {
        key += `${fileConfig?.fileName}.${fileConfig.extensionWithOutDot}`
    }
    else {
        key += generalisedKey(fileConfig.extensionWithOutDot)
    }

    const signedUrlConfig: SIGNED_URL_CONFIG = {
        Bucket: bucketName,
        ContentType: fileConfig.contentType,
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
