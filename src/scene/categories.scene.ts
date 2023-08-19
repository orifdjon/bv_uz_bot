import { type Context, Markup, Scenes } from 'telegraf'
import { AbstractScene } from './abstract.scene'
import { type BaseScene } from 'telegraf/typings/scenes'
import { type IBotContext } from '../context/context.interface'

export class CategoriesScene extends AbstractScene {
  public static readonly sceneName: string = 'categories_scene'
  private readonly categoriesScene: Scenes.BaseScene<IBotContext>

  constructor () {
    super()
    this.categoriesScene = this.initialize()
  }

  getName (): string {
    return CategoriesScene.sceneName
  }

  getScene (): BaseScene<IBotContext> {
    return this.categoriesScene
  }

  initialize (): Scenes.BaseScene<IBotContext> {
    const categoriesScene = new Scenes.BaseScene<IBotContext>(CategoriesScene.sceneName)
    categoriesScene.enter(async ctx => {
      await ctx.reply('Добро пожаловать! Выберите категорию товаров:', Markup
        .keyboard(['Категория 1', 'Категория 2'])
        .oneTime()
        .resize()
      )
    })
    categoriesScene.hears('Категория 1', (ctx: Context) => {
      const categoryProducts = ['Chanel blue', 'Versace man', 'Tiger']
      const productsText = categoryProducts.join('\n')
      void ctx.reply(`Вы выбрали Категорию 1. Вот список товаров:\n\n${productsText}`, Markup
        .inlineKeyboard([
          categoryProducts.map((product) => Markup.button.callback(product, `selectProduct:${product}`))
        ]))
    }
    )
    categoriesScene.hears('Категория 2', (ctx: Context) => {
      const categoryProducts = ['Chanel blue', 'Versace man', 'Tiger']
      const productsText = categoryProducts.join('\n')
      void ctx.reply(`Вы выбрали Категорию 1. Вот список товаров:\n\n${productsText}`, Markup
        .inlineKeyboard([
          categoryProducts.map((product) => Markup.button.callback(product, `selectProduct:${product}`))
        ]))
    })
    categoriesScene.hears('назад', (ctx: Context) => {
      void ctx.reply('Вы вернулись назад', Markup
        .keyboard(['Категория 1', 'Категория 2'])
        .oneTime()
        .resize()
      )
    })
    return categoriesScene
  }
}
