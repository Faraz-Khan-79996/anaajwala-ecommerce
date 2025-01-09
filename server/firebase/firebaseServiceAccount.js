const dotenv = require('dotenv')
const path = require('path')
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const serviceAccountJsonObject = {
    type: "service_account",
    project_id: "anajwala-developement",
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY,
    client_email: "firebase-adminsdk-5zyxt@anajwala-developement.iam.gserviceaccount.com",
    client_id: "112284512929517372933",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-5zyxt%40anajwala-developement.iam.gserviceaccount.com",
    universe_domain: "googleapis.com"
 }
  

 module.exports =  {
    serviceAccountJsonObject
 }