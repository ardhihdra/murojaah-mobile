import { createUser } from "@api/auth"

export default class User {
  constructor({
    id, name, email, emailVerified, 
    level, health, streak, dirham, photoURL,
    phoneNumber,
  }) {
    this.id = id || ''
    this.name = name || ''
    this.email = email || ''
    this.emailVerified = emailVerified || ''
    this.level = level || 0
    this.health = health || 0
    this.streak = streak || 0
    this.dirham = dirham || 0
    this.photoURL = photoURL || ''
    this.phoneNumber = phoneNumber || ''
  }

  async saveUserToDB() {
    if(!this.id) throw 'id is required'
    if(!this.email) throw 'email is required'

    const creation = await createUser({
      id: this.id,
      name: this.name,
      email: this.email,
      emailVerified: this.emailVerified,
      level: this.level,
      health: this.health,
      streak: this.streak,
      dirham: this.dirham,
      photoURL: this.photoURL,
      phoneNumber: this.phoneNumber,
    })
    return creation
  }

}