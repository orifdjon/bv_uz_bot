import { type PropOr } from 'telegraf/typings/deunionize'
import { type Context, type Scenes } from 'telegraf'

export interface AuthWizardSession extends Scenes.WizardSessionData {
  firstName?: string
  secondName?: string
  phoneNumber?: string
  city?: string
  sex?: string
}

export interface BotSession extends Scenes.WizardSession<AuthWizardSession> {
  courseLike: boolean

}

export interface IBotContext extends Context {
  session: BotSession
  scene: Scenes.SceneContextScene<IBotContext, AuthWizardSession>
  wizard: Scenes.WizardContextWizard<IBotContext>
}

export interface IMessage extends PropOr<any, 'message'> {
  text?: string
}
