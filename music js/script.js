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
	});
}

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