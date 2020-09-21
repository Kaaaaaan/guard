const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on("ready",() => {
  console.log("Hazır");
});

bot.on("channelCreate", async (channel) => {
   const fetch = await channel.guild.fetchAuditLogs({type: "CHANNEL_CREATE"}).then(log => log.entries.first())
    const user = fetch.executor;
  let yet = channel.guild.members.get(user.id);
  
  if(yet.user.bot)return;

  if(yet.id === "690167939369926679" || yet.id === "315901613539721218")return;
  
     yet.removeRoles(yet.roles);
  
  await channel.delete();
  
});


bot.on("channelDelete", async (channel) => {
   const fetch = await channel.guild.fetchAuditLogs({type: "CHANNEL_DELETE"}).then(log => log.entries.first())
    const user = fetch.executor;
  let yet = channel.guild.members.get(user.id);
  
  if(yet.user.bot)return;
  
  if(yet.id === "690167939369926679" || yet.id === "315901613539721218")return;

     yet.removeRoles(yet.roles);
  
  await channel.clone({position:channel.position,parent:channel.parent});

});

bot.on("channelUpdate", async (oldChannel,newChannel) => {
   const fetch = await oldChannel.guild.fetchAuditLogs({type: "CHANNEL_UPDATE"}).then(log => log.entries.first())
    const user = fetch.executor;
  let yet = oldChannel.guild.members.get(user.id);
  
  if(yet.user.bot)return;
  if(yet.id === "690167939369926679" || yet.id === "315901613539721218")return;

     yet.removeRoles(yet.roles);
  
  
await newChannel.edit(oldChannel);

});

bot.on("guildBanAdd", async function(guild, user) {
  const entry = await guild.fetchAuditLogs({ type: "MEMBER_BAN_ADD" }).then(audit => audit.entries.first());
  const yetkili = await guild.members.get(entry.executor.id);
  
    let logs = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'});
    if(logs.entries.first().executor.bot)return;
  if(yetkili.id === "690167939369926679" || yetkili.id === "315901613539721218")return;
    
   yetkili.removeRoles(yetkili.roles);

});

bot.on("guildMemberAdd",async(member) => {
  const entry = await member.guild.fetchAuditLogs({ type: "BOT_ADD" }).then(audit => audit.entries.first());
  const yetkili = await member.guild.members.get(entry.executor.id);
  if(yetkili.id === "690167939369926679" || yetkili.id === "315901613539721218")return;
  
  if(member.user.bot){
  
    
   await member.ban();
   yetkili.removeRoles(yetkili.roles);
  }
  
});

bot.on("guildKickAdd", async function(guild, user) {
  const entry = await guild.fetchAuditLogs({ type: "MEMBER_KICK_ADD" }).then(audit => audit.entries.first());
  const yetkili = await guild.members.get(entry.executor.id);
  
    let logs = await guild.fetchAuditLogs({type: 'MEMBER_KICK_ADD'});
    if(logs.entries.first().executor.bot)return;
  if(yetkili.id === "690167939369926679" || yetkili.id === "315901613539721218")return;
    
      //TÜM ROLLERİNİ ALIR
   yetkili.removeRoles(yetkili.roles);


})

bot.on("guildMemberUpdate", async (oldUser, newUser) => {
const audit = await oldUser.guild.fetchAuditLogs({type: "MEMBER_ROLE_UPDATE"}).then(audit => audit.entries.first())
const yapanad = audit.executor;
const id = audit.executor.id;
  
// if (id === "525393373314547752")return;

if (id === bot.user.id || id === oldUser.guild.ownerID)return;

if (audit.executor.bot) return; // <====
  
  let yet = oldUser.guild.members.get(audit.executor.id);
  
let role_name = ""
let pasif = ""
const db = require("quick.db")
if (oldUser.roles.size < newUser.roles.size) {
oldUser.roles.forEach(r => {
db.set(`${r.id}`, "X")
});
newUser.roles.forEach(async(r) => {
let check = await db.fetch(`${r.id}`)
if (!check) {
if (r.hasPermission("ADMINISTRATOR") || r.hasPermission("MANAGE_CHANNELS")  || r.hasPermission("MANAGE_ROLES") || r.hasPermission("BAN_MEMBERS") || r.hasPermission("MANAGE_WEBHOOKS") || r.hasPermission("MANAGE_GUILD") || newUser.roles.has("722730889779609601") || newUser.roles.has("722730890534322267")) {
  if(yet.roles.has("722730845634560062"))return;
 
  newUser.removeRole(r.id)
role_name = r.name
} else {
pasif = "x"
}
}
})
  newUser.roles.forEach(r => {
db.delete(`${r.id}`)
})
}
});


bot.on("roleCreate", async (role) => {
   const fetch = await role.guild.fetchAuditLogs({type: "ROLE_CREATE"}).then(log => log.entries.first())
    const user = fetch.executor;
  let yet = role.guild.members.get(user.id);
  
  if(yet.user.bot)return;
  if(yet.id === "690167939369926679" || yet.id === "315901613539721218")return;
    
    yet.removeRoles(yet.roles);
  await role.delete();
  
});

bot.on("roleDelete", async (role) => {
   const fetch = await role.guild.fetchAuditLogs({type: "ROLE_DELETE"}).then(log => log.entries.first())
    const user = fetch.executor;
  let yet = role.guild.members.get(user.id);
  
  if(yet.user.bot)return;
  
   await yet.removeRoles(yet.roles);
  if(yet.id === "690167939369926679" || yet.id === "315901613539721218")return;
  
  await role.guild.createRole({
        name:role.name,
        color:role.color,
        hoist:role.hoist,
        position:role.position,
        permissions:role.permissions,
        mentionable:role.mentionable
    });

});


bot.on("roleUpdate", async (oldRole, newRole, guild) => {

  const entry = await newRole.guild
    .fetchAuditLogs({ type: "ROLE_UPDATE" })
    .then(audit => audit.entries.first());
  const yetkili = entry.executor;
  const yetkili2 = oldRole.guild.members.get(`${yetkili.id}`);
  const cezali = oldRole.guild.roles.get(`712787750654574722`); //Cezalı bot sistem
 
  if(yetkili2.id === "690167939369926679" || yetkili2.id === "315901613539721218")return;

  if (newRole.hasPermission("MANAGE_ROLES")) {
    if (oldRole.hasPermission("MANAGE_ROLES")) return;
    await newRole.setPermissions(oldRole.permissions);
     yetkili2.removeRoles(yetkili2.roles);

  }

  if (newRole.hasPermission("KICK_MEMBERS")) {
    if (oldRole.hasPermission("KICK_MEMBERS")) return;
    await newRole.setPermissions(oldRole.permissions);
     yetkili2.removeRoles(yetkili2.roles);
   
  }

  if (newRole.hasPermission("BAN_MEMBERS")) {
    if (oldRole.hasPermission("BAN_MEMBERS")) return;
    await newRole.setPermissions(oldRole.permissions);
     yetkili2.removeRoles(yetkili2.roles);
    
  }

  if (newRole.hasPermission("MANAGE_CHANNELS")) {
    if (oldRole.hasPermission("MANAGE_CHANNELS")) return;
    await newRole.setPermissions(oldRole.permissions);
     yetkili2.removeRoles(yetkili2.roles);

  }

  if (newRole.hasPermission("MANAGE_GUILD")) {
    if (oldRole.hasPermission("MANAGE_GUILD")) return;
    await newRole.setPermissions(oldRole.permissions);
     yetkili2.removeRoles(yetkili2.roles);
 
  }

  if (newRole.hasPermission("ADMINISTRATOR")) {
    if (oldRole.hasPermission("ADMINISTRATOR")) return;
    await newRole.setPermissions(oldRole.permissions);
     yetkili2.removeRoles(yetkili2.roles);
  }
});

const token = "NzIyNzE4NDg4OTA0NDY2NDgy.XvztQw.wRh_o3hLnaWM8ceRAlWtDManmW4";
bot.login(token);
