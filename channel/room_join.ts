const DEFAULT_CONFIG = {
    reply: "你好，欢迎你的加入!",
  }
  
  export async function WechatyRoomWelcome(config = {}) {
    config = Object.assign({}, DEFAULT_CONFIG, config)
  
    return (bot) => {
      bot.on("room-join", async (room, inviteeList, inviter) => {
        if (!config.reply) return
  
        if (typeof config.reply === "string")
          inviteeList.map((c) => room.say(config.reply, c))
  
        if (Array.isArray(config.reply)) {
          config.reply.map((item) => {
            if (item.roomId == room.id) {
              inviteeList.map((c) => {
                room.say(item.reply, c)
              })
            }
          })
        }
      })
    }
  }