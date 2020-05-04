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
        this.muteBtns = document.querySelectorAll('.mute');

        this.tempoSlider = document.querySelector('.tempo-slider');

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
        // check if it's playing
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

    mute(event) {
        const muteIndex = event.target.getAttribute('data-track');
        event.target.classList.toggle('active');

        if (event.target.classList.contains('active')) {
            switch (muteIndex) {
                case '0':
                    this.kickAudio.volume = 0;
                    event.target.innerHTML = '<i class="fas fa-volume-up"></i>';
                    break;
                case '1':
                    this.snareAudio.volume = 0;
                    event.target.innerHTML = '<i class="fas fa-volume-up"></i>';
                    break;
                case '2':
                    this.hihatAudio.volume = 0;
                    event.target.innerHTML = '<i class="fas fa-volume-up"></i>';
                    break;
            }
        } else {
            switch (muteIndex) {
                case '0':
                    this.kickAudio.volume = 1;
                    event.target.innerHTML = '<i class="fas fa-volume-mute"></i>';
                    break;
                case '1':
                    this.snareAudio.volume = 1;
                    event.target.innerHTML = '<i class="fas fa-volume-mute"></i>';
                    break;
                case '2':
                    this.hihatAudio.volume = 1;
                    event.target.innerHTML = '<i class="fas fa-volume-mute"></i>';
                    break;
            }
        }
    }

    changeTempo(event) {
        const tempoText = document.querySelector('.tempo-nr');
        tempoText.innerText = event.target.value;
    }

    updateTempo(event) {
        this.bitsPerMinute = event.target.value;
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        if (this.playBtn.classList.contains('active')) {
            console.log('ACTIVE');
            this.start();
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

drumKit.muteBtns.forEach(mBtn => {
    mBtn.addEventListener('click', function (event) {
        drumKit.mute(event);
    });
});

// to initialize the mute buttons icon
drumKit.muteBtns.forEach(mBtn => {
    document.addEventListener('DOMContentLoaded', function (event) {
        mBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    });
});

drumKit.tempoSlider.addEventListener('input', function (event) {
    drumKit.changeTempo(event);
})

drumKit.tempoSlider.addEventListener('change', function (event) {
    drumKit.updateTempo(event);
})
