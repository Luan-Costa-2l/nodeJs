import { Request, Response, NextFunction} from 'express';
import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { User, UserInstance } from "../models/User";

dotenv.config();

const notAuthorizedJson = { status: 401, message: 'Not authorized.'}
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string
}

passport.use(new JWTStrategy(options, async (payload, done) => {
    const user = await User.findByPk(payload.id);
    if (user) {
        return done(null, user);
    }
    return done(notAuthorizedJson, false);
}));

export const generate = (data: Object) => {
    return jwt.sign(data, process.env.JWT_SECRET as string);
}

export const privateRoute = (req: Request, res: Response, next: NextFunction) => {
    const auhtFunction = passport.authenticate('jwt', (err: Error, user: UserInstance) => {
        req.user = user;
        return user ? next() : next(notAuthorizedJson);
    });
    auhtFunction(req, res, next);
}


export default passport;