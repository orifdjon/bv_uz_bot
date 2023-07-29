import { type IBotContext } from '../context/context.interface'
import { type Composer } from 'telegraf'

export abstract class Command {
  constructor (public bot: Composer<IBotContext>) {}

  abstract handle (): void
}
