import { Command } from './command.class'
import { AuthWizard } from '../scene/auth.wizard'
import { Scenes } from 'telegraf'

export class StartCommand extends Command {
  handle (): void {
    this.bot.start((ctx) => {
      Scenes.Stage.enter(AuthWizard.name)
    })

    this.bot.action('course_like', (ctx) => {
      ctx.session.courseLike = true
      void ctx.editMessageText('🎉 Круто!')
    })

    this.bot.action('course_dislike', (ctx) => {
      ctx.session.courseLike = false
      void ctx.editMessageText('😒')
    })
  }
}
