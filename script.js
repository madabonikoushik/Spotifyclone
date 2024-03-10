let currentsong=new Audio();
function secondsToMinutesSeconds(seconds) {
  seconds = Math.floor(seconds); // Remove decimal part
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = seconds % 60;
  var formattedMinutes = (minutes < 10) ? "0" + minutes : minutes;
  var formattedSeconds = (remainingSeconds < 10) ? "0" + remainingSeconds : remainingSeconds;
  return formattedMinutes + ":" + formattedSeconds;
}
async function getsongs(){
let a= await fetch("http://127.0.0.1:5501/songs")
 let response=await a.text();
 console.log(response);
 let div=document.createElement("div")
 div.innerHTML=response;
 let as=div.getElementsByTagName("a")
 let songs=[];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if(element.href.endsWith(".mp3")){
        songs.push(element.href.split("/songs/")[1])
    }
    
  }
  return songs

}
const playMusic=(track,pause=false)=>{
  currentsong.src="/songs/"+track;
  if(!pause){
  currentsong.play()
  play.src="pause.svg"
}
  document.querySelector(".songinfo").innerHTML=decodeURI(track)
  document.querySelector(".songduration").innerHTML="00:00/00:00"
}
 async function main(){

  let songs=await getsongs();
   playMusic(songs[0],true)
     let songul=  document.querySelector(".songlist").getElementsByTagName("ul")[0]
     for (const song of songs) {
      songul.innerHTML = songul.innerHTML + `<li>
                <img class="invert" src="music.svg" alt="">
                <div class="info">
                  <div>${song.replaceAll("%20"," ")} </div>
                  <div>artist</div>
                </div>
                <div class="Playnow">
                <span>Play Now</span>
                <img  src="play.svg" alt="" height="30" width="30">
              </div>
              </li>`;
     }
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
      e.addEventListener("click",element=>{
        console.log(e.querySelector(".info").firstElementChild.innerHTML)
        playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
      })
      
    })
    play.addEventListener("click" ,() => {
         if(currentsong.paused){
          currentsong.play()
          play.src="pause.svg"
        
        }
         else{
          currentsong.pause()
          pause.src="play.svg"
         }
    })
     currentsong.addEventListener("timeupdate",()=>{
      console.log(currentsong.currentTime, currentsong.duration)
       document.querySelector(".songduration").innerHTML=`${secondsToMinutesSeconds(currentsong.currentTime)}/${secondsToMinutesSeconds(currentsong.duration)}`
       document.querySelector(".circle").style.left = (currentsong.currentTime/currentsong.duration)*100+"%";
     })
     document.querySelector(".seekbar").addEventListener("click",e=>{
      let percent=(e.offsetX/e.target.getBoundingClientRect().width)*100
      document.querySelector(".circle").style.left=percent+"%"
      currentsong.currentTime=((currentsong.duration)*percent)/100
     })
     document.querySelector(".hamburger").addEventListener("click",()=>{
      document.querySelector(".left").style.left="0"
     })
}

main()