import { Command } from './command.class'
import { Markup } from 'telegraf'

export class AccountCommand extends Command {
  handle (): void {
    this.bot.command('account', (ctx) => {
      void ctx.reply('Больше инфо', Markup.inlineKeyboard([
        Markup.button.callback('Добавьте кое-что еще о себе', 'more_info'),
        Markup.button.callback('Cashback', 'cashback')
      ]))
    })

    this.bot.action('more_info', (ctx) => {
      ctx.session.courseLike = true
    })

    this.bot.action('cashback', (ctx) => {
      ctx.session.courseLike = true
      void ctx.editMessageText('У вас столько-то кешбэка')
    })

    this.bot.action('cashback', (ctx) => {
      ctx.session.courseLike = true
      void ctx.editMessageText('Изменение ваших данных')
    })
  }
}
