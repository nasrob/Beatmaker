class DrumKit {
    constructor() {
        this.pads = document.querySelectorAll('.pad');
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.playBtn = document.querySelector('.play');
        this.index = 0;
        this.bitsPerMinute = 150;
    }

    activePad() {
        this.classList.toggle('active');
    }
    repeater() {
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        this.index++;
    }

    start() {
        console.log(this);
        const interval = (60 / this.bitsPerMinute) * 1000;
        setInterval(() => {
            this.repeater();
        }, interval);
    }
}

const drumKit = new DrumKit();

drumKit.pads.forEach(pad => {
    pad.addEventListener('click', drumKit.activePad)
})

// drumKit.playBtn.addEventListener('click', drumKit.start);

drumKit.playBtn.addEventListener('click', function () {
    drumKit.start
});