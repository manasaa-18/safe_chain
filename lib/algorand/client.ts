// Algorand Blockchain Integration Client

import algosdk from "algosdk"

const ALGORAND_NETWORK = "testnet" // Use testnet for development
const ALGORAND_TOKEN = process.env.NEXT_PUBLIC_ALGORAND_TOKEN || ""
const ALGORAND_SERVER = process.env.NEXT_PUBLIC_ALGORAND_SERVER || "https://testnet-api.algonode.cloud"

export class AlgorandClient {
  private client: algosdk.Algodv2
  private indexer: algosdk.Indexer

  constructor() {
    this.client = new algosdk.Algodv2(ALGORAND_TOKEN, ALGORAND_SERVER, "")
    // For indexer, you'd set up similarly
    this.indexer = new algosdk.Indexer("", ALGORAND_SERVER, "")
  }

  /**
   * Submit an SOS alert transaction to Algorand blockchain
   */
  async submitSOSAlert(userAddress: string, latitude: number, longitude: number, ipfsHash: string, message: string) {
    try {
      const params = await this.client.getTransactionParams().do()

      const txn = algosdk.makeApplicationNoOpTxn(
        userAddress,
        process.env.NEXT_PUBLIC_APP_ID ? Number.parseInt(process.env.NEXT_PUBLIC_APP_ID) : 0,
        ["register_sos", userAddress, latitude.toString(), longitude.toString(), ipfsHash],
        undefined,
        undefined,
        undefined,
        undefined,
        params,
      )

      // This would be signed by the user's wallet
      return txn
    } catch (error) {
      console.error("Error submitting SOS alert:", error)
      throw error
    }
  }

  /**
   * Submit responder reward transaction
   */
  async submitResponderReward(responderAddress: string, amount: number, sosAlertId: string) {
    try {
      const params = await this.client.getTransactionParams().do()

      const txn = algosdk.makeApplicationNoOpTxn(
        responderAddress,
        process.env.NEXT_PUBLIC_APP_ID ? Number.parseInt(process.env.NEXT_PUBLIC_APP_ID) : 0,
        ["reward_responder", amount.toString(), sosAlertId],
        undefined,
        undefined,
        undefined,
        undefined,
        params,
      )

      return txn
    } catch (error) {
      console.error("Error submitting responder reward:", error)
      throw error
    }
  }

  /**
   * Get SOS alert history for a user
   */
  async getSOSHistory(userAddress: string) {
    try {
      // Query indexer for user's SOS transactions
      const transactions = await this.indexer.searchForTransactions().address(userAddress).do()

      return transactions.transactions
    } catch (error) {
      console.error("Error fetching SOS history:", error)
      throw error
    }
  }

  /**
   * Verify responder identity on-chain
   */
  async verifyResponderIdentity(responderAddress: string) {
    try {
      const params = await this.client.getTransactionParams().do()

      const txn = algosdk.makeApplicationNoOpTxn(
        responderAddress,
        process.env.NEXT_PUBLIC_APP_ID ? Number.parseInt(process.env.NEXT_PUBLIC_APP_ID) : 0,
        ["verify_responder", responderAddress, "credential_proof"],
        undefined,
        undefined,
        undefined,
        undefined,
        params,
      )

      return txn
    } catch (error) {
      console.error("Error verifying responder:", error)
      throw error
    }
  }

  /**
   * Get account information
   */
  async getAccountInfo(address: string) {
    try {
      const accountInfo = await this.client.accountInformation(address).do()
      return accountInfo
    } catch (error) {
      console.error("Error fetching account info:", error)
      throw error
    }
  }
}

export const algorandClient = new AlgorandClient()
