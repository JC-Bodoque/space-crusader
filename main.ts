namespace SpriteKind {
    export const PowerUP = SpriteKind.create()
    export const Asteroid = SpriteKind.create()
    export const FinalBoss = SpriteKind.create()
    export const ExtraLife = SpriteKind.create()
}
namespace StatusBarKind {
    export const BossHealth = StatusBarKind.create()
}
statusbars.onZero(StatusBarKind.BossHealth, function (status) {
    theFinalBoss.destroy(effects.fire, 500)
    effects.confetti.startScreenEffect(500)
    music.playMelody("G B A G C5 B A B ", 90)
    game.splash("You win!!!")
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
	
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.ExtraLife, function (sprite, otherSprite) {
    info.changeLifeBy(1)
    otherSprite.destroy()
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
    if (Math.percentChance(5)) {
        doubleShootMode = sprites.create(assets.image`double_shoot_sprite`, SpriteKind.PowerUP)
        doubleShootMode.x = enemy.x
        doubleShootMode.y = enemy.y
    } else if (Math.percentChance(2)) {
        anExtraLife = sprites.create(assets.image`extra_life`, SpriteKind.ExtraLife)
        anExtraLife.x = enemy.x
        anExtraLife.y = enemy.y
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    if (otherSprite == projectile2) {
        info.changeLifeBy(-5)
        otherSprite.destroy()
        scene.cameraShake(8, 500)
        if (info.life() == 0) {
            thePlayer.destroy(effects.disintegrate, 500)
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Asteroid, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 500)
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.fire, 500)
    scene.cameraShake(4, 500)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.FinalBoss, function (sprite, otherSprite) {
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -10
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.PowerUP, function (sprite, otherSprite) {
    doubleShootMode = sprites.create(assets.image`double_shoot_sprite`, SpriteKind.PowerUP)
    doubleShootMode.setPosition(50, 10)
    doubleShootMode.lifespan = 2000
    otherSprite.destroy()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -1
    sprite.destroy()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.disintegrate, 500)
    scene.cameraShake(4, 500)
    if (info.life() == 0) {
        thePlayer.destroy(effects.disintegrate, 500)
    }
    enemyDeath(otherSprite)
})
let theEnemy: Sprite = null
let theAsteroid: Sprite = null
let statusbar: StatusBarSprite = null
let projectile2: Sprite = null
let anExtraLife: Sprite = null
let doubleShootMode: Sprite = null
let projectile: Sprite = null
let theFinalBoss: Sprite = null
let thePlayer: Sprite = null
effects.starField.startScreenEffect()
thePlayer = sprites.create(assets.image`player_sprite_0`, SpriteKind.Player)
thePlayer.setStayInScreen(true)
controller.moveSprite(thePlayer)
info.setLife(5)
info.setScore(0)
let enemySpeed = 50
let asteroidSpeed = 75
let enemySpawnTime = 10
let asteroidSpawnTime = 20
music.playMelody("E B C5 A B G A F ", 90)
game.onUpdate(function () {
    if (game.runtime() == 30000) {
        theFinalBoss = sprites.create(assets.image`final_boss`, SpriteKind.FinalBoss)
        projectile2 = sprites.createProjectileFromSprite(assets.image`fireball`, theFinalBoss, 0, 10)
        theFinalBoss.x = scene.screenWidth() / 2
        theFinalBoss.y = 30
        statusbar = statusbars.create(16, 2, StatusBarKind.EnemyHealth)
        statusbar.attachToSprite(theFinalBoss)
        statusbar.max = 100
        pause(100)
    }
})
game.onUpdateInterval(1500, function () {
    theAsteroid = sprites.create(assets.image`asteroid_sprite_0`, SpriteKind.Asteroid)
    theAsteroid.x = randint(5, scene.screenWidth() - 5)
    theAsteroid.vy = asteroidSpeed
    theAsteroid.y = 0
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
game.onUpdateInterval(500, function () {
    enemySpeed += 10
    enemySpeed = Math.min(enemySpeed, 100)
    enemySpawnTime += -500
    enemySpawnTime = Math.max(enemySpawnTime, 500)
    asteroidSpeed += 15
    asteroidSpeed = Math.min(enemySpeed, 100)
    asteroidSpawnTime += -525
    asteroidSpawnTime = Math.max(enemySpawnTime, 500)
})
