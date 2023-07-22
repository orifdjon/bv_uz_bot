import { Command } from './command.class'

export class OrderCommand extends Command {
  handle (): void {
    this.bot.command('order', (ctx) => {
      void ctx.reply('Заказ')
    })
  }
}
