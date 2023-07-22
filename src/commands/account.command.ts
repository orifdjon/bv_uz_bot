import { Command } from './command.class'

export class AccountCommand extends Command {

  handle (): void {
    this.bot.command('account', (ctx) => {
      void ctx.reply('Ваш аккаунт')
    })
  }
}
