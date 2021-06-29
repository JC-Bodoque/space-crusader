controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
	
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(assets.image`shoot`, thePlayer, 0, -50)
})
function setEnviromentMusic () {
    while (true) {
        music.playMelody("E B C5 A B G A F ", 90)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    thePlayer.destroy()
})
let asteroid: Sprite = null
let theEnemy: Sprite = null
let projectile: Sprite = null
let thePlayer: Sprite = null
scene.setBackgroundImage(assets.image`bg`)
effects.starField.startScreenEffect()
thePlayer = sprites.create(assets.image`player_sprite_0`, SpriteKind.Player)
controller.moveSprite(thePlayer)
thePlayer.setStayInScreen(true)
info.setLife(5)
info.setScore(0)
setEnviromentMusic()
game.onUpdate(function () {
    theEnemy = sprites.create(assets.image`sprite_enemy_0`, SpriteKind.Enemy)
    asteroid = sprites.create(assets.image`asteroid_sprite_0`, SpriteKind.Player)
    asteroid.x = randint(10, scene.screenWidth() - 10)
    asteroid.y = scene.screenHeight()
    asteroid.setVelocity(0, 50)
})
game.onUpdateInterval(500, function () {
    theEnemy = sprites.create(assets.image`sprite_enemy_0`, SpriteKind.Enemy)
    asteroid = sprites.create(assets.image`asteroid_sprite_0`, SpriteKind.Player)
    asteroid.x = randint(10, scene.screenWidth() - 10)
    asteroid.y = scene.screenHeight()
    asteroid.setVelocity(0, 50)
})
