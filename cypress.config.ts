import { faker } from '@faker-js/faker'
import { defineConfig } from 'cypress'
import { Db, MongoClient } from 'mongodb'

import { ContactModel } from './src/domains/ContactModel'

const DB_NAME = 'contactbook_test'
const DB_URL = `mongodb://localhost:27017/${DB_NAME}`
let db: Db | null = null

;(async () => {
  const connection = await MongoClient.connect(DB_URL)
  db = connection.db(DB_NAME)
})()

type PopulateType = {
  lastname: string
  populationSize: number
  startDate: Date
  endDate: Date
}

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3001',
    setupNodeEvents(on, config) {
      on('task', {
        async clearContacts() {
          await db?.collection('contacts').deleteMany({})
          return null
        },

        async populateContacts({
          lastname = 'Tester',
          populationSize = 2,
          startDate = new Date('2010-10-10'),
          endDate = new Date('2010-10-10'),
        }: PopulateType) {
          for (let i = 0; i < populationSize; i++) {
            const name =
              i < populationSize / 2
                ? faker.name.fullName({ lastName: lastname })
                : faker.name.fullName()

            const birthday =
              i < populationSize / 2
                ? faker.date.between(startDate, endDate)
                : faker.date.birthdate()

            const contact = new ContactModel({
              name,
              email: faker.internet.email(name),
              birthday,
              phone: faker.phone.number('(##) #####-####'),
            })

            await db?.collection('contacts').insertOne(contact)
          }

          return null
        },
      })
    },
  },
  video: false,
})
