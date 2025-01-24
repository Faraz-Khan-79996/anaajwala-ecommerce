const dotenv = require('dotenv')
const path = require('path')
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const serviceAccountJsonObject = {
   type: "service_account",
   project_id: "anajwala-99d67",
   private_key_id: process.env.PRIVATE_KEY_ID,
   private_key: process.env.PRIVATE_KEY,
   client_email: "firebase-adminsdk-znd0g@anajwala-99d67.iam.gserviceaccount.com",
   client_id: "100167178581698156264",
   auth_uri: "https://accounts.google.com/o/oauth2/auth",
   token_uri: "https://oauth2.googleapis.com/token",
   auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
   client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-znd0g%40anajwala-99d67.iam.gserviceaccount.com",
   universe_domain: "googleapis.com"
 }
 

 module.exports =  {
    serviceAccountJsonObject
 }