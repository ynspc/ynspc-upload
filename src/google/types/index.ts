import { BucketOptions, FileOptions } from "@google-cloud/storage";
import { generateKey } from "../../utils";
import { keySize } from "../config";

export const GoogleVersion = {
    "v2": "v2",
    "v4": "v4"
} as const

export type GoogleVersionType = typeof GoogleVersion

export interface SignedUrlResponse {
    url: string;
    key: string;
}

export interface FileConfig<TContentType, TExt> {
    contentType: TContentType, 
    extensionWithOutDot: TExt,
    fileName?: string
    prefix?: string 
}

export interface UploadOption {
    keepSameName: boolean, 
}

export type BucketSetting = {
    bucketName: string,
    option?: BucketOptions 
}

export type FileSetting = {
    key: string,
    option?: FileOptions
}

export const generalisedKey = (extensionWithOutDot: string) => `${generateKey(keySize)}.${extensionWithOutDot}`
