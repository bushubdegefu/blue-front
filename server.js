const express = require("express");
const path = require("path");

const app = express();
const port = 4173;

// Define the directory containing your static files
const staticFilesDirectory = path.join(__dirname, "dist");

// Serve static files from the 'public' directory
app.use(express.static(staticFilesDirectory));
// app.get("*", (req, res) => {
//   res.json({ path: sta });
// });
// Define a route handler for all GET requests other than the ones handled by static middleware
app.get("*", (req, res) => {
  // Send the index.html file for all non-static routes
  res.sendFile(path.join(staticFilesDirectory, "index.html"));
});

// Start the server
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${port}`);
});
