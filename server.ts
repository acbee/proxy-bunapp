const url = "https://api.ipdata.co?api-key=ebadd34957352f3f750edb1d636a48f73ec933e6882e628624fe11c3";
const port = 3000;

import express from "express";
import fs from "fs";
import https from "https";

const app = express();
app.use(express.static(__dirname));

app.get("/", async (req, res) => {
    try {
        console.log(`Request for /`);
        return res.sendFile(__dirname + '/index.html');
    } catch(error) {
        console.log(`Error: ${error}`);
        return res.status(500).send("Get / Error");
    }
});

app.get("/ip_server", async (req, res) => {
    try {
        console.log(`Request for /ip_server`);
        const response = await fetch(url);
        const json = await response.text();
        return res.status(200).send(json);
    } catch(error) { 
        return res.status(500).json({ status: "Error", message: "API Issue", url: `${url}` });
    }
});

app.listen(port, () => {
  console.log(`Server.ts listening on port ${port}.`);
});

