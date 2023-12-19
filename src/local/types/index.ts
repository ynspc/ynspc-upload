import sharp from "sharp"

type sharpBuffer =  | Buffer
| Uint8Array
| Uint8ClampedArray
| Int8Array
| Uint16Array
| Int16Array
| Uint32Array
| Int32Array
| Float32Array
| Float64Array
| string

export interface sharpParams {
    buffer?: sharpBuffer,
    option?: sharp.SharpOptions
}
