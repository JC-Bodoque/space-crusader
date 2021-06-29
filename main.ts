controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
	
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(assets.image`shoot`, thePlayer, 0, -50)
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    status.spriteAttachedTo().destroy(effects.disintegrate, 500)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    info.changeScoreBy(1)
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -25
})
function setEnviromentMusic () {
    while (true) {
        music.playMelody("E B C5 A B G A F ", 90)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.disintegrate, 500)
    scene.cameraShake(0, 0)
    if (info.life() == 0) {
        thePlayer.destroy(effects.disintegrate, 500)
    }
})
let statusbar: StatusBarSprite = null
let theEnemy: Sprite = null
let projectile: Sprite = null
let thePlayer: Sprite = null
let asteroid = null
// scene.setBackgroundImage(assets.image`bg`)
effects.starField.startScreenEffect()
thePlayer = sprites.create(assets.image`player_sprite_0`, SpriteKind.Player)
controller.moveSprite(thePlayer)
thePlayer.setStayInScreen(true)
info.setLife(5)
info.setScore(0)
// setEnviromentMusic()
// statusbar.setBarSize(20, 4)
game.onUpdateInterval(500, function () {
    theEnemy = sprites.create(assets.image`sprite_enemy_0`, SpriteKind.Enemy)
    theEnemy.x = randint(10, scene.screenWidth() - 10)
    theEnemy.y = 0
    theEnemy.setVelocity(0, 50)
    statusbar = statusbars.create(16, 2, StatusBarKind.EnemyHealth)
    statusbar.attachToSprite(theEnemy)
    statusbar.max = 50
})
