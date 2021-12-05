import { Router } from "solid-app-router";
import { routes } from "./routes/config";
import { StateProvider } from "./store";
import Main from "./views/Main";

function App() {
  return (
    <StateProvider>
        <Router routes={routes}>
          <Main></Main>
        </Router>
    </StateProvider>
  );
}

export default App;
