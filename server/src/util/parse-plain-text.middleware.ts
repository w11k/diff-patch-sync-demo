import * as bodyParser from 'body-parser'
import {NestMiddleware, Injectable} from '@nestjs/common'
import {Request, Response, NextFunction} from 'express'

@Injectable()
export class ParsePlainTextMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log(req)
        bodyParser.json({
            type: (request: any) => request.get('Content-Type') === 'text/plain; charset=UTF-8',
            strict: false,
        })(req, res, next)
    }
}