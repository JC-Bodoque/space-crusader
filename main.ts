namespace SpriteKind {
    export const PowerUP = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
	
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(assets.image`shoot`, thePlayer, 0, -50)
    if (doubleShootMode && doubleShootMode.x > 0) {
        projectile = sprites.createProjectileFromSprite(assets.image`double_shoot_sprite`, thePlayer, 0, -50)
    }
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    enemyDeath(status.spriteAttachedTo())
})
function enemyDeath (enemy: Sprite) {
    enemy.destroy(effects.disintegrate, 500)
    if (Math.percentChance(10)) {
        doubleShootMode = sprites.create(assets.image`power_up_sprite`, SpriteKind.PowerUP)
        doubleShootMode.x = enemy.x
        doubleShootMode.y = enemy.y
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.PowerUP, function (sprite, otherSprite) {
    doubleShootMode = sprites.create(assets.image`double_shoot_sprite`, SpriteKind.PowerUP)
    doubleShootMode.setPosition(50, 10)
    doubleShootMode.lifespan = 2000
    otherSprite.destroy()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    // sprite.destroy()
    info.changeScoreBy(1)
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -1
})
function setEnviromentMusic () {
    while (true) {
        music.playMelody("E B C5 A B G A F ", 90)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.disintegrate, 500)
    scene.cameraShake(4, 500)
    if (info.life() == 0) {
        thePlayer.destroy(effects.disintegrate, 500)
    }
    enemyDeath(otherSprite)
})
let statusbar: StatusBarSprite = null
let theEnemy: Sprite = null
let doubleShootMode: Sprite = null
let projectile: Sprite = null
let thePlayer: Sprite = null
effects.starField.startScreenEffect()
thePlayer = sprites.create(assets.image`player_sprite_0`, SpriteKind.Player)
thePlayer.setStayInScreen(true)
controller.moveSprite(thePlayer)
info.setLife(5)
info.setScore(0)
let enemySpeed = 50
let enemySpawnTime = 500
game.onUpdateInterval(5000, function () {
    enemySpeed += 10
    enemySpeed = Math.min(enemySpeed, 100)
    enemySpawnTime += -500
    enemySpawnTime = Math.max(enemySpawnTime, 500)
})
forever(function () {
    theEnemy = sprites.create(assets.image`sprite_enemy_0`, SpriteKind.Enemy)
    theEnemy.x = randint(5, scene.screenWidth() - 5)
    theEnemy.vy = 0 + enemySpeed
    theEnemy.y = 0
    statusbar = statusbars.create(16, 2, StatusBarKind.EnemyHealth)
    statusbar.attachToSprite(theEnemy)
    statusbar.max = 10
    pause(enemySpawnTime)
})
// statusbar.setBarSize(20, 4)
game.onUpdateInterval(500, function () {
	
})
