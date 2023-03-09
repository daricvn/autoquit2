/* @refresh reload */
import { render } from 'solid-js/web';
import './index.css';
import './transition.css';
import '@unocss/reset/tailwind.css'
import '@fortawesome/fontawesome-free/css/solid.min.css'
import '@fortawesome/fontawesome-free/css/brands.min.css'
import '@fortawesome/fontawesome-free/css/regular.min.css'
import '@fortawesome/fontawesome-free/css/fontawesome.min.css'
import App from './App';
import 'uno.css'
import { AppRequests } from './requests/AppRequests';

declare global {
  interface Window {
    closeApp: any;
    showException: any;
  }
}

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
  );
}

window.closeApp = ()=>{
  window.showPrompt("Are you sure want to quit?", 1).then(()=>{
    AppRequests.close()
  })
}

window.showException = (text: string)=>{
  window.showWarning(text, false).then(()=>{
    AppRequests.close()
  })
}

render(() => <App />, root!);
