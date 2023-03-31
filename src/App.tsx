import './App.css'
import EmptyChessBoard from './components/EmptyChessBoard'
import SettingsPanel from './components/SettingsPanel'


function App() {

  return (
    <div className="App">
      <SettingsPanel/>
      <EmptyChessBoard/>
    </div>
  )
}

export default App
