import * as AWS from "aws-sdk"
import S3 from "aws-sdk/clients/s3"
import { 
    accessKeyId,
    secretAccessKey,
    bucketName,
    region,
    signatureVersion,
    signedUrlExpiry,
    envCheck
 } from "./config"
import { SIGNED_URL_CONFIG } from "./types";

export default class AWS_HELPER {
    private readonly s3Helper

    constructor() {
        if (envCheck.STORAGE !== 'aws') {
            throw new TypeError("Please set STORAGE as aws in env file. Or can choose between aws, google or local.")
        }
        // AWS.config.update({
        //     credentials: {
        //         accessKeyId,
        //         secretAccessKey
        //     },
        //     region,
        //     signatureVersion
        // });

        // this.s3Helper = new AWS.S3()
        this.s3Helper = new S3({
            region,
            accessKeyId,
            secretAccessKey
        })
    }

    async generateSignedUrl(operationName: "putObject", params: SIGNED_URL_CONFIG) {
        return this.s3Helper.getSignedUrl(operationName, params)
    }

    async deleteFileFromBucket() {
        
    }
    
    async getFileObject(key: string) {
        return this.s3Helper.getObject({
            Bucket: bucketName,
            Key: key
        }).promise()
    }

    checkObject(key: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            return this.s3Helper
                .headObject({
                    Bucket: bucketName,
                    Key: key
                })
                .promise()
                .then(result => resolve(true))
                .catch(error => resolve(false))
        })
    }
}
