import { type PropOr } from 'telegraf/src/deunionize'

export interface IMessage extends PropOr<any, 'message'> {
  text?: string
}
