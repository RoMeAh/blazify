import {Command} from "discord-akairo";
import {Message , TextChannel} from "discord.js";

import {Repository} from "typeorm";
import {Giveaways} from "../../../Lib/Database/Models/Giveaways";
import {GiveawayManager} from "../../../Lib/Structures/GiveawayManager"

export default class GiveawayDelete extends Command{
    public constructor() {
        super ("giveaway-delete" , {
            aliases: ["gd" , "delete-giveaway"] ,
            category: "Utility" ,
            description: {
                content: "Edits a Giveaway" ,
                usage: "<<gd [ msg id ]" ,
                examples: [
                    "<<gd 531531234545410"
                ]
            } ,
            ratelimit: 3 ,
            args: [
                {
                    id: "msg" ,
                    type: async (message : Message , str : string) => {
                        // @ts-ignore
                        return await (message.guild.channels.cache.get (message.channel.id) as TextChannel).messages.fetch ((str) , true)
                            .catch (() => null);
                    } ,
                    prompt: {
                        start: (msg : Message) => `${msg.author}, you must provide a message!` ,
                        retry: (msg : Message) => `${msg.author}, you must provide a valid message!(Hint: This command should be used in the channel in which the giveaway is present)`
                    }
                }
            ]
        });
    }

    public async exec(_message : Message , {msg} : { msg : Message }) : Promise<any> {
        const giveawayRepo : Repository<Giveaways> = this.client.db.getRepository (Giveaways);
        setTimeout (() => {
            GiveawayManager.delete (giveawayRepo , msg)
        } , 1)
    }
};