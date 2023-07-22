import { type Context } from 'telegraf'
import { type PropOr } from 'telegraf/typings/deunionize'

export interface SessionData {
  courseLike: boolean
}

export interface IBotContext extends Context {
  session: SessionData
}

export interface IMessage extends PropOr<any, 'message'> {
  text?: string
}
