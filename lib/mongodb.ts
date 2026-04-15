import { MongoClient } from 'mongodb'

declare global {
  // eslint-disable-next-line no-var
  var __pgfMongoClient: MongoClient | undefined
  var __pgfMongoClientPromise: Promise<MongoClient> | undefined
}

export function getMongo() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error('Missing MONGODB_URI')
  }

  const client = global.__pgfMongoClient ?? (global.__pgfMongoClient = new MongoClient(uri))
  const clientPromise = global.__pgfMongoClientPromise ?? (global.__pgfMongoClientPromise = client.connect())
  const db = client.db()

  return { client, clientPromise, db }
}

