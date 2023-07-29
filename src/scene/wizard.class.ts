import { type IBotContext } from '../context/context.interface'
import { type Scenes } from 'telegraf'

export abstract class WizardClass {
  abstract getName (): string

  abstract getWizard (): Scenes.WizardScene<IBotContext>
}
