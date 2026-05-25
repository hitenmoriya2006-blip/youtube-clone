const app = require('./app')
const connectDB = require('./db/db.js')

connectDB()

app.listen(3000,()=>{
    console.log('server is running');
})