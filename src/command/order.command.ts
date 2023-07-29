import { Command } from './command.class'
import { Markup } from 'telegraf'

export class OrderCommand extends Command {
  handle (): void {
    this.bot.command('order', (ctx) => {
      void ctx.reply('Отправить геолокацию', Markup.keyboard([
        Markup.button.callback('Отправить геолокацию', 'geo'),
        Markup.button.callback('Мои адреса', 'address'),
        Markup.button.callback('Назад', 'address')
      ]).oneTime().resize())
    })

    this.bot.action('geo', (ctx) => {
      void ctx.editMessageText('Локация')
    })

    this.bot.action('address', (ctx) => {
      void ctx.editMessageText('Ваши адреса')
    })
  }
}
