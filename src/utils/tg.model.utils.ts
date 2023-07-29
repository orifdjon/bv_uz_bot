import { type Context } from 'telegraf'
import { type IMessage } from '../types/tg.model'

export function getMessage (ctx: Context): IMessage {
  return ctx.message as IMessage
}
