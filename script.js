// Replace these two placeholders before publishing.
const SERVER_IP = 'polaris.serv.gs';
const DISCORD_INVITE = 'https://discord.gg/sVRzS32jFM';

const ipElement = document.getElementById('server-address');
const copyButton = document.getElementById('copy-ip');
const statusElement = document.getElementById('copy-status');
const discordLink = document.getElementById('discord-link');
const validIP = SERVER_IP !== 'YOUR.SERVER.IP' && SERVER_IP.trim() !== '';
const validDiscord = !DISCORD_INVITE.includes('YOUR-INVITE');
ipElement.textContent = SERVER_IP;
if (!validIP) { copyButton.disabled = true; copyButton.textContent = 'COMING SOON'; }
if (validDiscord) {
  discordLink.href = DISCORD_INVITE;
  discordLink.target = '_blank';
  discordLink.rel = 'noopener noreferrer';
}
copyButton.addEventListener('click', async () => {
  if (!validIP) return;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(SERVER_IP);
    } else {
      const field = document.createElement('textarea');
      field.value = SERVER_IP;
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      if (!document.execCommand('copy')) throw new Error('Copy failed');
      field.remove();
    }
    copyButton.textContent = 'COPIED!';
    statusElement.textContent = 'Server address copied. Paste it into Minecraft Multiplayer!';
  } catch {
    statusElement.textContent = 'Copy unavailable. Select the server address above and copy it manually.';
  }
});
