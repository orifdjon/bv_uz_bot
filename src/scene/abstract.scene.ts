import { type IBotContext } from '../context/context.interface'
import { type Scenes } from 'telegraf'

export abstract class AbstractScene {
  abstract getName (): string

  abstract getScene (): Scenes.BaseScene<IBotContext>
}
