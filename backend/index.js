const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const express = require('express');
const cors = require('cors'); 
require('dotenv').config();

const app = express();
const PORT = 3001; 

app.use(cors()); 
app.use(express.json());


const s3Client = new S3Client({
    region: process.env.AWS_REGION, 
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
})

app.get("/health", (req, res) => {
    res.status(200).send({ message: "Health OK!" })
})

app.get('/image', async (req, res) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME, 
        Key: 'image.jpg', 
    }

    try {
        const command = new GetObjectCommand(params);
        const signedURL = await getSignedUrl(s3Client, command, { expiresIn: 60 });
        console.log(signedURL)
        res.json({ imageUrl: signedURL });
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})