import { Router } from "solid-app-router";
import { createMemo, createSignal } from "solid-js";
import QuestionDialog from "./components/forms/QuestionDialog";
import translate from "./libs/i18n";
import { routes } from "./routes/config";
import { StateProvider } from "./store";
import Main from "./views/Main";

const dialogButtonType = {
  0: { ok: "Ok", cancel: "Cancel" },
  1: { ok: "Yes", cancel: "No" },
  2: { ok: "Confirm", cancel: "Cancel" },
}

function App() {
  const [ getQuestion, setQuestion ] = createSignal({})
  const [ getShowQuestion, setShowQuestion ] = createSignal(false)

  const getDialogButton = createMemo(()=>{
    let buttonType = dialogButtonType[0]
    if (getQuestion().type)
      buttonType = dialogButtonType[getQuestion().type] ?? dialogButtonType[0]
    return buttonType
  })

  window.showPrompt = (text, type)=>{
    return new Promise((resolve, reject)=>{
      setShowQuestion(true)
      setQuestion({
        text: text,
        type: type,
        accept: ()=>{
          setShowQuestion(false)
          resolve()
        },
        reject: ()=>{
          setShowQuestion(false)
          reject()
        }
      })
    })
  }

  return (
    <StateProvider>
        <Router routes={routes}>
          <Main></Main>
        </Router>
        <QuestionDialog show={getShowQuestion()} value={getQuestion().text} ok={translate(getDialogButton().ok)} cancel={translate(getDialogButton().cancel)}
          onAccept={getQuestion().accept}
          onReject={getQuestion().reject} />
    </StateProvider>
  );
}

export default App;
