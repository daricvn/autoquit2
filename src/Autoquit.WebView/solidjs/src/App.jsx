import { createMemo, createSignal } from "solid-js";
import QuestionDialog from "./components/forms/QuestionDialog";
import { ScriptContextProvider } from "./context/ScriptContext";
import translate from "./libs/i18n";
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
      <ScriptContextProvider>
        <Main></Main>
        <QuestionDialog show={getShowQuestion()} value={getQuestion().text} ok={translate(getDialogButton().ok)} cancel={translate(getDialogButton().cancel)}
          onAccept={getQuestion().accept}
          onReject={getQuestion().reject}
          style="box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.2), 0 4px 6px -4px rgb(0 0 0 / 0.2); z-index: 1000" />
      </ScriptContextProvider>
    </StateProvider>
  );
}

export default App;
