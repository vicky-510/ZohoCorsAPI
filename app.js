import express from 'express' 
import fetch from 'node-fetch';
const app = express();
import cors from 'cors';

const port = 3000;

// import dotenv from 'dotenv';
// dotenv.config();


app.use(express.json());

  
  // Set CORS headers middleware
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://c0022905-0667-4f4a-8672-406eb6c3d7c9.zappsusercontent.com"); 
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Private-Network", true);
    res.setHeader("Access-Control-Max-Age", 7200); // 2 hours cache for preflight
    next();
  });
  
  // Handle preflight requests
  app.options('*', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "https://c0022905-0667-4f4a-8672-406eb6c3d7c9.zappsusercontent.com"); 
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.status(204).send();
  });
//   app.options('*', cors());

// Function to fetch data from Zoho Creator using public key
const fetchDataFromZoho = async () => {
  const apiUrl = `https://www.zohoapis.com/creator/custom/zdchackathon1131/getProducts?publickey=QJMujAT3g9gwJ509FPeEhj3Qs`;  
  
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data from Zoho:', error);
    throw error;
  }
};

// Endpoint to fetch data from Zoho and return it as a response
app.get('/getdata', async (req, res) => {
  try {
    const data = await fetchDataFromZoho();
    
    // Send the fetched data as a JSON response
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching data from Zoho');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
