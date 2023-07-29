import { type IBotContext } from '../context/context.interface'
import { type Telegraf } from 'telegraf'

export abstract class Command {
  constructor (public bot: Telegraf<IBotContext>) {}

  abstract handle (): void
}
