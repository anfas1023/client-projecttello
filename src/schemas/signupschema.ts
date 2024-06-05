import * as z from "zod"

export const SignUpschema=z.object({
    email:z.string().email(),
    password:z.string(),
    username:z.string(),
    phonenumber:z.string()
})
