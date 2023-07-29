import { Command } from './command.class'

export class FeedbackCommand extends Command {

  handle (): void {
    this.bot.command('feedback', (ctx) => {
      void ctx.reply('Ваши отзывы')
    })
  }
}
