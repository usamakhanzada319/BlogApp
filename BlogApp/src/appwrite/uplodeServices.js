import conf from '../conf/conf'
import { Client, ID, Databases, Storage, Query } from 'appwrite'

// file uplode services

export class UplodeServices {
  client = new Client()
  bucket
  constructor () {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
    this.bucket = new Storage(this.client)
  }

  async uplodeFile (file) {
    //file uplode karty time file ka name nahi file ka blobe dena h acctual file
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      )
    } catch (error) {
      console.log('appwrite service :: uplodeFile :: Error ', error)
      return false
    }
  }

  async deleteFile (fileId) {
    // frontend m featuredImage sy id ly ley gay
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId)
      return true
    } catch (error) {
      console.log('appwrite service :: deleteFile :: Error ', error)
      return false
    }
  }

  //get file preview

  getFilePreview (fileId) {
    try {
      return this.bucket.getFilePreview(conf.appwriteBucketId, fileId)
    } catch (error) {
      console.log('appwrite service :: getFilePreview :: Error ', error)
    }
  }
}

const uplodeservices = new UplodeServices()
export default uplodeservices
