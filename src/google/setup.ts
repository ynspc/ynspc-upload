import { GetSignedUrlConfig, Storage } from "@google-cloud/storage";
import { envCheck, keyFile, projectId } from "./config"
import { exit } from "process";
import { BucketSetting, FileSetting } from "./types";

export default class Google_HELPER {
    private readonly googleHelper

    constructor() {
        if (typeof envCheck.STORAGE === "undefined" || envCheck.STORAGE !== 'google') {
            console.log("==========================================");
            console.log("Please set STORAGE as google in env file. Or can choose between aws, google or local.")
            console.log("==========================================");
            console.log("Exiting with error code 1");
            exit(1)
        }
        this.googleHelper = new Storage({
            projectId: projectId,
            keyFilename: keyFile
        });
    }

    async generateSignedUrl(bucketSetting: BucketSetting, fileSetting: FileSetting, signUrlConfig: GetSignedUrlConfig) {
        const [url] = await this.googleHelper
            .bucket(bucketSetting.bucketName, bucketSetting?.option)
            .file(fileSetting.key, fileSetting?.option)
            .getSignedUrl(signUrlConfig)

        return url
    }
}
