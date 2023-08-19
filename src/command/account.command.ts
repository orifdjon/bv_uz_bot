import { Command } from './command.class'
import { Markup } from 'telegraf'
import { InfoScene } from '../scene/info.scene'

export class AccountCommand extends Command {
  handle (): void {
    this.bot.command('account', async (ctx) => {
      void ctx.reply('Больше инфо', Markup.inlineKeyboard([
        Markup.button.callback('Добавьте кое-что еще о себе', 'more_info'),
        Markup.button.callback('Cashback', 'cashback'),
        Markup.button.callback('Изменение', 'edit')
      ]))
    })

    this.bot.action('more_info', async ctx => {
      await ctx.scene.enter(InfoScene.sceneName)
    })

    this.bot.action('cashback', (ctx) => {
      void ctx.editMessageText('У вас столько-то кешбэка')
    })
  }
}
