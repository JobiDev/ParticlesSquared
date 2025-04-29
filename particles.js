class ParticlesSquared {

    constructor(canvas){

        if (!canvas || document.getElementById(canvas) == null){
            console.warn('Please give a valid ID to a canvas element as the first argument in the constructor.')
            return;
        }

        this.author = "JobiDev";
        this.repo = "https://github.com/JobiDev/ParticlesSquared"
        this.version = "1.0"
        
        this.canvas = document.getElementById(canvas);
        this.canvas_id = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.elements = [];

        this.instanceID = String((Math.random())).replace('0','').replace('.','');

        this.canvas.style.pointerEvents = "none";

    }

    validConfig(config){
        if ("amount" in config && "size" in config && "speed" in config && "color" in config && "shape" in config && "direction" in config && "straight" in config){
            return true;
        } else{
            return false;
        }
    }

    load(config){

        if (!this.validConfig(config)){
            console.warn(`Invalid config! Support will not be given for any wierd errors / bugs :(     [Check the docs if you need help with your config!]`)
        } else{
            console.log(`Successfully loaded config, please report any wierd bugs!`)
        }

        let amount = config.amount;
        let color = config.color;
        let speed = config.speed;
        let shape = config.shape;
        let size = config.size;

        // spawn in all da particles
        for (let i = 0; i < amount; i++){

            let angle = Math.random()*2*Math.PI;
            
            // init vx
            let speedx;
            let speedy;

            // random angle & speed by default
            speedx = Math.cos(angle)*speed;
            speedy = Math.sin(angle)*speed;

            // different x & y velo values for each input (corresponding to the direction)
            switch (config.direction){
                case "random":
                    speedx = Math.cos(angle)*speed;
                    speedy = Math.sin(angle)*speed;
                    break;
                case "top":
                    speedy = -1*speed;
                    speedx = config.straight ? 0 : speedx/2;
                    break;
                case "bottom":
                    speedy = 1*speed;
                    speedx = config.straight ? 0 : speedx/2;
                    break;
                case "left":
                    speedx = -1*speed;
                    speedy = config.straight ? 0 : speedy/2;
                    break;
                case "right":
                    speedx = 1*speed;
                    speedy = config.straight ? 0 : speedy/2;
                    break;
            }

            this.elements.push({
                x:Math.random()*this.canvas.width,
                y:Math.random()*this.canvas.height,
                vel:[speedx,speedy],
                size:size*Math.random(),
                shape:shape,
                color:color
            })
        }

        //setup 'effects'

        if (!config.effects){return;}  //no need to even try running ts code if there isnt any effects

        let effects = config.effects;

        if (effects.clicking.enabled){ //Listeners are bound with "this.clickListener" and "this.hoverInterval" because i need to be able to pause, stop, and start them at will :)
            this.clickListener = (e)=>{
                if (this.paused) return;
                let cursorX = e.clientX;
                let cursorY = e.clientY;
                for (let i = 0; i < effects.clicking.amount; i++){
                    let angle = Math.random()*2*Math.PI;
                    this.elements.push({
                        x:cursorX,
                        y:cursorY,
                        vel:[
                            Math.cos(angle)*effects.clicking.speed*Math.random(),
                            Math.sin(angle)*effects.clicking.speed*Math.random()
                        ],
                        size:size*Math.random(),
                        shape:shape,
                        color:color,
                        maxLifeSpan:effects.clicking.lifespan,
                        currentLifeSpan:0
                    })
                }
            }
            window.addEventListener('click',this.clickListener)
        }
        if (effects.hover.enabled){
            let cursorX = 0;
            let cursorY = 0;
            window.addEventListener('mousemove',(e)=>{
                cursorX = e.clientX;
                cursorY = e.clientY;
            })
            this.hoverInterval = window.setInterval(()=>{
                if (this.paused) return;
                for (let i = 0; i < effects.hover.amount; i++){
                    let angle = Math.random()*2*Math.PI;
                    this.elements.push({
                        x:cursorX,
                        y:cursorY,
                        vel:[
                            Math.cos(angle)*effects.hover.speed*Math.random(),
                            Math.sin(angle)*effects.hover.speed*Math.random()
                        ],
                        size:size*Math.random(),
                        shape:shape,
                        color:color,
                        maxLifeSpan:effects.hover.lifespan,
                        currentLifeSpan:0
                    })
                }
            },10);
        }

    }

    draw(element){

        this.ctx.globalAlpha = 1;

        this.ctx.fillStyle = element.color;
        
        let x = element.x;
        let y = element.y;

        let size = element.size;

        let xV = element.vel[0];
        let yV = element.vel[1];

        element.x += xV;
        element.y += yV;

        const canvasWidth = this.canvas.width;
        const canvasHeight = this.canvas.height;

        if (element.x > this.canvas.width) element.x = 0;
        if (element.x < 0) element.x = this.canvas.width;
        if (element.y > this.canvas.height) element.y = 0;
        if (element.y < 0) element.y = this.canvas.height;

        if (element.maxLifeSpan) {
            let alpha = 1 - (element.currentLifeSpan / element.maxLifeSpan);
        
            this.ctx.globalAlpha = alpha;

            if (element.currentLifeSpan > element.maxLifeSpan) {
                const index = this.elements.indexOf(element);
                this.elements.splice(index,1)
                return;
            }

            element.currentLifeSpan += 1;
        }

        switch (element.shape){
            case 'square':
                this.ctx.fillRect(x-size/2,y-size/2,size,size);
                return;
            case 'circle':
                this.ctx.beginPath();
                this.ctx.arc(x,y,size/2,0,2*Math.PI,true)
                this.ctx.fill()
                return;
            case "star":
                this.ctx.beginPath();
                this.ctx.moveTo(element.x, element.y - element.size / 2);
                for (let i = 0; i < 10; i++) {
                    const angle = (i * Math.PI) / 5;
                    const r = i % 2 === 0 ? element.size / 2 : element.size / 2 * 0.5;
                    const sx = element.x + Math.sin(angle) * r;
                    const sy = element.y - Math.cos(angle) * r;
                    this.ctx.lineTo(sx, sy);
                }
                this.ctx.closePath();
                this.ctx.fill();
                return;
        }
        
    }

    start() {
        let id = this.instanceID + '-running';
        if (window[id] === true){ console.warn('Starting an instance multiple times *WILL* lead to unexpected behavior, please stop the current instance.')}
        window[id] = true;
        this.paused = false;

        let drawloop = ()=>{
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.elements.forEach(element => {
                this.draw(element);
            });
            this.loopID = window.requestAnimationFrame(drawloop);
        }

        drawloop();
    }

    pause() {
        let id = this.instanceID + '-running';
        window[id] = false;
        this.paused = true;
        if (this.loopID !== null) {
            window.cancelAnimationFrame(this.loopID);
            this.loopID = null;
            this.isPaused = true;
        }
    }

    unpause() {
        this.paused = false;
        if (this.isPaused) {
            this.start();
        }
    }

    stop() {
        this.pause();
        window.clearInterval(this.hoverInterval);
        window.removeEventListener('click',this.clickListener);
        this.elements = [];
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

}