import { type IBotContext } from '../context/context.interface'
import { type Telegraf } from 'telegraf'

export abstract class Command {
  protected constructor (public bot: Telegraf<IBotContext>) {}

  abstract handle (): void
}
