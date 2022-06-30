const express = require('express')
require('dotenv').config()
const colors = require('colors')
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema')
const port = process.env.PORT || 5000;
const connectDB = require('./config/db')

const app = express()
//connect to db
connectDB()
//connect to server
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}))


app.listen(port, console.log(`server runing on port: ${port}`))