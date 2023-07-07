import {ConfigService} from "./config/config.service";
import {IConfigService} from "./config/config.interface";
import LocalSession from "telegraf-session-local"
import {Telegraf} from "telegraf";
import {IBotContext} from "./context/context.interface";
import {Command} from "./commands/command.class";
import {StartCommand} from "./commands/start.command";

class Bot {

    bot: Telegraf<IBotContext>;
    commands: Command[] = [];

    constructor(private readonly configService: IConfigService) {
        this.bot = new Telegraf<IBotContext>(this.configService.get("TOKEN"));
        this.bot.use(new LocalSession({database: "sessions.json"})).middleware();
    }

    init() {
        this.commands = [new StartCommand(this.bot)]
        for (const command of this.commands) {
            command.handle()
        }
        this.bot.launch().then(r => console.log("Service is started"));
    }
}

const bot = new Bot(new ConfigService());
bot.init();
