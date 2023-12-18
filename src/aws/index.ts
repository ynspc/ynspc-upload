import ynspcS3 from "./setup"
import { bucketName, signedUrlExpiry } from "./config"
import { generalisedKey, generateKey, SignedUrlResponse, SIGNED_URL_CONFIG } from "./types"
import { AWSError, S3 } from "aws-sdk"
import { PromiseResult } from "aws-sdk/lib/request"

export const generateSignedUrl = async <TCONTTYPE extends string, TExt extends string>(prefix: string, contentType: TCONTTYPE, extWithOutDot: TExt): Promise<SignedUrlResponse> => {
    const s3 = new ynspcS3()
    const key = generalisedKey(prefix, generateKey(8), extWithOutDot)

    const signedUrlConfig: SIGNED_URL_CONFIG = {
        Bucket: bucketName,
        ContentType: contentType,
        Expires: signedUrlExpiry,
        Key: key
    }

    try {
        const url: string = await s3.generateSignedUrl("putObject", signedUrlConfig);
        
        return {
            url,
            key
        }
    }
    catch(exception: any) {
        throw new TypeError(exception.message)
    }
}

export const getFileObject = (key: string): Promise<PromiseResult<S3.GetObjectOutput, AWSError>> => {
    const s3 = new ynspcS3()
    try{
        return s3.getFileObject(key)
    }
    catch(exception: any) {
        throw new TypeError(exception?.message)
    }
}

export const checkObject = (key: string): Promise<boolean> => {
    const s3 = new ynspcS3()
    try{
        return s3.checkObject(key)
    }
    catch(exception: any) {
        throw new TypeError(exception?.message)
    }
}
