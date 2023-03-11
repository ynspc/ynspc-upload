# ynspc-upload

### Installation

**yarn add @ynspc/image-upload**

**npm install @ynspc/image-upload**

**pnpm add @ynspc/image-upload**

```
const { manageConfiguration, manageFileNaming } = require("@ynspc/image-upload")
const ynspcImageUpload = require("@ynspc/image-upload").default

const config = manageConfiguration({
    message: "You need to upload valid file",
    extensions: [".jpg", ".png1"]
})
const uploadImage = new ynspcImageUpload("storage/logos")
try {
    const response = await uploadImage.singleUpload("logo", req, res, config)
    console.log(response)
}
catch(exception) {
    console.log("error", exception)
}
```