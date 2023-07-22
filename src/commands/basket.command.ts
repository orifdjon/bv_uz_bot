import { Command } from './command.class'
import { type IBotContext } from '../context/context.interface'
import { type Telegraf } from 'telegraf'

export class BasketCommand extends Command {
  constructor (bot: Telegraf<IBotContext>) {
    console.log('asdasd')
    super(bot)
  }

  handle (): void {
    this.bot.command('basket', (ctx) => {
      void ctx.reply('Это корзина')
    })
  }
}
