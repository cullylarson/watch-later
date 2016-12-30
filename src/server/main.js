import express from 'express'
import home from 'server/controllers/home'

const app = express()

app.get('/', home.index)

app.listen(3000)
