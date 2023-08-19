import { Command } from './command.class'
import { Markup } from 'telegraf'
import NodeGeocoder from 'node-geocoder'
import { getMessage } from '../utils/tg.model.utils'
import { CategoriesScene } from '../scene/categories.scene'
const backButton = Markup.button.callback('Назад', 'back_button')

export class OrderCommand extends Command {
  private currentMenu: string = 'main'
  handle (): void {
    this.bot.command('order', (ctx) => {
      void ctx.reply('Отправить геолокацию', Markup.inlineKeyboard([
        Markup.button.callback('Отправить геолокацию', 'geo'),
        Markup.button.callback('Мои адреса', 'address'),
        backButton,
        Markup.button.callback('Категории', 'categories')]
      ))
    })

    this.bot.action('geo', (ctx) => {
      void ctx.reply('Введите Ваше местоположение:', Markup.keyboard([
        Markup.button.locationRequest('Send location')
      ]).resize())
    })

    // this.bot.on('message', async (ctx, next) => {
    //   const options: NodeGeocoder.Options = {
    //     provider: 'google'
    //   }
    //   console.log('AIUDHQIUWHDQWIUHQWIUHQWUIHIUQWH ', getMessage(ctx).location)
    //   await NodeGeocoder(options)
    //     .reverse({
    //       lat: getMessage(ctx).location.latitude,
    //       lon: getMessage(ctx).location.longitude
    //     // eslint-disable-next-line @typescript-eslint/no-misused-promises
    //     }, async (err, data) => {
    //       if (err != null) {
    //       // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    //         return await ctx.reply(`Ошибка геокодирования: ${err}`)
    //       }
    //       const address = data[0].formattedAddress
    //       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //       // @ts-expect-error
    //       return await ctx.sendMessage(address)
    //     })
    //   void next()
    // })

    this.bot.action('address', (ctx) => {
      this.currentMenu = 'address'
      void ctx.editMessageText('Список ваших адресов')
    })

    this.bot.action('back_button', (ctx) => {
      if (this.currentMenu === 'main') {
        void ctx.editMessageText('Вы уже находитесь в главном меню')
      } else if (this.currentMenu === 'address') {
        this.currentMenu = 'main'
        void ctx.editMessageText('Возвращаемся в главное меню')
      }
    })

    this.bot.action('categories', async ctx => {
      console.log("ASDASDASDASDASDASDASDA")
      await ctx.scene.enter(CategoriesScene.sceneName)
    })
  }
}
