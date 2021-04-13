export function playerReady(player, playlist) {
  player.on('ready', function () {
    player.loadVideo(playlist[0])
  })
}

export function playerNext(player, playlist) {
  player.on('ended', function () {
    player.loadVideo('502240119')
  })
}
