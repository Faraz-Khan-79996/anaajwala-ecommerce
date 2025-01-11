const axios = require('axios');

const localBaseUrl = "http://localhost:3000";
const developmentUrl = "https://anaajwala-ecommerce-daqc.vercel.app";

const testAuthMiddleware = async (baseUrl) => {
    
    const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YWNkN2FjZjJjZmJjYTYyMDNmOGYxMyIsImlhdCI6MTczNjUyNzIzNH0.iSwX_-AWjWHkF58KyhtoTs_lV4V8fdOW4zMwzXgRNlQ";
    const headers = { Authorization: `Bearer ${access_token}` };

    try {
        const { data } = await axios.get(`${baseUrl}/api/user/profile`, { headers });

        console.log(data);
        
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
    }
}

// testAuthMiddleware(localBaseUrl);
testAuthMiddleware(developmentUrl);