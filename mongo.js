const mongoose = require('mongoose')
//const { mongoPath } = require('./config.json')
const mongoPath = 'mongodb+srv://QuikSchool:superninja48@gfs-server-database.vkaba.mongodb.net/tags?retryWrites=true&w=majority'

module.exports = async () => {
  await mongoose.connect(mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  return mongoose
}
