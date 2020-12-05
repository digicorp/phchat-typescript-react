process.env.NODE_ENV = 'production'
const express = require('express')
const path = require('path')
// const favicon = require('express-favicon')

const port = process.env.PORT || 8080
const app = express()
//#region
// app.use(favicon(__dirname + '/dist/favicon.ico'))
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname))
app.use(express.static(path.join(__dirname, 'dist')))

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})
app.listen(port, () => {
  console.log(`server started!!! ${port}`)
})
//#endregion
