import firestore from '@react-native-firebase/firestore';

class DatabaseCall {
  constructor(database) {
    this.database = database
  }
}

export class FirestoreAPI {
  getCollection(collection) {
    const collectionRef = firestore().collection(collection)
    if(!collectionRef) throw 'Collection not found'
    return collectionRef
  }

  async getById(collection, id) {
    const collectionRef = this.getCollection(collection)
    const result = await collectionRef.doc(id).get()
    return result.exists ? result.data(): {}
  }

  async getAll(collection, filters=[], orderBy, limit) {
    const collectionRef = this.getCollection(collection)
    let query = collectionRef
    for (let filter of filters) {
      if (filter.length !== 3) throw 'Filter is not valid'
      query.where(filter[0], filter[1], filter[2])
    }
    if (orderBy) query.orderBy(orderBy)
    if (limit && typeof limit === 'number') query.limit(limit)
    return query.get()
  }

  
}