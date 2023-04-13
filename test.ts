import {log, ScanStatus, WechatyBuilder} from "wechaty";
import {PuppetPadlocal} from "wechaty-puppet-padlocal";
import {dingDongBot, getMessagePayload, LOGPRE} from "./helper";
import { FileBox }  from 'file-box'

// qr码
const Qrterminal = require("qrcode-terminal")

// 插件 WechatyRoomWelcome
const WechatyRoomWelcome = require("./channel/room_join")

/****************************************
 * 去掉注释，可以完全打开调试日志
 ****************************************/
// log.level("silly");

const puppet = new PuppetPadlocal({
    token: "44e228f1ba1f49d08dcceb45b276ee21"
})

const bot = WechatyBuilder.build({
  name: "PadLocalDemo",
  puppet,
})

const options = {
  reply: [
    {
      name: "Web圈0x01",
      roomId: "47596267661@chatroom",
      reply: `\n 你好，欢迎你的加入，请自觉遵守群规则，文明交流，最后，请向大家介绍你自己！ \n\n Hello, welcome to join, please consciously abide by the group rules, civilized communication, finally, please introduce yourself to everyone！😊`,
    },
    // {
    //   name: "Web圈0x02",
    //   roomId: "22825376327@chatroom",
    //   reply: `\n 你好，欢迎你的加入，请自觉遵守群规则，文明交流，最后，请向大家介绍你自己！ \n\n Hello, welcome to join, please consciously abide by the group rules, civilized communication, finally, please introduce yourself to everyone！😊`,
    // },
    // {
    //   name: "每日算法",
    //   roomId: "21705489152@chatroom",
    //   reply: `\n 你好，欢迎你的加入，请自觉遵守群规则，文明交流，最后，请向大家介绍你自己！ \n\n Hello, welcome to join, please consciously abide by the group rules, civilized communication, finally, please introduce yourself to everyone！😊`,
    // },
    // {
    //   name: "微信机器人",
    //   roomId: "24661539197@chatroom",
    //   reply: `\n 你好，欢迎你的加入，请自觉遵守群规则，文明交流，最后，请向大家介绍你自己！ \n\n Hello, welcome to join, please consciously abide by the group rules, civilized communication, finally, please introduce yourself to everyone！😊`,
    // },
    // {
    //   name: "男神开门群",
    //   roomId: "22275855499@chatroom",
    //   reply: "男神你好，欢迎加入",
    // },
  ],
}

// 使用插件
bot.use(WechatyRoomWelcome(options))

bot
  .on("scan", (qrcode, status) => {
    Qrterminal.generate(qrcode, { small: true })
  })
  .start()

// bot
//   .on("scan", (qrcode, status) => {
//     if (status === ScanStatus.Waiting && qrcode) {
//       const qrcodeImageUrl = [
//         'https://wechaty.js.org/qrcode/',
//         encodeURIComponent(qrcode),
//       ].join('')

//       log.info(LOGPRE, `onScan: ${ScanStatus[status]}(${status})`);

//       console.log("\n==================================================================");
//       console.log("\n* Two ways to sign on with qr code");
//       console.log("\n1. Scan following QR code:\n");

//       require('qrcode-terminal').generate(qrcode, {small: true})  // show qrcode on console

//       console.log(`\n2. Or open the link in your browser: ${qrcodeImageUrl}`);
//       console.log("\n==================================================================\n");
//     } else {
//       log.info(LOGPRE, `onScan: ${ScanStatus[status]}(${status})`);
//     }
//   })

//   .on("login", (user) => {
//     log.info(LOGPRE, `${user} login`);
//   })

//   .on("logout", (user, reason) => {
//     log.info(LOGPRE, `${user} logout, reason: ${reason}`);
//   })

//   .on("message", async (message) => {
//     log.info(LOGPRE, `on message: ${message.toString()}`);

//     log.info(LOGPRE, `hahah: ${message.room()?.id}`);
    
//     if (await message.mentionSelf()) {
//       await message.say(`听到你们有人想我，喵`)
//     }

//     await getMessagePayload(message);

//     await dingDongBot(message);
//   })

//   .on("room-invite", async (roomInvitation) => {
//     log.info(LOGPRE, `on room-invite: ${roomInvitation}`);
//   })

//   .on("room-join", async (room, inviteeList, inviter, date) => {
//     log.info(LOGPRE, `on room-join, room:${room}, inviteeList:${inviteeList}, inviter:${inviter}, date:${date}`);

//     await room.say('新人进群，自主分享主页（不要截图）、改群昵称、看群规。群昵称格式：昵称-性别-出生年份!', ...inviteeList)

//     // 图片大小建议不要超过 2 M
//     const imageFilePath = "/Users/mugbya/git/other/wechaty-puppet-padlocal-demo/qingteng-welcome.jpeg";
//     await room.say(FileBox.fromFile(imageFilePath));

//   })

//   .on("room-leave", (room, leaverList, remover, date) => {
//     log.info(LOGPRE, `on room-leave, room:${room}, leaverList:${leaverList}, remover:${remover}, date:${date}`);
//   })

//   .on("room-topic", (room, newTopic, oldTopic, changer, date) => {
//     log.info(LOGPRE, `on room-topic, room:${room}, newTopic:${newTopic}, oldTopic:${oldTopic}, changer:${changer}, date:${date}`);
//   })

//   .on("friendship", (friendship) => {
//     log.info(LOGPRE, `on friendship: ${friendship}`);
//   })

//   .on("error", (error) => {
//     log.error(LOGPRE, `on error: ${error}`);
//   })

// bot.start().then(() => {
//   log.info(LOGPRE, "started.");
// });
