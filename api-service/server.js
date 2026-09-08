const express = require("express");
 
const app = express();
const PORT = process.env.PORT || 3000;
 
app.get("/api/info", (req, res) => {
  res.json({
    team: "nptv23",
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});
 
app.get("/", (req, res) => {
  res.send("api-service is running. Try /api/info");
});
 
app.listen(PORT, () => {
  console.log(`api-service listening on port ${PORT}`);
});
 
