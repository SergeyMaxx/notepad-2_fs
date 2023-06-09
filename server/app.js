const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')
const cors = require('cors')
const path = require('path')
const routes = require('./routes')

const app = express()
const PORT = config.get('port') ?? 8080

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use('/api', routes)

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client')))
  const indexPath = path.join(__dirname, 'client', 'index.html')
  app.get('*', (req, res) => {
    res.sendFile(indexPath)
  })
}

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'))
    console.log(chalk.bgGreen('MongoDB connected successful'))
    app.listen(PORT, () => {
      console.log(chalk.bgGreen(`Server has been started on port ${PORT}...`))
    })

  } catch (error) {
    console.log(chalk.bgRed(error.message))
    process.exit(1)
  }
}

start()