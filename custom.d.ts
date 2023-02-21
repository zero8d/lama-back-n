declare namespace Express {
  export interface Request {
    user?: {
      email: string | undefined
      role: string | undefined
    }
  }
}
