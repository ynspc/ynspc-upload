import { afterAll, beforeAll, describe, expect, it, test } from "vitest"
import { rest } from "msw"
import { setupServer } from "msw/node"
import fileUploader, { manageConfiguration, manageFileNaming } from "./index"

const server = setupServer(
    rest.post("/test-upload", async (req, res, ctx) => {
        const { username } = await req.json()

        console.log("testing mock");
        
        return res(
            ctx.json({
                username,
                firstName: 'John'
            })
        )
    })
)

beforeAll(() => {
    // Establish requests interception layer before all tests.
    server.listen()
})
afterAll(() => {
    // Clean up after all tests are done, preventing this
    // interception layer from affecting irrelevant tests.
    server.close()
})

test('renders a book data', () => {
// Render components, perform requests, API communication is covered.
server.use()
})

describe("demo-test", () => {
    it("should pass the demo-test", () => {
        expect(11).toBe(11)
    })
})

// describe("file-upload", () => {
//     it("should read the file before", () => {
//         const filePath = `${process.cwd()}/storage/original/logo.png`
//         const fileUpload = new fileUploader('storage/uploaded')
//         fileUpload.singleUpload('file', req)
//     })
// })