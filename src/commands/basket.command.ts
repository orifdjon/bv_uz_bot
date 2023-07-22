import { Command } from './command.class'

export class BasketCommand extends Command {

  handle (): void {
    this.bot.command('basket', (ctx) => {
      void ctx.reply('Это корзина')
    })
  }
}
