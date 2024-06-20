const mongoose = require('mongoose')
const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

dotenv.config()

async function seedData () {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Connected to database')

    const dataDir = path.join(__dirname, 'data')
    const files = fs.readdirSync(dataDir)

    for (const file of files) {
      if (path.extname(file) === '.json') {
        const collectionName = path.basename(file, '.json')
        const modelPath = path.join(__dirname, 'models', collectionName)

        if (fs.existsSync(`${modelPath}.js`)) {
          const model = require(modelPath.charAt(0).toUpperCase() +
            modelPath.slice(1))

          const data = JSON.parse(
            fs.readFileSync(path.join(dataDir, file), 'utf-8')
          )

          await model.insertMany(data)
          console.log(`Imported data into ${collectionName} collection`)
        } else {
          console.warn(`No model found for collection: ${collectionName}`)
        }
      }
    }

    console.log('Data imported successfully')
  } catch (error) {
    console.error('Error importing data:', error)
  } finally {
    mongoose.connection.close()
  }
}

seedData()
