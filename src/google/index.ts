import ynspcGoogle from "./setup"
import { GENERAL, bucketName, signedUrlExpiry, version } from "./config"
import { generalisedKey, SignedUrlResponse, FileConfig, UploadOption } from "./types"
import { GetSignedUrlConfig } from "@google-cloud/storage"

export const generateGoogleSignedUrl = async <TContentType extends string, TExt extends string>(
    fileConfig: FileConfig<TContentType, TExt>, 
    uploadOption?: UploadOption
): Promise<SignedUrlResponse> => {
    const googleStorage = new ynspcGoogle()
    let key = `${fileConfig?.prefix?.replace(/\/$/, "")}/` ?? ""

    if (uploadOption?.keepSameName) {
        key += `${fileConfig?.fileName}.${fileConfig.extensionWithOutDot}`
    }
    else {
        key += generalisedKey(fileConfig.extensionWithOutDot)
    }

    const signedUrlConfig: GetSignedUrlConfig = {
      version: version,
      action: "write",
      expires: signedUrlExpiry,
      contentType: fileConfig.contentType
    }

    try {
        return {
            url: await googleStorage.generateSignedUrl(
              {
                bucketName: bucketName
              }, 
              {
                key: key
              }, 
              signedUrlConfig
            ),
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
