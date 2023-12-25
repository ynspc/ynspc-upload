import S3 from "aws-sdk/clients/s3"
import { 
    accessKeyId,
    secretAccessKey,
    bucketName,
    region,
    envCheck
 } from "./config"
import { SIGNED_URL_CONFIG } from "./types";
import { exit } from "process";

export default class AWS_HELPER {
    private readonly s3Helper

    constructor() {
        if (typeof envCheck.STORAGE === "undefined" || envCheck.STORAGE !== 'aws') {
            console.log("==========================================");
            console.log("Please set STORAGE as aws in env file. Or can choose between aws, google or local.")
            console.log("==========================================");
            console.log("Exiting with error code 1");
            exit(1)
        }
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
