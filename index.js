import express from 'express'
import cors from 'cors'
import router from './routes/router.js'
import bodyParser from 'body-parser'
import { API_END_POINT } from './config/constants.js'

const app = express();

app.use(express.json());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors(
    {
        credentials:true
    }
));

const userApi = `/${API_END_POINT.TYPE}/${API_END_POINT.VERSION}/${API_END_POINT.CONTEXT}`

app.use(userApi, router);

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})