const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/api/info', (req, res) => {
  const teamName = process.env.TEAM_NAME;
  
  if (!teamName) {
    return res.json({ meeskond: "Tundmatu tiim (Viga!)" });
  }

  res.json({ meeskond: teamName });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
