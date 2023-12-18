# ynspc-upload

### Installation

    yarn add @ynspc/image-upload

    npm install @ynspc/image-upload

    pnpm add @ynspc/image-upload

```
const { manageConfiguration, manageFileNaming } = require("@ynspc/image-upload")
const ynspcImageUpload = require("@ynspc/image-upload").default

const config = manageConfiguration([{
    field: "logos",
    config: {
        message: "You need to upload a valid file.",
        extensions: [".jpg", ".png"]
    }
}])
const uploadImage = new ynspcImageUpload("storage/logos")
try {
    const response = await uploadImage.singleUpload("logos", req, res, config)
    console.log(response)
}
catch(exception) {
    console.log("error", exception)
}
```

***Note***
```
app.use((err, req, res, next) => {
    ======Multer error handling======
    if (err.storageErrors !== undefined){
        req.resume()
    }
    ==================================
    
    return res
        .status(412)
        .json({ 
            result: 'fail', 
            error: { 
                code: 1001,
                detail: err.message
            }
        }, 412)
})
```

***Environment Config***
```
STORAGE= <storage>[aws, local]
ACCESS_KEY= <Your_access_key>
SECRET_KEY= <Your secret key>
BUCKET_NAME= <Your bucket name>
REGION= <Your region name>
SIGNATURE_VERSION= <Signature version>
SIGNED_URL_EXPIRY= <Signed url expiry>
AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE=1
```