window.onload = function(){
    window.onkeypress = function(){
        verificaTecla(event);
    }

}
var playerVideo, view, timer, videoPreloader;
var btnPlay, full;
var hour, min, seg, currentHour, currentMin, currentSeg;
var intervalTimer;
var barProgress, videoLoader, progress;
var pctSeek, pctBar;
var slider, sliderVol, drag;
var btnVol;
var stopB;
var skipButtons;
var skipButtons2;
var rangetom;
var rengevel;
var tempo;
var zerar;
zerar = 0;
var testandotexto;
var testandolink;


var text = "1+00:00:04,000 --> 00:00:04,000+200:180:50+Walt Disney Pictures Apresenta filme besta++2 +00:00:07,000 --> 00:00:07,000 +200:160:50 +De outra porta sai a pata de um monstro que recolhe as portas.++3 +00:00:13,000 --> 00:00:13,000 +200:160:50 +Uma porta aberta despeja letras na tela. + +4 +00:00:16,000 --> 00:00:16,000 +200:160:50 +Um filme da Pixar Animation Studios. + +5 +00:00:21,000 --> 00:00:21,000 +200:160:50 +Um monstro entra e sai pelas portas e devora as letras. + +6 +00:00:26,000 --> 00:00:26,000 +200:160:50 +Despejam mais letras. + +7 +00:00:29,000 --> 00:00:29,000 +200:160:50 +Monstros as organizam lado a lado. + +8 +00:00:45,000 --> 00:00:45,000 +200:160:50 +Num quarto de criança. + +9 +00:00:53,000 --> 00:00:53,000 +200:160:50 +As luzes se apagam. + +10 +00:00:58,000 --> 00:00:58,000 +200:160:50 +Um menino dorme tranquilo em sua cama. + +11 +00:01:07,000 --> 00:01:07,000 +200:160:50 +O relógio da cabeceira marca nove e cinco da noite. + +12 +00:01:11,000 --> 00:01:11,000 +200:160:50 +Diversos brinquedos estão espalhados pelo quarto. + +13 +00:01:14,000 --> 00:01:14,000 +200:160:50 +O vento suave balança lentamente a cortina. + +14 +00:01:20,000 --> 00:01:20,000 +200:160:50 +O menino abre os olhos assustado e olha para porta do armário que se abre à sua frente. + +15 +00:01:28,000 --> 00:01:28,000 +200:160:50 +Da porta entre aberta sai um tentáculo de um monstro. + +16 +00:01:32,000 --> 00:01:32,000 +200:160:50 +O menino fecha os olhos com medo. +Abre os olhos e no lugar dos tentáculos vê o casaco com o braço apoiado numa cadeira. + 17 +00:01:39,000 --> 00:01:39,000 +200:160:50 +O menino volta a dormir. + +18 +00:01:41,000 --> 00:01:41,000 +200:160:50 +Uma sombra passa pela cama. + +19 +00:01:44,000 --> 00:01:44,000 +200:160:50 +Embaixo da cama, em meio a brinquedos surgem dois olhos assustadores. + +20 +00:01:53,000 --> 00:01:53,000 +200:120:50 +Um tenebroso monstro com chifres e tentáculos se prepara para atacar o menino. + +21 +00:02:03,000 --> 00:02:03,000 +200:160:50 +O monstro se assusta com o menino. + +22 +00:02:05,000 --> 00:02:05,000 +200:160:50 +Pisa numa bola que é lançada contra a parede e acerta a cara dele.Desequilibra ao pisar num skate e cai sentado em objetos metálicos pontudos.Ele corre em círculos pelo quarto derrubando os móveis.Se joga no chão e se debate. + +23 +00:02:20,000 --> 00:02:20,000 +200:160:50 +O menino se revela um robô. + +24 +00:02:26,000 --> 00:02:26,000 +200:160:50 +As paredes do quarto são elevadas. + +25 +00:02:30,000 --> 00:02:30,000 +200:160:50 +Monstros observam. + +26 +00:02:51,000 --> 00:02:51,000 +200:160:50 +Imagens de TV no momentos em que o monstro sai do armário.";

var dados = text.split('+');

//função que cria um objeto com o id, tempo e a descrição adquirida do arquivo adv
var result = {};
function prepareData(){
    var data = text.split("+");
    for(i=0;i<data.length;i++){
        if(i%1==0)
        var id = data[i];
        var time = data[i+1].split(",")[0];
        var msg = data[i+3];
        result[time] = {};
        result[time]["id"]=id;
        result[time]["msg"]=msg;
        result[time]["status"]=0;
        i = i + 4;
    }
    
}

function prepare(elem){

    if(playerVideo != elem){
        prepareData();
        //readTextFile("https://drive.google.com/file/d/1QCz1_gA2ZLWb2WNhcgensHvs86nU5Iqj/view?usp=sharing");

        console.log(testandotexto);
        console.log(testandolink);
        console.log(result);
        playerVideo = elem;

        skipButtons2 = playerVideo.querySelector('[data-skip2]');
        skipButtons2.addEventListener('click', skip2);
        skipButtons = playerVideo.querySelector('[data-skip]');
        skipButtons.addEventListener('click', skip);
        stopB = playerVideo.querySelector(".video-stop");

        stopB.addEventListener('click', stop);

        view = playerVideo.querySelector(".video-view");
        timer = playerVideo.querySelector('.video-time');

        barProgress = playerVideo.querySelector('.video-progress-bar');
        videoLoader = playerVideo.querySelector('.video-loader');
        progress = playerVideo.querySelector('.video-progress');

        btnVol = playerVideo.querySelector('.video-volume');
        btnVol.addEventListener('click', mute);
        barProgress.addEventListener('click', seeker);

        btnPlay = playerVideo.querySelector('.video-play');
        btnPlay.addEventListener('click', play);

        slider = playerVideo.querySelector('.slider');
        sliderVol = playerVideo.querySelector('.slider-vol');

        slider.addEventListener('mousedown', startDrag);
        slider.addEventListener('mouseup', startDrag);

        slider.addEventListener('mousemove', showVolume);
/*        rangetom = playerVideo.querySelector('.rate');
        rangevel = playerVideo.querySelector('.pitch');

        rangetom.addEventListener('mousedown', tomdown);
        rangetom.addEventListener('mouseup', tomup);
        rangevel.addEventListener('mousedown', veldown);
        rangevel.addEventListener('mouseup', velup);*/

        drag = false;

        intervalTimer = setInterval(updateTimer, 100);

        videoPreloader = playerVideo.querySelector('.video-preloader');
        view.addEventListener('waiting', loader);
        view.addEventListener('playing', loader);

        full = playerVideo.querySelector('.video-screen');
        full.addEventListener('click', fullScreen);
        view.addEventListener('click', play);


    }
}

function verificaTecla(e){
    var keynum;
    var keychar;

    if(window.event){
        keynum = e.keyCode;
    }else if(e.which){
        keynum = e.which;
    }
    keychar = String.fromCharCode(keynum);


    if(keychar ==   ' '){
        play();
    }

    if(keychar == 'e'){
        stop();
    }
    if(keychar == 'a'){
         $(skipButtons).click();
    }
   if(keychar == 'd'){
       $(skipButtons2).click();

    }
   if(keychar == 'z'){
        fullScreen();
    }
   if(keychar == 'x'){
       mute();
    }
    if(keychar == 'q'){
        alert('Space: Play/Pause \n e: Parar \n z: Tela Cheia \n x: Mute \n a/d: Voltar e Avançar \n w/s: Volume');
    }
    if(keychar == 'w'){
         volup();
    }
    if(keychar == 's'){
        voldown();
    }
/*    if(keychar == 'r'){
        velup();
    }
    if(keychar == 'f'){
        velup();
    }
    if(keychar == 't'){
        tomup();       
    }
    if(keychar == 'g'){
        tomup();       
    }*/
}

/*function tomup(){
   $(rangetom).value + 1;
}
function tomdown(){
     $(rangetom).value - 1;
}

function velup(){
    $(rangevel).value + 1;
}
function veldown(){
     $(rangevel).value - 1;
}*/

function skip2() {

    view.currentTime += parseFloat(this.dataset.skip2);
}
function skip() {

    view.currentTime += parseFloat(this.dataset.skip);
     zerar = 1;
    
}

function stop() {

    if (view.played.length != 0) {
        if (view.played.start(0) == 0 && !view.paused) {
            view.pause();
            view.currentTime = 0;
            btnPlay.style.backgroundImage = "url(../_imagens/play-button.png)";
        } else {
            view.pause();
            view.currentTime = 0;
            btnPlay.style.backgroundImage = "url(../_imagens/play-button.png)";
        }

    }
    zerar = 1;
}
function fullScreen(){
    if(!document.webkitFullscreenElement){
        playerVideo.webkitRequestFullscreen();
    }else{
        document.webkitExitFullscreen();
    }

}
function loader(event){
    switch(event.type){
        case 'waiting':
            videoPreloader.style.display = "block";
            break;
        case 'playing':
            videoPreloader.style.display = "none";
            break;
    }

}
function mute(){
    if(!view.muted){
        view.muted = true;
        btnVol.style.backgroundImage = "url(../_imagens/volume-off.png)";
    }else{
        view.muted = false;
        btnVol.style.backgroundImage = "url(../_imagens/reduced-volume.png)";
    }
}

function startDrag(event){

    if(event.type == "mousedown"){

        drag = true;
    }else{

        drag = false;
    }
}


function setvol(newvolume) {

    newvolume = Math.min(Math.max(0, newvolume), $('.slider').width()) ;

    sliderVol.style.width = Math.round(newvolume) + "px";

    var pctVol = newvolume / 100;
    view.volume = pctVol;

    if(pctVol <= 0){

        btnVol.style.backgroundImage = "url(../_imagens/volume-off.png)";
    }else if(pctVol>0 && pctVol<=0.5){
        btnVol.style.backgroundImage = "url(../_imagens/reduced-volume.png)";
    }else{
        btnVol.style.backgroundImage = "url(../_imagens/speaker-filled-audio-tool.png)";
    }
}

function volup() {
    setvol($(sliderVol).width() + 5);
}


function voldown() {
    setvol($(sliderVol).width() - 5);
}




function showVolume(event){
    if(drag){

        setvol($(sliderVol).width());

       /* var w = slider.clientWidth - 2;
        var x = event.clientX - slider.offsetLeft;
        var pctVol = x/w;

        sliderVol.style.width = x+"px";
        view.volume = pctVol;

        if(pctVol<=0){
            btnVol.style.backgroundImage = "url(../_imagens/volume-off.png)";
        }else if(pctVol>0 && pctVol<=0.5){
            btnVol.style.backgroundImage = "url(../_imagens/reduced-volume.png)";
        }else{
            btnVol.style.backgroundImage = "url(../_imagens/speaker-filled-audio-tool.png)";
        }*/


    }else{
    }
}

function seeker(){
    pctBar = (event.clientX / barProgress.clientWidth) *100;
    view.currentTime = (view.duration * pctBar) /100;

}

function updateTimer(){

    bufferedEnd = view.buffered.end(view.buffered.length - 1);

    videoLoader.style.width = String((bufferedEnd / view.duration) * 100)+'%';

    pctSeek = (view.currentTime / view.duration) * 100;

    progress.style.width = String(pctSeek)+'%';


    //Duração total do video
    hour = Math.floor(view.duration / 3600);
    min = Math.floor(view.duration / 60);
    seg = Math.floor(((view.duration / 60) % 1) * 60);


    //CurrentTime
    currentHour = Math.floor(view.currentTime / 3600);
    currentMin = Math.floor(view.currentTime / 60);
    currentSeg = Math.floor(((view.currentTime / 60) % 1) * 60);

    timer.innerHTML = converteTimer(currentHour, currentMin, currentSeg) + ' | ' + converteTimer(hour, min, seg);
    tempo = timer.innerHTML;
    t(tempo);

    function t(tempo){
        var temp = tempo.split(" | ");
        var recebe = temp[0];
        
            

                if(recebe in result){
               
                    if(result[recebe].status==0){
                    speak(result[recebe].msg);
                    result[recebe].status = 1;
                    }
                }
                if('00:'+recebe in result){
                     if(result['00:'+recebe].status==0){
                     speak(result['00:'+recebe].msg);
                     result['00:'+recebe].status = 1;
                    }
                }

                if(recebe in result){
                    if(zerar == 1){

                    result[recebe].status = 0;
                    zerar = 0;
                    }
                }
                if('00:'+recebe in result){
                     if(zerar == 1){
 
                     result['00:'+recebe].status = 0;
                     zerar = 0;
                    }
                }
    }


}

function play(){
    if(view.played.length != 0){
        if(view.played.start(0)==0 && !view.paused){

            view.pause();

            btnPlay.style.backgroundImage = "url(../_imagens/play-button.png)";

        }else{
            view.play();
            btnPlay.style.backgroundImage = "url(../_imagens/pause.png)";
        }
    }else {
        view.play();
        btnPlay.style.backgroundImage = "url(../_imagens/pause.png)";
        view.play();
    }
    
}

//metodo que converte o view.duration em HH:MM:SS
function converteTimer(horas, minutos, segundos){
    if(horas<10 && horas>0){
        horas = '0' + String(horas) +":";
    }else{
        horas = '';
    }
    if(minutos<10){
        minutos = '0' + String(minutos);
    }else if(minutos > 59){
        minutos = minutos - (Math.floor(minutos / 60) * 60);
    }

    if(segundos<10){
        segundos = '0' + String(segundos);
    }
    return String(horas) + String(minutos) + ':' + String(segundos);
}












