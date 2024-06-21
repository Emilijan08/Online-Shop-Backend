import dotenv from 'dotenv'
import fs from 'fs'
import mongoose from 'mongoose'
import path from 'path'

dotenv.config()

async function importData () {
  try {
    await mongoose.connect(process.env.DATABASE_URL!)
    console.log('Connected to database')

    const dataDir = path.join(__dirname, '../data')

    if (!fs.existsSync(dataDir)) {
      throw new Error(`Data directory does not exist: ${dataDir}`)
    }

    const files = fs.readdirSync(dataDir)

    for (const file of files) {
      if (path.extname(file) === '.json') {
        const collectionName = path.basename(file, '.json')
        const modelPath = path.join(
          __dirname,
          '../models',
          `${collectionName}.ts`
        )

        let model
        try {
          model = (await import(modelPath)).default
        } catch (error) {
          console.warn(`No model found for collection: ${collectionName}`)
          continue
        }

        const data = JSON.parse(
          fs.readFileSync(path.join(dataDir, file), 'utf-8')
        )

        // await model.deleteMany({})
        // console.log(`Cleared existing data in ${collectionName} collection`)

        await model.insertMany(data)
        console.log(`Imported data into ${collectionName} collection`)
      }
    }

    console.log('Data imported successfully')
  } catch (error) {
    console.error('Error importing data:', error)
  } finally {
    mongoose.connection.close()
  }
}

importData()
