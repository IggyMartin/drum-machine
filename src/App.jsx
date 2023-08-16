import React, { useState, useRef, useEffect } from 'react'
import './App.css'
import DrumPad from './DrumPad'

const originalPad = [
  {letter: 'Q', url:'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3', sound: "Heater-1"},
  {letter: 'W', url:'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3', sound: "Heater-2"},
  {letter: 'E', url:'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3', sound: "Heater-3"},
  {letter: 'A', url:'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3', sound: "Heater-4"},
  {letter: 'S', url:'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3', sound: "Clap"},
  {letter: 'D', url:'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3', sound: "Open-HH"},
  {letter: 'Z', url:'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3', sound: "Kick-n'-Hat"},
  {letter: 'X', url:'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3', sound: "Kick"},
  {letter: 'C', url:'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3', sound: "Closed-HH"}
]

const pianoPad = [
  {letter: 'Q', url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3", sound: 'Chord-1'},
  {letter: 'W', url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3", sound: "Chord-2"},
  {letter: 'E', url:'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3', sound: "Chord-3"},
  {letter: 'A', url:'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3', sound: "Shaker"},
  {letter: 'S', url:'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3', sound: "Open-HH"},
  {letter: 'D', url:'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3', sound: "Closed-HH"},
  {letter: 'Z', url:'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3', sound: "Punchy-Kick"},
  {letter: 'X', url:'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3', sound: "Side-Stick"},
  {letter: 'C', url:'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3', sound: "Snare"}
]

function App() {
  const divRef = useRef(null)
  const [onOff, setOnOff] = useState(true)
  const [soundSource, setSoundSource] = useState(originalPad)
  const [sound, setSound] = useState("")
  const [volume, setVolume] = useState(0.5)

  const handleSound = (id) => {
    if(onOff) {
      const audio = document.getElementById(id)
      audio.currentTime = 0;
      audio.play()
    }
  }

  const handleKeyDown = (event) => {
    const audio = soundSource.find(audio => audio.letter === event.key.toUpperCase())
    if(!audio) return
    let targetButton = document.getElementById(audio.sound)
    targetButton.classList.add('activeClass')
    handleSound(audio.letter)
    handleDisplay(audio.sound)
  }

  const handleKeyUp = (event) => {
    const audio = soundSource.find(audio => audio.letter === event.key.toUpperCase())
    if(!audio) return
    let targetButton = document.getElementById(audio.sound)
    targetButton.classList.remove('activeClass')
  }

  const turnOnOff = () => {
    onOff ? (
      setOnOff(false),
      setSound("")
    ) : setOnOff(true)
  }

  const handleSoundSource = () => {
    soundSource === originalPad
    ? (setSoundSource(pianoPad), handleDisplay('Smooth Piano Kit'))
    : (setSoundSource(originalPad), handleDisplay('Heater Kit'))
  }

  const handleDisplay = (updateSound) => {
    if(onOff) setSound(updateSound)
  }

  const handleVolume = (event) => {
    if(onOff) setVolume(event.target.value)
  }

  function linkAudiosVolume() {
    let targets = soundSource.map(obj => document.getElementById(obj.letter))
    targets.forEach(audio => {
      if(audio) audio.volume = volume
    })
  }

  useEffect(() => {
    if (divRef.current) {
      divRef.current.focus();
    }
  }, []);

  return (
    <div tabIndex={0} ref={divRef} id="drum-machine" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} >
      {linkAudiosVolume()}
      <h1>Drum Machine</h1>
      <div className='container'>
        <div className='padsContainer'>
          {
            soundSource.map(el => (
              <DrumPad key={el.sound} letter={el.letter} url={el.url} sound={el.sound} handleSound={handleSound} handleDisplay={handleDisplay} />
            ))
          }
        </div>
        <div className='settings'>
          <button onClick={turnOnOff}>{onOff ? 'OFF' : 'ON'}</button>
          <button onClick={handleSoundSource}>Change Sounds Source</button>
          <span id="display">{sound}</span>
          <div className='volume'>
            <span>{Math.round(volume * 100)}%</span>
            <input 
            type='range'
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolume}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
