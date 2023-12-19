import sharp from "sharp";
import { sharpParams } from "./types";

class LocalUploadFiles {
    constructor () {}

    private async generateThumbnail(sharpParams: sharpParams, resizeConfig?: sharp.SharpOptions) {
        return await sharp(sharpParams.buffer).resize().toBuffer()
    }

    public singleUpload() {
        // first read file
        // check for the validation
        // upload the file
        // check to create thumb nail or not
        // save the created thumbnails
    }
    
    public multipleUpload() {}
    
    public differentUpload() {}
}
