const dotenv = require('dotenv')
const path = require('path')
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const serviceAccountJsonObject = {
    type: "service_account",
    project_id: "anajwala-99d67",
    private_key_id: "c104f83d1b0fd12cffef01425312205939ffe4e3",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC8xlTzmwsblYUU\nMw/ToqxNmspzrSIrMXv2m+TygTENAksZxtly9fAdS+XHJ5QL9Q82/kHQGNdhZJns\nONWHLFMNm/iGDhTPs1rF6KyOIOnR6V8sNCYrP2UbHoVWIRb/s7KAllByUQiHQdQD\n4qU5hmQCX8hPEIVO1KsWAZSJ8KWa0mNXP6jD42aODcGTSbPW/Cv1ImkBXIPtgEiA\n+vUS1Spln4rTk0J+Xsmw2iMpf0pZQAnNKT8OOYSYs0L3hxsKDqKs3QFP9gP+gp4T\n3TgGy8koB6iS6lTyUij/7LJMdJo0lfzrES5A83M/uJYEUxulb+yC09mW5YPcAg/i\na82ZN0z/AgMBAAECggEALAF5/T3X5YrB9pb+qgHCc+bRKg0iqXoEIVVvFh8KvbMa\nqbwipbtySYoPWxE9YFo0vUehNO8Nil0mypvnHvc0tzf0Q9/VdyOi1f7q9sjyaOYj\nswzHFw7UtXE0eQMGtv3/bx1bTILaX5l3YJ59kL7k4m7Mpa2+vcUyytL8evl3yXK5\n5FauOWcEb0W6Z0WNNmVgw/H3oxOBdL3sHn+DooqsSMbwjPR27hitu4wouGRQNULh\nsJEqTuaXzXUPdW9mjnjltxAvRNmeEyHOaFnV5SbOBdDgwiOIcdVO8IEucyKxiKwi\nX04KuoLbEgP0GnoOpgV+awCwJJBI+YH36CYkeCkDsQKBgQD2APmQZHWca4Np6C+C\n51NI891Rb3tz9NUDIlZDOl4K8Esfp4w9pyBjtipVpOHSAKSleU1fMMaj0MqKHjkv\nX++nbA8U9Uc7JSANEp5pyRyMmDsB0YNjUBDw3EHu5nNt6CiknUj8jKhBrsNnCe4n\ntgvnajdmguVJyvXBtbhMgYHqbwKBgQDEcgnUK/cQHUJi6X8bw9bqI0x9H3ZUizu3\nPbBp7M2BpRUfiuL8UaqIMUxsQu/RrtxGSKJkj1sfP7i3MsmPTc0JyCZRR3CLDgUL\n+rs2HaJQcyn30MnKQgRYm8bdbtmGH/os9JIpZoQoE2QpMr6MdhynflKERCkngxYm\nvoRS6h9OcQKBgQChBk5VN4zMkIt6fWLsGqMnc4kAzypN4oqz/HvekYwROOzTkYZ4\nrLbEze60FLNEFOuw7M+6aWD8xaRt+A6SdgeW3WKZ41t22Xw7Ul6i++NWHCczr4KD\nNVuBbYsy52HTJU3FQrcNqLxSEiURgyyCjeUI2zvcO/396X4oB9zVJ0h0vQKBgQCG\nZEnrGCTOpmW7S2iE8ya9SWbTlsmaLyKsSoy8+p7hGbHowVhmK+yRfcB9tBFjDtBt\nWNWYHCbHqw1Qb3NLEXu7PG1SX6BT0USMnHylGgLoLNFCU1kpgJ5+jBuxc1tnEctS\nJAM2RYcV76YvNSL87vTNdXM4P3U0Lc7itKXMH5VJUQKBgQChfwJhZn8FG/KIJMds\nOASCXDfPXKdklBXqPtDSBKl+QxiAbtLYTzwQ2VmEISTRYWn3vfGzVt1hg5VKLMcT\nRktxbeDAWbCsi0I8dD6OllXG73GGZrKW+GEF7c170zpZl1ikxA/Y3mp5ZZSNIBxB\nxhQsgh30PaEHik0b0d8DR/vvmw==\n-----END PRIVATE KEY-----\n",
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