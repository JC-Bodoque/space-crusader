controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
	
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
	
})
scene.setBackgroundImage(assets.image`bg`)
effects.starField.startScreenEffect()
let thePlayer = sprites.create(assets.image`player_sprite_0`, SpriteKind.Player)
let theEnemy = sprites.create(assets.image`sprite_enemy_0`, SpriteKind.Player)
thePlayer.setStayInScreen(true)
controller.moveSprite(thePlayer, 100, 100)
while (true) {
    music.playMelody("E B C5 A B G A F ", 90)
}