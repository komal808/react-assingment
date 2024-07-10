import "./App.css";
import ImagesGrid from './components/ImagesGrid';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <ImagesGrid />
      </div>
    </DndProvider>
  );
}

export default App;
