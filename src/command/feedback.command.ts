import { Command } from './command.class'
import { Markup } from 'telegraf'
import { FeedbackScene } from '../scene/feedback.scene'

export class FeedbackCommand extends Command {
  handle (): void {
    this.bot.command('feedback', (ctx) => {
      void ctx.reply('Отзывы', Markup.inlineKeyboard([
        Markup.button.callback('Оставьте отзыв', 'new_feedback'),
        Markup.button.callback('Ваши предыдущие отзывы', 'old_feedback')
      ]))
    })
    this.bot.action('new_feedback', async ctx => {
      await ctx.scene.enter(FeedbackScene.sceneName)
    })
  }
}
