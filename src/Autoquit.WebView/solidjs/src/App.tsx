import { Component, createEffect, createMemo, createSignal } from 'solid-js';
import translate from './localization/translate';
import { DialogButtonPresetName, getDialogButton, IDialogPreset } from './presets/DialogPresets';
import { StateProvider } from './context/GlobalStore';
import { LocalizationContextProvider } from './context/LocalizationContext';
import { ScriptContextProvider } from './context/ScriptContext';
import QuestionDialog from './components/forms/implements/QuestionDialog';
import Index from './views/Index';
import { createStore } from 'solid-js/store';
import { ObservatorContextProvider } from './context/ObservatorContext';

declare global {
  interface Window {
    showPrompt: any;
    showWarning: any;
  }
}

const App: Component = () => {
  const [ warningInfo, setWarningInfo ] = createStore<IDialogPreset>({
    show: false,
    type: 0
  })
  const [ questionInfo, setQuestionInfo ] = createStore<IDialogPreset>({
    show: false,
    type: 0
  })

  /*@once*/window.showPrompt = (text: string, type: number) => {
    return new Promise((resolve, reject) => {
      setQuestionInfo({
        show: true,
        text: text,
        type: type,
        accept: () => {
          setQuestionInfo('show', false);
          resolve(null)
        },
        reject: () => {
          setQuestionInfo('show', false);
          reject()
        }
      })
    })
  }

  /*@once*/window.showWarning = (text: string, showCancelButton: boolean) => {
    return new Promise((resolve, reject) => {
      setWarningInfo({
        show: true,
        text: text,
        type: DialogButtonPresetName.OkCancel,
        showCancel: showCancelButton,
        accept: () => {
          setWarningInfo('show', false);
          resolve(null)
        },
        reject: () => {
          setWarningInfo('show', false);
          reject()
        }
      })
    })
  }

  const getWarningCancellation = createMemo(() => warningInfo.showCancel ? getDialogButton().cancel : '');

  return <StateProvider>
    <ObservatorContextProvider>
      <LocalizationContextProvider>
        <ScriptContextProvider>
          <Index />
          <QuestionDialog show={questionInfo.show} value={questionInfo.text} ok={translate(getDialogButton(questionInfo.type).yes)} cancel={translate(getDialogButton(questionInfo.type).cancel)}
            onAccept={questionInfo.accept}
            onReject={questionInfo.reject}
            style="box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.2), 0 4px 6px -4px rgb(0 0 0 / 0.2);"
            zIndex={20000} />
          <QuestionDialog show={warningInfo.show} value={warningInfo?.text} ok={translate(getDialogButton().yes)} cancel={translate(getWarningCancellation())}
            onAccept={warningInfo.accept}
            onReject={warningInfo.reject}
            style="box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.2), 0 4px 6px -4px rgb(0 0 0 / 0.2);"
            zIndex={20000} />
        </ScriptContextProvider>
      </LocalizationContextProvider>
    </ObservatorContextProvider>
  </StateProvider>
};

export default App;
