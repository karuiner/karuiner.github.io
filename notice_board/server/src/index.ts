import * as express from "express";
import * as bodyParser from "body-parser";
import { MongoClient } from "mongodb";
import * as cors from "cors";
import "dotenv/config";

const url = process.env.MONGODB_URL || "";
console.log(url, typeof url);
const client = new MongoClient(url);
