import { Command } from './command.class'
import { Markup } from 'telegraf'
import { InfoScene } from '../scene/info.scene'

export class TestCommand extends Command {
  handle (): void {
    this.bot.command('test', async (ctx) => {
      void ctx.reply('Больше инфо', Markup.inlineKeyboard([
        Markup.button.callback('Добавьте кое-что еще о себе', 'more_info'),
        Markup.button.callback('Cashback', 'cashback')
      ]))
    })

    this.bot.action('more_info', async ctx => {
      console.log('BBBBBOOOOOOMM!!', ctx.scene)
      await ctx.scene.enter(InfoScene.sceneName)
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