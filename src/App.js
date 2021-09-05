import './App.css';
import UpdatingCircles from './components/UpdatingCircles';
import CurvedLineChart from './components/CurvedLineChart';
import ColoredBarChart from './components/ColoredBarChart';

function App() {
  return (
    <>
      <ColoredBarChart />

      <br />
      <br />
      <UpdatingCircles />
      <br />
      <br />
      <CurvedLineChart />
    </>
  );
}

export default App;
