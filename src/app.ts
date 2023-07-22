import { ConfigService } from './config/config.service'
import { type IConfigService } from './config/config.interface'
import LocalSession from 'telegraf-session-local'
import { Telegraf } from 'telegraf'
import { type IBotContext } from './context/context.interface'
import { type Command } from './commands/command.class'
import { StartCommand } from './commands/start.command'
import { BasketCommand } from './commands/basket.command'
import { OrderCommand } from './commands/order.command'
import { AccountCommand } from './commands/account.command'
import { FeedbackCommand } from './commands/feedback.command'

class Bot {
  bot: Telegraf<IBotContext>
  commands: Command[] = []

  constructor (private readonly configService: IConfigService) {
    this.bot = new Telegraf<IBotContext>(this.configService.get('TOKEN'))
    this.bot.use(new LocalSession({ database: 'sessions.json' })).middleware()
  }

  init (): void {
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
    void this.bot.launch().then(() => {
      console.log('Service is started')
    })
  }
}

const bot = new Bot(new ConfigService())
bot.init()
