declare namespace Express {
  interface Request {
    foundAccount?: {
      id: number
      accountName: string
    }
  }
}
