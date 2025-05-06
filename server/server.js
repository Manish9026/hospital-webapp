import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import { connectDB } from './config/db.js';
import doctorRoutes from './routes/doctors.js';


dotenv.config();


const app = express();

app.use(express.json())
app.use(cors({
    origin: [process.env.BASE_URL,'http://localhost:3000', ],
    credentials: true,
    methods: ["POST", "GET", "DELETE", "PATCH"]
}))
app.use(express.urlencoded({ extended: true }))

app.use("/api", doctorRoutes);
app.use("/",(req,res)=>{

    res.send("<div style='background:blue;display:flex;justify-content:center; flex:1; height:100%;  align-items: center;' > <h2>Welcome to server Page</h2> </div>")

})


const PORT = process.env.PORT || 5000;

connectDB().then(res=>{
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));  

}).catch((error=>{
    console.log(error);
    process.exit(1);
}));

