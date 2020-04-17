class DrumKit {
    constructor() {
        this.pads = document.querySelectorAll('.pad');
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');

        this.currentKick = './sounds/kick-classic.wav';
        this.currentSnare = './sounds/snare-acoustic01.wav';
        this.currentHihat = './sounds/snare-acoustic01.wav';

        this.selects = document.querySelectorAll('select');
        this.playBtn = document.querySelector('.play');

        this.index = 0;
        this.bitsPerMinute = 150;
        this.isPlaying = null
    }

    activePad() {
        this.classList.toggle('active');
    }
    repeater() {
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        // loop over the pads
        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
            // check if pads are active
            if (bar.classList.contains('active')) {
                if (bar.classList.contains('kick-pad')) {
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if (bar.classList.contains('snare-pad')) {
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if (bar.classList.contains('hihat-pad')) {
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        });

        this.index++;
    }

    start() {
        const interval = (60 / this.bitsPerMinute) * 1000;
        // check if it's palying
        if (!this.isPlaying) {
            this.isPlaying = setInterval(() => {
                this.repeater();
            }, interval);
        } else {
            // clear the interval
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }
    }

    updateBtn() {
        if (!this.isPlaying) {
            this.playBtn.innerText = 'Stop';
            this.playBtn.classList.add('active');
        } else {
            this.playBtn.innerText = 'Play';
            this.playBtn.classList.remove('active');
        }
    }

    changeSound(event) {
        const selectionName = event.target.name;
        const selectionValue = event.target.value;

        switch (selectionName) {
            case 'kick-select':
                this.kickAudio.src = selectionValue;
                break;
            case 'snare-select':
                this.snareAudio.src = selectionValue;
                break;
            case 'hihat-select':
                this.hihatAudio.src = selectionValue;
                break;
        }
    }


}

const drumKit = new DrumKit();

// Event Listeners

drumKit.pads.forEach(pad => {
    pad.addEventListener('click', drumKit.activePad);
    pad.addEventListener('animationend', function () {
        this.style.animation = '';
    })
});

// drumKit.playBtn.addEventListener('click', drumKit.start);

drumKit.playBtn.addEventListener('click', function () {
    drumKit.updateBtn();
    drumKit.start();
});

drumKit.selects.forEach(select => {
    select.addEventListener('change', function (event) {
        drumKit.changeSound(event);
    });
});