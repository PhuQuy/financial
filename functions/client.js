const express = require('express');
const path = require("path");
const app = express();
app.use('/assets', express.static(path.join(__dirname, 'dist/browser/assets')));
app.get('*.*', express.static('./dist/browser', {
  maxAge: '1y'
}));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/browser/index.html'))
});
exports.app = app;
