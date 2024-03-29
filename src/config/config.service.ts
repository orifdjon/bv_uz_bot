import { config, type DotenvParseOutput } from 'dotenv'
import { type IConfigService } from './config.interface'

export class ConfigService implements IConfigService {
  private readonly config: DotenvParseOutput

  constructor () {
    const { error, parsed } = config()
    if (error != null) {
      throw new Error('Не найден файл .env')
    }
    if (parsed == null) {
      throw new Error('Пустой файл .env')
    }
    this.config = parsed
  }

  get (key: string): string {
    const res = this.config[key]
    if (res === '') {
      throw new Error('Нет такого ключа')
    }
    return res
  }
}
