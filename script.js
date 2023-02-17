let songs = [
	{titulo:'Tropkillaz - Boa Noite', artista:'Trap Nation', src:'musicas/boa_noite.mp3', img:'image/boa_noite.jpg'},
	{titulo:'Legião Urbana - Tempo Perdido (ANICIO, DANNE & VIPP CODE Remix)', artista:'House Mag Records', src:'musicas/tempos_perdidos.mp3', img:'image/tempos_perdido.jpg'},
	{titulo:'Hilltop Hoods - Exit Sign feat. Illy & Ecca Vandal', artista:'Hilltop Hoods', src:'musicas/exit_sign.mp3', img:'image/exit_sign.png'},
	{titulo:'Hilltop Hoods - 1955 ft. Montaigne & Tom Thum', artista:'Hilltop Hoods', src:'musicas/1955.mp3', img:'image/banner_hilltop.png'}
];

let music = document.querySelector('audio');
let indexMusic = 0;

let durationMusic = document.querySelector('.fim');
let image = document.querySelector('img');
let nameMusic = document.querySelector('.descricao h2');
let nameArtist = document.querySelector('.descricao p');
let replay = document.querySelector('.btn_repeat');

let replayEnabled = false;

let volume = document.querySelector('.volume');
let range = document.querySelector('.range-musica');

const playButton = document.getElementById('btn-volume');

//Variavel do volume 
const audioPlayer = document.getElementById('audio-player');
const volumeSlider = document.getElementById('volume-slider');


renderMusic(indexMusic);

//
document.querySelector('.btn_play').addEventListener('click', playMusic);

document.querySelector('.btn_pause').addEventListener('click', pauseMusic);

music.addEventListener('timeupdate', refreshBar);

document.querySelector('.previous').addEventListener('click', () => {
	indexMusic--;
	if (indexMusic < 0) {
		indexMusic = 3;
	}
	renderMusic(indexMusic);
	music.play()
});

document.querySelector('.next').addEventListener('click', () => {
	indexMusic++;
	if (indexMusic > 3) {
		indexMusic = 0;
	}
	renderMusic(indexMusic);
	music.play()
});


function renderMusic(index){
	music.setAttribute('src', songs[index].src);
	music.addEventListener('loadeddata', () =>{
		nameMusic.textContent = songs[index].titulo;
		nameArtist.textContent = songs[index].artista;
		image.src = songs[index].img;
		durationMusic.textContent = secondsForMinute(Math.floor(music.duration));

		document.querySelector('.btn_pause').style.display = 'block';
		document.querySelector('.btn_play').style.display = 'none';

		music.play();
	});
}

function changeMusicAutomatic() {
	// Verifique se a música atual chegou ao fim
	if (music.currentTime >= music.duration) {
	    // Atualize o índice da música para a próxima música
	    indexMusic++;
	    // Se chegarmos ao fim do array de músicas, comece de novo
	    if (indexMusic === songs.length) {
	      indexMusic = 0;
	    }
	    // Mude a música
	    renderMusic(indexMusic);
	}
}



replay.addEventListener("click", function() {
    replayEnabled = !replayEnabled; // Inverte o valor da variável de controle ao clicar no botão

    if (replayEnabled) {
      replay.style.color = "#006787";
      // Se o replay estiver ativado, adiciona um evento para reiniciar o áudio ao final da reprodução
      music.addEventListener("ended", function() {
        music.currentTime = 0; // Define o tempo atual do áudio para 0
        music.play(); // Inicia o áudio novamente
      });
    } else {
      replay.style.color = "#212529";
      // Se o replay estiver desativado, remove o evento de reiniciar o áudio ao final da reprodução
      music.removeEventListener("ended", function() {
        music.currentTime = 0; // Define o tempo atual do áudio para 0
        music.play(); // Inicia o áudio novamente
      });
    }
});


// Funções de botão
// Dar play na música 
function playMusic(){
	music.play();
	document.querySelector('.btn_pause').style.display = 'block';
	document.querySelector('.btn_play').style.display = 'none';
}


// Pausar música
function pauseMusic(){
	music.pause();
	document.querySelector('.btn_pause').style.display = 'none';
	document.querySelector('.btn_play').style.display = 'block';
}

function refreshBar(){
	let bar = document.querySelector('progress');
	// a função math do js faz com que não fique com número quebrado
	bar.style.width = Math.floor((music.currentTime / music.duration) * 100) + '%';
	
	// variavel de tempo de música
	let timeMusic = document.querySelector('.inicio');
	timeMusic.textContent = secondsForMinute(Math.floor(music.currentTime));
}

function secondsForMinute(seconds){
	let campoMinutos = Math.floor(seconds / 60);
	let campoSegundos = seconds % 60;

	if(campoSegundos < 10){
		campoSegundos = '0' + campoSegundos;
	}

	return campoMinutos+':'+campoSegundos;
}

//Define o volume do mixer
volumeSlider.addEventListener('input', function() {
  audioPlayer.volume = volumeSlider.value;
});

//Ativa e desativa o mixer
volume.onclick = function() {
    range.classList.toggle('active');
}

//Trocar ícone quando estiver mutado
audioPlayer.addEventListener('volumechange', function() {
	if (audioPlayer.volume === 0) {
	   playButton.innerHTML = '<i class="fas fa-volume-mute fa-2x btn_cursor"></i>';
	} else {
	   playButton.innerHTML = '<i class="fas fa-volume fa-2x btn_cursor"></i>';
	}
});


renderMusic(indexMusic);

music.addEventListener('timeupdate', () => {
  // Chame a função para mudar a música automaticamente
  changeMusicAutomatic();
});
