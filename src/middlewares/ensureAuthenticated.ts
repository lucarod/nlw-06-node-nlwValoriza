import { Request, Response, NextFunction, response } from "express"
import { verify } from "jsonwebtoken"

interface IPayload {
  sub: string
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization
  
  if(!authToken) {
    return res.status(401).end()
  }

  const [,token] = authToken.split(" ")

  try {
    const { sub } = verify(token, "34cf5ff7c65a1ccf17e64024305a8b22") as IPayload;
    req.user_id = sub
    return next()
  } catch (error) {
    return res.status(401).end()
  }
}