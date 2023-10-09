
import React, {useRef, useState}from 'react'
import Nav from '../components/Nav'
import Song from '../components/Song'
import Player from '../components/Player'
import Library from '../components/Library'
//adding data
import data from '../data'
const MusicLibrary = () => {
    const [songs,setSongs]=useState(data())
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef =useRef (null)
  //state
  const [songInfo, setSongInfo] = useState({
    currentTime:0,
    duration:0,
    animationPercentage:0,
  })
  const [libraryStatus, setLibraryStatus] = useState(false);
  const timeUpdateHandler=(e)=>{
    const  current = e.target.currentTime;
    const  duration = e.target.duration;
    //calculate percentage
    const roundedCurrent =Math.round(current);
    const roundedDuration =Math.round(duration);
    const animation = Math.round((roundedCurrent/roundedDuration)*100)
    setSongInfo({...songInfo, 
      currentTime:current, 
      duration,
      animationPercentage:animation})
   } 
  const songEndHandler =async ()=>{
    let currentIndex = songs.findIndex(
      (song) => song.id === currentSong.id
    );
    const nextIndex = (currentIndex + 1) % songs.length;
    await setCurrentSong(songs[nextIndex]);
    if (isPlaying) audioRef.current.play();
  }
  
  return (
    <>
    <div className={`App ${libraryStatus?"library-active":""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <Song currentSong={currentSong} />
      <Player
      audioRef={audioRef}
      setIsPlaying={setIsPlaying} 
      isPlaying={isPlaying} 
      currentSong={currentSong}
      songInfo={songInfo }
       setSongInfo={setSongInfo}
       songs={songs}
       setCurrentSong={setCurrentSong}
       setSongs={setSongs}
       />
     
      <Library audioRef={audioRef} 
      songs={songs} 
      setCurrentSong={setCurrentSong}
      isPlaying={isPlaying}
      setSongs={setSongs}
      libraryStatus={libraryStatus}/>
        <audio onTimeUpdate={timeUpdateHandler} 
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef } 
        src={currentSong.audio}
        onEnded={songEndHandler}></audio>
      
    </div>
    </>
  )
}

export default MusicLibrary