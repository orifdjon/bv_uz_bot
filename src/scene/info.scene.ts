import { Scenes } from 'telegraf'
import { AbstractScene } from './abstract.scene'
import { type BaseScene } from 'telegraf/typings/scenes'
import { type IBotContext } from '../context/context.interface'
import { message } from 'telegraf/filters'
import { getMessage } from '../utils/tg.model.utils'

export class InfoScene extends AbstractScene {
  public static readonly sceneName: string = 'info_scene'
  private readonly infoScene: Scenes.BaseScene<IBotContext>

  constructor () {
    super()
    this.infoScene = this.initialize()
  }

  getName (): string {
    return InfoScene.sceneName
  }

  getScene (): BaseScene<IBotContext> {
    return this.infoScene
  }

  initialize (): Scenes.BaseScene<IBotContext> {
    const infoScene = new Scenes.BaseScene<IBotContext>(InfoScene.sceneName)
    infoScene.command('back', async ctx => {
      await ctx.scene.leave()
    })
    infoScene.enter(async ctx => {
      await ctx.reply('Пожалуйста введите дп даныне')
    })
    infoScene.leave(async ctx => {
      await ctx.reply('Спасибо за дп данные')
    })
    infoScene.on(message('text'), async (ctx, next) => {
      await ctx.reply('AAA-AAA' + getMessage(ctx).text)
      void next()
    })
    return infoScene
  }
}
