import conf from '../conf/conf.js'
import { Client, Account, ID } from 'appwrite'

export class AuthService {
  client = new Client()
  account
  constructor () {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
    this.account = new Account(this.client)
  }
  // method of create Acount
  async createAccount ({ email, password, name }) {
    try {
      const userAccount = await this.account.create({
        userId: ID.unique(), // 1st parem is always  unique id
        email, // 2nd is email
        password, // 3rd is password
        name
      })

      if (userAccount) {
        // apply an other method latter
        return this.login() // if userAccount is true then log in
      } else {
        return userAccount
      }
    } catch (error) {
      console.log('appwrite service :: createAccount :: Error ', error)

      throw error
    }
  }

  // Login method

  async login ({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession({ email, password })
    } catch (error) {
      console.log('appwrite service :: login :: Error ', error)

      throw error
    }
  }

  async getCurrentUser () {
    try {
      return await this.account.get()
    } catch (error) {
      console.log('appwrite service :: getCurrentUser :: Error ', error)
      // throw error
    }
    return null
  }

  async logout () {
    try {
      return await this.account.deleteSessions()
    } catch (error) {
      console.log('appwrite service :: logout :: Error ', error)
      throw error
    }
  }
}

const authService = new AuthService() // ye jo object create keya h new ki help sy ye sary methods is object m dot notation ki help sy access able hn

export default authService
