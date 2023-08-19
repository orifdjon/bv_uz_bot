import { Scenes } from 'telegraf'
import { AbstractScene } from './abstract.scene'
import { type BaseScene } from 'telegraf/typings/scenes'
import { type IBotContext } from '../context/context.interface'
import { message } from 'telegraf/filters'
import { FeedbackCommand } from '../command/feedback.command'
import { getMessage } from '../utils/tg.model.utils'

export class FeedbackScene extends AbstractScene {
  public static readonly sceneName: string = 'new_feedback_scene'
  private readonly newFbScene: Scenes.BaseScene<IBotContext>

  constructor () {
    super()
    this.newFbScene = this.initialize()
  }

  getName (): string {
    return FeedbackScene.sceneName
  }

  getScene (): BaseScene<IBotContext> {
    return this.newFbScene
  }

  initialize (): Scenes.BaseScene<IBotContext> {
    const newFbScene = new Scenes.BaseScene<IBotContext>(FeedbackScene.sceneName)

    newFbScene.command('back', async ctx => {
      await ctx.scene.leave()
    })
    newFbScene.enter(async ctx => {
      await ctx.reply('Пожалуйста оставьте свое мнение о продукте')
    })
    newFbScene.leave(async ctx => {
      await ctx.reply('Спасибо за отзыв')
    })
    newFbScene.on(message('text'), async (ctx, next) => {
      await ctx.reply('AAA-AAA' + getMessage(ctx).text)
      void next()
    })

    return newFbScene
  }
}
