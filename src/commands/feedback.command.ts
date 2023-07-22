import { Command } from './command.class'
import { type IBotContext } from '../context/context.interface'
import { type Telegraf } from 'telegraf'

export class FeedbackCommand extends Command {
  constructor (bot: Telegraf<IBotContext>) {
    console.log('отзыв')
    super(bot)
  }

  handle (): void {
    this.bot.command('feedback', (ctx) => {
      void ctx.reply('Ваши отзывы')
    })
  }
}
