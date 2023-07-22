import { Command } from './command.class'
import { type IBotContext } from '../context/context.interface'
import { type Telegraf } from 'telegraf'

export class AccountCommand extends Command {
  constructor (bot: Telegraf<IBotContext>) {
    console.log('asdasd')
    super(bot)
  }

  handle (): void {
    this.bot.command('account', (ctx) => {
      void ctx.reply('Ваш аккаунт')
    })
  }
}
