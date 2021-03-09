import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import { body, query, validationResult } from 'express-validator'

const app = express()
app.use(bodyParser.json())
app.use(cors())

const PORT = process.env.PORT || 3000
const SECRET = "SIMPLE_SECRET"

interface JWTPayload {
  username: string;
  password: string;
}

interface DbSchema{
  users : JWTPayload[]
}

app.post('/login',
  (req, res) => {

    const { username, password } = req.body
    // Use username and password to create token
    const body = req.body
    const raw = fs.readFileSync('db.json', 'utf8')
    const db: DbSchema = JSON.parse(raw)
    const user = db.users.find(user => user.username === body.username)
    if (!user) {
      res.status(400)
      res.json({ message: 'Invalid username or password' })
      return
    }
    if (!bcrypt.compareSync(body.password, user.password)) {
      res.status(400)
      res.json({ message: 'Invalid username or password' })
      return
    }
    const token = jwt.sign({username: user.username }, SECRET)
    res.json({ token })
  })

app.post('/register',
  (req, res) => 

    const { username, password, firstname, lastname, balance } = req.body
  })

app.get('/balance',
  (req, res) => {
    const token = req.query.token as string
    try {
      const { username } = jwt.verify(token, SECRET) as JWTPayload
  
    }
    catch (e) {
      //response in case of invalid token
    }
  })

app.post('/deposit',
  body('amount').isInt({ min: 1 }),
  (req, res) => {

    //Is amount <= 0 ?
    if (!validationResult(req).isEmpty())
      return res.status(400).json({ message: "Invalid data" })
  })

app.post('/withdraw',
  (req, res) => {
  })

app.delete('/reset', (req, res) => {

  //code your database reset here

  delete req.query.username
  delete req.query.password
  delete req.query.firstname
  delete req.query.lastname
  delete req.query.balance
  
  return res.status(200).json({
    message: 'Reset database successfully'
  })
})

app.get('/me', (req, res) => {
  
})

app.get('/demo', (req, res) => {
  return res.status(200).json({
    message: 'This message is returned from demo route.'
  })
})

app.listen(PORT, () => console.log(`Server is running at ${PORT}`))