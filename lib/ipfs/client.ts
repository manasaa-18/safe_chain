// IPFS Integration for Media Storage

import { create } from "ipfs-http-client"

const IPFS_API_URL = process.env.NEXT_PUBLIC_IPFS_API_URL || "http://localhost:5001"

export class IPFSClient {
  private client: ReturnType<typeof create>

  constructor() {
    this.client = create({
      url: IPFS_API_URL,
    })
  }

  /**
   * Upload media file to IPFS
   */
  async uploadMedia(file: File): Promise<string> {
    try {
      const encrypted = await this.encryptFile(file)
      const result = await this.client.add(encrypted)
      return result.path
    } catch (error) {
      console.error("Error uploading to IPFS:", error)
      throw error
    }
  }

  /**
   * Upload self-defense video metadata
   */
  async uploadVideoMetadata(metadata: {
    title: string
    description: string
    instructor: string
    duration: number
    category: string
    contentHash: string
  }): Promise<string> {
    try {
      const jsonData = JSON.stringify(metadata)
      const buffer = new TextEncoder().encode(jsonData)
      const result = await this.client.add(buffer)
      return result.path
    } catch (error) {
      console.error("Error uploading video metadata:", error)
      throw error
    }
  }

  /**
   * Download and decrypt file from IPFS
   */
  async downloadMedia(ipfsHash: string): Promise<Blob> {
    try {
      const chunks = []
      for await (const chunk of this.client.cat(ipfsHash)) {
        chunks.push(chunk)
      }
      const blob = new Blob(chunks)
      return await this.decryptFile(blob)
    } catch (error) {
      console.error("Error downloading from IPFS:", error)
      throw error
    }
  }

  /**
   * Encrypt file using AES-256
   */
  private async encryptFile(file: File): Promise<Uint8Array> {
    // Placeholder - implement AES-256 encryption
    const arrayBuffer = await file.arrayBuffer()
    return new Uint8Array(arrayBuffer)
  }

  /**
   * Decrypt file using AES-256
   */
  private async decryptFile(blob: Blob): Promise<Blob> {
    // Placeholder - implement AES-256 decryption
    return blob
  }

  /**
   * Verify file authenticity from IPFS hash
   */
  async verifyFileHash(file: File, expectedHash: string): Promise<boolean> {
    try {
      // Compare file hash with expected hash
      const hash = await this.calculateFileHash(file)
      return hash === expectedHash
    } catch (error) {
      console.error("Error verifying file hash:", error)
      return false
    }
  }

  /**
   * Calculate SHA-256 hash of file
   */
  private async calculateFileHash(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer()
    const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  }
}

export const ipfsClient = new IPFSClient()
