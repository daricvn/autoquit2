import { StateProvider } from "./store";
import Main from "./views/Main";

function App() {
  return (
    <StateProvider>
        <Main></Main>
    </StateProvider>
  );
}

export default App;
