import React from 'react'



const LibrarySong = ({song,songs,setCurrentSong,id,audioRef,isPlaying,setSongs}) => {
  const songSelectHandler= async ()=>{
    const selectedSong = songs.filter((state)=> state.id === id);
     await setCurrentSong(selectedSong[0]);
    //active state
    const newSong = songs.map((song) => {
      if(song.id === id){
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
  //check if thesong playing
  if(isPlaying) audioRef.current.play();
  }
  return (
    <>
    <div className={`library-list ${song.active ?'selected':" "}`}>
    <div onClick={songSelectHandler} className="library-songs">
      <img  src={song.cover} alt={"cover img"}/>
      </div>
    <div className='song-description'>
      <h4>{song.name}</h4>
      <h6>{song.artist}</h6>
    </div>
      </div>
    </>
  )
}

export default LibrarySong