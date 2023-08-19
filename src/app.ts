import { ConfigService } from './config/config.service'
import { type IConfigService } from './config/config.interface'
import LocalSession from 'telegraf-session-local'
import { Telegraf, Scenes } from 'telegraf'
import { type IBotContext } from './context/context.interface'
import { type Command } from './command/command.class'
import { StartCommand } from './command/start.command'
import { AuthWizard } from './scene/auth.wizard'
import { BasketCommand } from './command/basket.command'
import { OrderCommand } from './command/order.command'
import { AccountCommand } from './command/account.command'
import { FeedbackCommand } from './command/feedback.command'
import { InfoScene } from './scene/info.scene'
import { FeedbackScene } from './scene/feedbackScene'
import { CurrentLocation } from './scene/current.location.scene'
import { type AbstractScene } from './scene/abstract.scene'
import { CategoriesScene } from './scene/categories.scene'

class Bot {
  bot: Telegraf<IBotContext>
  commands: Command[] = []

  constructor (private readonly configService: IConfigService) {
    this.bot = new Telegraf<IBotContext>(this.configService.get('TOKEN'))
    this.bot.use(new LocalSession({ database: 'sessions.json' })).middleware()
  }

  init (): void {
    const categoriesScene: AbstractScene = new CategoriesScene()
    const authWizard: AbstractScene = new AuthWizard()
    const infoScene: AbstractScene = new InfoScene()
    const newFeedBackScene: AbstractScene = new FeedbackScene()
    const currentLocationScene = new CurrentLocation()
    const stage = new Scenes.Stage<IBotContext>([
      categoriesScene.getScene(),
      authWizard.getScene(),
      infoScene.getScene(),
      newFeedBackScene.getScene(),
      currentLocationScene.getScene()
    ])
    this.bot.use(stage).middleware()
    this.commands = [
      new StartCommand(this.bot),
      new BasketCommand(this.bot),
      new OrderCommand(this.bot),
      new AccountCommand(this.bot),
      new FeedbackCommand(this.bot)
    ]
    for (const command of this.commands) {
      command.handle()
    }

    void this.bot.launch().then(r => {
      console.log('Service is started')
    })

    process.once('SIGINT', () => { this.bot.stop('SIGINT') })
    process.once('SIGTERM', () => { this.bot.stop('SIGTERM') })
  }
}

const bot = new Bot(new ConfigService())
bot.init()
