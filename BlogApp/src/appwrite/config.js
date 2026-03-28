import conf from '../conf/conf.js'
import { Client, ID, Databases, Storage, Query } from 'appwrite'

export class Service {
  client = new Client()
  databases
  bucket

  constructor () {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
    this.databases = new Databases(this.client)
    this.bucket = new Storage(this.client)
  }

  // method for create post

  async createPost ({ title, slug, content, featuredImage, status, userId }) {
    // yaha hm ny use keya h inside the bracket
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId
        }
      )
    } catch (error) {
      console.log('appwrite service :: createPost :: Error ', error)
      throw error
    }
  }

  async updatePost (slug, { title, content, featuredImage, status }) {
    //yeha slug hm ny q braucket sy bhar rakha h

    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status
        }
      )
    } catch (error) {
      console.log('appwrite service :: updatePost :: Error ', error)
      throw error
    }
  }

  async deletePost (slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      )
      return true
    } catch (error) {
      console.log('appwrite service :: deletePost :: Error ', error)
      return false
    }
  }

  // method for a  post get

  async getPost (slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      )
    } catch (error) {
      console.log('appwrite service :: getPost :: Error ', error)
    }
  }

  async getPosts (querys = [Query.equal('status', 'active')]) {
    // mujy wo sary post jo jis m query jo h jis ka status active ho
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        querys
      )
    } catch (error) {
      console.log('appwrite service :: getPosts :: Error ', error)
      return false
    }
  }
}

const service = new Service()
export default service
