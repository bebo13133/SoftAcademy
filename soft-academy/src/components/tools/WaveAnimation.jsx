import Wave from 'react-wavify'

export const WaveAnimation=()=>{


    return (
        <Wave fill="url(#gradient)" 
        
        paused={false}
        style={{ display: 'flex' }}
        options={{
          height: 35,
          amplitude: 40,
          speed: 0.10,
          points: 5
        }}
        >
    <defs>
    <linearGradient id="gradient" gradientTransform="rotate(90)">
      <stop offset="15%"  stopColor="#d4af37" />
      <stop offset="85%" stopColor="#f00" />
    </linearGradient>
  </defs>
  <mask id="mask">
    <path d="M10,35 A20,20,0,0,1,50,35 A20,20,0,0,1,90,35 Q90,65,50,95 Q10,65,10,35 Z" fill="white" />
  </mask>
</Wave>
    )
}