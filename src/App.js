
 import Mcq from './Mqc/Mcq';
import questionsSet from './Questions/Questions.json'
import './App.css'
function App() {
  return (
    <div className="App">
      <Mcq questionsSet={questionsSet} />
   
    </div>
  );
}

export default App;
