import { Markup, Scenes } from 'telegraf'
import { AbstractScene } from './abstract.scene'
import { type BaseScene } from 'telegraf/typings/scenes'
import { type IBotContext } from '../context/context.interface'
import { OrderCommand } from '../command/order.command'

export class CurrentLocation extends AbstractScene {
  public static readonly sceneName: string = 'location_scene'
  private readonly currentLocation: Scenes.BaseScene<IBotContext>

  constructor () {
    super()
    this.currentLocation = this.initialize()
  }

  getName (): string {
    return CurrentLocation.sceneName
  }

  getScene (): BaseScene<IBotContext> {
    return this.currentLocation
  }

  initialize (): Scenes.BaseScene<IBotContext> {
    const currentLocation = new Scenes.BaseScene<IBotContext>(CurrentLocation.sceneName)

    const testCommand = new OrderCommand(currentLocation)
    testCommand.handle()
    currentLocation.enter(async ctx => {
      await ctx.reply('Ваша локация')
    })
    return currentLocation
  }
}
