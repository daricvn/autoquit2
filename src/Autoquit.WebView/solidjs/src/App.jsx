import { createMemo, createSignal } from "solid-js";
import QuestionDialog from "./components/forms/QuestionDialog";
import { LocalizationContextProvider } from "./context/LocalizationContext";
import { ScriptContextProvider } from "./context/ScriptContext";
import translate from "./libs/i18n";
import { AppRequests } from "./requests/AppRequests";
import { StateProvider } from "./store";
import Main from "./views/Main";

const dialogButtonType = {
  0: { ok: "Ok", cancel: "Cancel" },
  1: { ok: "Yes", cancel: "No" },
  2: { ok: "Confirm", cancel: "Cancel" },
}

window.closeApp = ()=>{
  window.showPrompt("Are you sure want to quit?", 1).then(()=>{
    AppRequests.close()
  })
}

window.showException = (text)=>{
  window.showWarning(text, false).then(()=>{
    AppRequests.close()
  })
}


function App() {
  const [ getQuestion, setQuestion ] = createSignal({})
  const [ getShowQuestion, setShowQuestion ] = createSignal(false)
  const [ getWarning, setWarning ] = createSignal({})

  const getDialogButton = createMemo(()=>{
    let buttonType = dialogButtonType[0]
    if (getQuestion().type)
      buttonType = dialogButtonType[getQuestion().type] ?? dialogButtonType[0]
    return buttonType
  })

  /*@once*/ window.showPrompt = (text, type)=>{
    return /*@once*/new Promise((resolve, reject)=>{
      setShowQuestion(true)
      setQuestion({
        text: translate(text),
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
  /*@once*/window.showWarning = (text, showCancelButton)=>{
    /*@once*/ return new Promise((resolve, reject)=>{
      /*@once*/let obj = {
        show: true,
        /*@once*/text: /*@once*/translate(text),
        cancel: showCancelButton ? dialogButtonType[0].cancel : ''
      }
      setWarning({
        ...obj,
        accept: ()=>{
          setWarning({ ...obj, show: false })
          resolve()
        },
        reject: ()=>{
          setWarning({ ...obj, show: false })
          reject()
        }
      })
    })
  }

  const shouldShowWarning = createMemo(()=> getWarning() && getWarning().show)

  return (
    <StateProvider>
      <LocalizationContextProvider>
        <ScriptContextProvider>
          <Main></Main>
          <QuestionDialog show={getShowQuestion()} value={getQuestion().text} ok={getDialogButton().ok} cancel={getDialogButton().cancel}
            onAccept={getQuestion().accept}
            onReject={getQuestion().reject}
            style="box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.2), 0 4px 6px -4px rgb(0 0 0 / 0.2);"
            zIndex={20000} />
          <QuestionDialog show={shouldShowWarning()} value={getWarning().text} ok={dialogButtonType[0].ok} cancel={getWarning().cancel}
            onAccept={getWarning().accept}
            onReject={getWarning().reject}
            style="box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.2), 0 4px 6px -4px rgb(0 0 0 / 0.2);"
            zIndex={20000} />
        </ScriptContextProvider>
      </LocalizationContextProvider>
    </StateProvider>
  );
}

export default App;
