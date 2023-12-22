import { generateKey } from "../../utils";
import { keySize } from "../config";

export interface SIGNED_URL_CONFIG {
    Key: string;    
    Bucket: string;
    Expires: number;
    ContentType: string;
}

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

export const generalisedKey = (extensionWithOutDot: string) => `${generateKey(keySize)}.${extensionWithOutDot}`
