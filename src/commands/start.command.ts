import { Command } from './command.class'
import { type IBotContext } from '../context/context.interface'
import { Markup, type Telegraf } from 'telegraf'

export class StartCommand extends Command {
  constructor (bot: Telegraf<IBotContext>) {
    super(bot)
  }

  handle (): void {
    this.bot.start((ctx) => {
      console.log(ctx.session)
      void ctx.reply('Вам понравился курс?', Markup.inlineKeyboard([
        Markup.button.callback('👍', 'course_like'),
        Markup.button.callback('👎', 'course_dislike')
      ])
      )
    })

    this.bot.action('course_like', (ctx) => {
      ctx.session.courseLike = true
      void ctx.editMessageText('🎉 Круто!')
    })

    this.bot.action('course_dislike', (ctx) => {
      ctx.session.courseLike = false
      void ctx.editMessageText('😒')
    })
  }
}
