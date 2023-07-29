import { ConfigService } from './config/config.service'
import { type IConfigService } from './config/config.interface'
import LocalSession from 'telegraf-session-local'
import { Telegraf, Scenes } from 'telegraf'
import { type IBotContext } from './context/context.interface'
import { type Command } from './command/command.class'
import { StartCommand } from './command/start.command'
import { AuthWizard } from './scene/auth.wizard'

class Bot {
  bot: Telegraf<IBotContext>
  commands: Command[] = []

  constructor (private readonly configService: IConfigService) {
    this.bot = new Telegraf<IBotContext>(this.configService.get('TOKEN'))
    this.bot.use(new LocalSession({ database: 'sessions.json' })).middleware()
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  init () {
    this.commands = [
      new StartCommand(this.bot)
    ]
    for (const command of this.commands) {
      command.handle()
    }
    const authWizard = new AuthWizard()
    const stage =
      new Scenes.Stage<IBotContext>([authWizard.getWizard()])
    this.bot.use(stage).middleware()
    this.bot.command('auth', async (ctx) => {
      console.log('Entering wizard scenes')
      await ctx.scene.enter(authWizard.getName())
    })
    void this.bot.launch().then(r => {
      console.log('Service is started')
    })

    process.once('SIGINT', () => { this.bot.stop('SIGINT') })
    process.once('SIGTERM', () => { this.bot.stop('SIGTERM') })
  }
}

const bot = new Bot(new ConfigService())
bot.init()
