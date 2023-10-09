import React,{useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay,faPause,faAngleRight,faAngleLeft } from '@fortawesome/free-solid-svg-icons'
const Player = ({audioRef,
                songs,
                setCurrentSong,
                currentSong, 
                isPlaying, 
                setIsPlaying, 
                songInfo, 
                setSongInfo,
                setSongs,
                }) => {
   useEffect(() => {
    //active state
    const newSong = songs.map((song) => {
      if(song.id === currentSong.id){
        return{
          ...song,
          active:true,
        };
      }else{
        return{
          ...song,
          active:false,
        };
      }
    })
    setSongs(newSong);
  },[currentSong])
                  
  //if you need to call a html element in your component you need to use use ref
  const playSongHaldler =()=>{
    if(isPlaying){
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    }else{
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  }
  //song duration time
  const getTime =(time)=>{
    return(
      Math.floor(time/60)+ ":" + ("0" +Math.floor(time%60)).slice(-2)
    )
  }
  //eventHandlers
  const dragHandler =(e)=>{
    audioRef.current.currentTime=e.target.value;
    setSongInfo({...songInfo,currentTime:e.target.value})
  } 
  const skipTrackHandle = async (direction) => {
    let currentIndex = songs.findIndex(
      (song) => song.id === currentSong.id
    );
    if (direction === "skip-forward") {
      const nextIndex = (currentIndex + 1) % songs.length;
      await setCurrentSong(songs[nextIndex]);
      console.log(currentSong);
      console.log(songs.length);
    }
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        return;
      }
      const lastIndex = (currentIndex - 1) % songs.length;
      await setCurrentSong(songs[lastIndex]);
      console.log(songs[currentIndex - 1] % songs.length);
    }
    if (isPlaying) audioRef.current.play();
  };
  //add track style
  const trackAnim ={
    transform:`translateX(${songInfo.animationPercentage}%)`
  }
  
  return (
     <div className='palyer'>
        <div className='time-control'>
            <p>{getTime(songInfo.currentTime)}</p>
            <div  className='track'>
            <input type='range' min={0} 
            max={songInfo.duration || 0} 
            value={songInfo.currentTime}
            onChange={dragHandler}/>
            <div style={trackAnim}className='animation-track'></div>
            </div>
            <p>{songInfo.duration? getTime(songInfo.duration) : "0:00"}</p>
            </div>
            <div className='play-control'>
                <FontAwesomeIcon onClick={()=>skipTrackHandle('skip-back')} className='skip-back' size="2x" icon={faAngleLeft}/>
                <FontAwesomeIcon onClick={playSongHaldler} className='play-icon' 
                size="2x" icon={isPlaying? faPause: faPlay}/>
                <FontAwesomeIcon onClick={()=>skipTrackHandle('skip-forward')} className='skip-forward'size="2x"  icon={faAngleRight}/> 
        </div>
      
     </div>
  )
}

export default Player

// style={{background:`linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`}}
// const skipTrackHandle = async(direction)=>{
//   let currentIndex = songs.findIndex((song,index) => song.id === currentSong.id);
//   if(direction === 'skip-forward'){
//     await setCurrentSong(songs[currentIndex +1] % songs.length);
//     console.log(songs[currentIndex +1] % songs.length);
//     console.log(songs.length)
    
//   }
//   if (direction === 'skip-back'){
//     if((currentIndex-1)% songs.length === -1){
//       await setCurrentSong((songs)[songs.length-1]);
//       if(isPlaying) audioRef.current.play();
//       return;
//     }
//     await setCurrentSong(songs[currentIndex - 1] % songs.length);
//     console.log(songs[currentIndex - 1] % songs.length);
//   } 
//   if(isPlaying) audioRef.current.play();
// }