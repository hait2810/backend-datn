import  express  from "express";
import mongoose from "mongoose";
import cors from 'cors'
import routerHome from "./routes/home";
import routerUser from "./routes/user";


const url =
  "mongodb+srv://datn_433:tg7aERk5yF9Jes9V@atlascluster.nyvzdzm.mongodb.net/?retryWrites=true&w=majority";
async function connect() {
  try {
    await mongoose.connect(url);
    console.log("connect succsess");
  } catch (error) {
    console.log(error);
  }
}
connect();

const app = express();
app.use(cors());
app.use(express.json());
app.use(routerHome)
app.use(routerUser)



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Đang chạy cổng", PORT);
});