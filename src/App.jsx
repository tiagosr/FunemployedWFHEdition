import Card from './Card';
import Region from './Region';
import './App.css';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Board from './Board';
import { FunemployedCardPack } from "./FunemployedCardPack";

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>

        <Board>
          <Region>
          </Region>  
        </Board>
        <FunemployedCardPack jobs_x={200} jobs_y={300} quals_x={500} quals_y={300} />
      </DndProvider>
    </div>
  );
}

export default App;