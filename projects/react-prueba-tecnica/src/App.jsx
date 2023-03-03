import './App.css'
import { useCatImage } from './hooks/useCatImage'
import { useCatFact } from './hooks/useCatFact'

function App() {
  const { fact, refreshFact } = useCatFact()
  const {imageUrl } = useCatImage({fact})  
  
  const handleClick = async () => {
    refreshFact()
  }

  return (
    <>
    <div>
        <h1>App de gatitos</h1>
        <button onClick={handleClick}>Refrescar la app</button>
        {fact && <p>{fact}</p>}
        {imageUrl && <img src={imageUrl} alt={`image extracted using the first three words for ${fact}`}/>}
    </div>
    </>
  )
}

export default App
