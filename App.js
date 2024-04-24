import express from "express";
import mongoose from "mongoose";
import UserRoutes from "./Users/routes.js";
import cors from "cors";
import Hello from './Hello.js';
import Lab5 from "./Lab5.js";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import AssignmentsRoutes from './Kanbas/assignments/routes.js';
import session from "express-session";
import "dotenv/config";

mongoose.connect("mongodb://127.0.0.1:27017/kanbas");
//const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb+srv://wdev95725:<webdev100>@cluster0.xukd5xs.mongodb.net'
//mongoose.connect(CONNECTION_STRING);

//credentials: true,
//origin: "http://localhost:3000",

const app = express();
app.use(cors({}
 ));

 const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  };
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
      domain: process.env.HTTP_SERVER_DOMAIN,
    };
  }
  app.use(session(sessionOptions));
  
  
app.use(express.json());  // Parse JSON bodies
ModuleRoutes(app);
CourseRoutes(app);
AssignmentsRoutes(app);
Hello(app);
Lab5(app);  // Initialize Lab5 routes
UserRoutes(app);

app.listen(process.env.PORT || 4000);