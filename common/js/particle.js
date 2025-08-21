"use strict";

var imagePaths = ["./common/img/HardRain.png"];
var config = {
    "alpha": { "start": 0.4, "end": 0 },
    "scale": { "start": 0.4, "end": 0.4, "minimumScaleMultiplier": 1 },
    "color": { "start": "#ffffff", "end": "#ffffff" },
    "speed": { "start": 1000, "end": 1000, "minimumSpeedMultiplier": 1 },
    "acceleration": { "x": 0, "y": 0 },
    "maxSpeed": 0,
    "startRotation": { "min": 90, "max": 90 },
    "noRotation": false,
    "rotationSpeed": { "min": 0, "max": 0 },
    "lifetime": { "min": 0.4, "max": 0.6 },
    "blendMode": "normal",
    "frequency": 0.001,
    "emitterLifetime": -1,
    "maxParticles": 500,
    "pos": { "x": 0, "y": 0 },
    "addAtBack": false,
    "spawnType": "rect",
    "spawnRect": { "x": 0, "y": -100, "w": 0, "h": 0 }
};

const canvas = document.getElementById("stage");

// PIXI-приложение для дождя
let app = new PIXI.Application({
    view: canvas,
    resizeTo: window,
    transparent: true
});

let emitter;
let elapsed = Date.now();

// Загружаем текстуру дождя
PIXI.Loader.shared.add(imagePaths[0]).load(() => {
    const art = [PIXI.Texture.from(imagePaths[0])];

    emitter = new PIXI.particles.Emitter(app.stage, art, config);

    emitter.spawnRect.width = window.innerWidth;
    emitter.spawnRect.height = window.innerHeight;

    // обновляем дождь каждый кадр
    app.ticker.add(() => {
        const now = Date.now();
        emitter.update((now - elapsed) * 0.001);
        elapsed = now;
    });
});

// пересчёт при изменении размера окна
window.addEventListener("resize", () => {
    if (emitter) {
        emitter.spawnRect.width = window.innerWidth;
        emitter.spawnRect.height = window.innerHeight;
    }
});
