
export interface CONFIG {
    extensions: string[]
    message: string
}

export type UPLOAD_CONFIG = Record<string, CONFIG>

export const STORAGE_TYPE = {
    LOCAL: "local",
    GOOGLE: "google",
    AWS: "aws"
} as const

export const FILES_TYPES = {
    SINGLE: "single",
    MULTIPLE: "multiple",
    MIXED: "mixed"
} as const
