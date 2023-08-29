import { ConfigService } from './config/config.service'
import { type IConfigService } from './config/config.interface'
import LocalSession from 'telegraf-session-local'
import { Scenes, Telegraf } from 'telegraf'
import { type IBotContext } from './context/context.interface'
import { type Command } from './command/command.class'
import { StartCommand } from './command/start.command'
import { AuthWizard } from './scene/auth.wizard'
import { BasketCommand } from './command/basket.command'
import { OrderCommand } from './command/order.command'
import { AccountCommand } from './command/account.command'
import { FeedbackCommand } from './command/feedback.command'
import { InfoScene } from './scene/info.scene'
import { FeedbackScene } from './scene/feedback.scene'
import { CurrentLocation } from './scene/current.location.scene'
import { CategoriesScene } from './scene/categories.scene'
import { type BaseScene } from 'telegraf/typings/scenes'
import { type Grade, type User } from './model/entity'
import { knex, type Knex } from 'knex'
import { config } from '../knexfile'

class Bot {
  bot: Telegraf<IBotContext>
  commands: Command[] = []

  constructor (private readonly configService: IConfigService) {
    this.bot = new Telegraf<IBotContext>(this.configService.get('TOKEN'))
    this.bot.use(new LocalSession({ database: 'sessions.json' })).middleware()
  }

  async init (): Promise<void> {
    console.log('Config ', config)
    const connection = knex(config.staging)
    try {
      const stage = new Scenes.Stage<IBotContext>(this.getScenes())
      this.bot.use(stage).middleware()
      this.commands = this.getCommands()

      for (const command of this.commands) {
        command.handle()
      }

      void this.bot.launch().then(r => {
        console.log('Service is started')
      })

      process.once('SIGINT', () => {
        this.bot.stop('SIGINT')
      })
      process.once('SIGTERM', () => {
        this.bot.stop('SIGTERM')
      })
    } catch (error) {
      console.error('Error executing queries', error)
    } finally {
      await connection.destroy()
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async insertGrade (knex: Knex, grade: Grade) {
    await knex('grade').insert(grade)
  }

  async getUsersWithGradeId (knex: Knex, gradeId: string): Promise<User[]> {
    return await knex('user').where('grade_id', gradeId)
  }

  async updateProductPrice (knex: Knex, productId: string, newPrice: number): Promise<void> {
    await knex('product').where('id', productId).update({ price: newPrice })
  }

  private getScenes (): ReadonlyArray<BaseScene<IBotContext>> {
    return [
      new CategoriesScene().getScene(),
      new AuthWizard().getScene(),
      new InfoScene().getScene(),
      new FeedbackScene().getScene(),
      new CurrentLocation().getScene()
    ]
  }

  private getCommands (): Command[] {
    return [
      new StartCommand(this.bot),
      new BasketCommand(this.bot),
      new OrderCommand(this.bot),
      new AccountCommand(this.bot),
      new FeedbackCommand(this.bot)
    ]
  }
}

const bot = new Bot(new ConfigService())
void bot.init()
