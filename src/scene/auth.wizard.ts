import { WizardClass } from './wizard.class'
import { Scenes } from 'telegraf'
import { type IBotContext } from '../context/context.interface'
import { getMessage } from '../utils/tg.model.utils'

export class AuthWizard extends WizardClass {
  public readonly name: string = 'auth_wizard'
  private readonly wizardScene: Scenes.WizardScene<IBotContext>

  constructor () {
    super()
    this.wizardScene = this.initialize()
  }

  getName (): string {
    return this.name
  }

  getWizard (): Scenes.WizardScene<IBotContext> {
    return this.wizardScene
  }

  initialize (): Scenes.WizardScene<IBotContext> {
    // Step 1 - Ask for first name
    return new Scenes.WizardScene<IBotContext>(this.name, async (ctx) => {
      await ctx.reply('Введите свое имя?')
      return ctx.wizard.next()
    },
    // Step 2 - Ask for second name
    async (ctx) => {
      ctx.scene.session.firstName = getMessage(ctx).text
      await ctx.reply('Введите свою фамилию?')
      console.log('CTX >', ctx)
      return ctx.wizard.next()
    },
    // Step 3 - Ask for phone number
    async (ctx) => {
      ctx.scene.session.secondName = getMessage(ctx).text
      await ctx.reply('Введите свой номер телефона?')
      console.log('CTX >', ctx)
      return ctx.wizard.next()
    },
    // Step 4 - Ask for city
    async (ctx) => {
      ctx.scene.session.city = getMessage(ctx).text
      await ctx.reply('Введите свой город?')
      console.log('CTX >', ctx)
      return ctx.wizard.next()
    },
    // Step 5 - Ask for sex
    async (ctx) => {
      ctx.scene.session.sex = getMessage(ctx).text
      await ctx.reply('Введите свой пол?')
      console.log('CTX >', ctx.scene.session)
      await ctx.scene.leave()
    })
  }
}
