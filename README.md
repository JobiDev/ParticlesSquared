# **Particles²**
![Static Badge](https://img.shields.io/badge/Particles%C2%B2_Version-1.0.0-blue) ![GitHub Repo stars](https://img.shields.io/github/stars/JobiDev/ParticlesSquared)
<br><br>
An easy to use & lightweight particle library meant to be a replacement for [particles.js](https://github.com/VincentGarreau/particles.js/) !<br>
If you like the repo, or use it for your sites please give it a star⭐!
# Demo
Check our the demo [here!](https://jobidev.github.io/ParticlesSquared/demo.html)
# Features
* Multiple "instances" of particles bound to one canvas
* Multiple different shapes for your particles
* Effects such as on hover and on click
* Pausing and Unpausing on the fly
* No memory leak `*cough cough*`
* Much much more ;D
# Setup
How to setup Particles²!
## Step 1 - Add
Add a script into the head of your html like this!
```html
<script src="https://raw.githubusercontent.com/JobiDev/ParticlesSquared/refs/heads/main/particles.js">
<!-- Or where ever your P² script is -->
```
## Step 2 - Setup
Before you initialize the script, make sure you have the following.
```html
<canvas id="particlesCanvas"></canvas>
<!-- Remember this id! it'll be important later. -->
```
## Step 3 - Initialize
Once you've added your canvas element (Make sure it has an ID!) you need to add another script tag.
``` js
const ParticlesInstance = new ParticlesSquared('particlesCanvas');
// Make sure you bind the script to a canvas with the same id ↑ you put here!
```

## Step 3 - Configure
Once you've confirmed the script is added onto your site properly, we need to configure it!

Now, there are several ways to configure P², heres an example config.
```json
{
    "amount": 50,
    "size": 10,
    "speed": 1,
    "color": "rgba(255, 255, 0, 0.5)", // Use RGBA for transparency
    "shape": "star", // Valid options: 'square', 'circle', 'star'
    "direction": "random", // Valid options: 'top', 'bottom', 'left', 'right', 'random'
    "straight": false,
    "effects": {
        "clicking": {
            "enabled": true,
            "amount": 10,
            "speed": 2,
            "lifespan": 100
        },
        "hover": {
            "enabled": true,
            "amount": 1,
            "speed": 0.5,
            "lifespan": 100
        }
    }
}
```
You can add this config to the script but doing
```js
const ParticlesInstance = new ParticlesSquared('particlesCanvas');

ParticlesInstance.load(config); // You can do this multiple times to have several configs on one canvas!
```
## Step 4 - Finalize
Finally, to start the engine, run
```js
const ParticlesInstance = new ParticlesSquared('particlesCanvas');

ParticlesInstance.load(config); // You can do this multiple times to have several configs on one canvas!

ParticlesInstance.start();
```
Some other commands in the library includ
```js
ParticlesInstance.pause(); // Temporarily Pauses the canvas the current instance is bound to;
ParticlesInstance.unpause(); // Unpauses an instance

ParticlesInstance.stop(); // Fully stops an instance

ParticlesInstance.validConfig(config); // Validates a config, returns true if valid, false if not.
