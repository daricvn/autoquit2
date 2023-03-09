import { favicon } from '../../assets/favicon'
import { createEffect, JSX } from "solid-js";
import Dialog from "../../components/forms/Dialog";
import Text from "../../components/content/Text";
import translate from "../../localization/translate";
import NavigableContent from '../../components/content/NavigableContent';

let version = "2.0.0"
let flavour = "Windows"

export interface IAboutProps extends JSX.HTMLAttributes<HTMLFormElement> {
    onClose?: ()=> void;
    show?: boolean;
}

export default function About(props: IAboutProps){
    const close = ()=>{
        if (props.onClose)
            props.onClose();
        return false;
    }

    return <Dialog class="h-full" transition="slide-left" fullScreen={true} show={props.show}>
        <NavigableContent class="px-8 md:px-24 lg:px-52 pt-12" title={translate("About")} onNavigateBack={close}>
            <div class="flex space-x-4">
                <div>
                    <div style={"background-image: url('" + favicon + "'); background-size: contain; background-repeat: no-repeat; min-width: 200px; min-height: 200px; max-height: 400px; height: 100%;"} />
                </div>
                <div class="flex-auto">
                    <Text class="pl-4 pr-2 pt-2" content={true}>
                        <div class="text-center">
                            <h5 class="font-bold text-3xl mb-2">Autoquit</h5>
                            <span class="font-bold text-lg">{translate("Build")}:</span> {version}<br /> 
                            <span class="font-bold text-lg">{translate("Version")}:</span> {flavour}
                        </div>
                        <hr class="mt-3" />
                        <div class="mt-3 text-body-2">
                            Autoquit is an open-source automation tool for desktop applications, developed by <b>Darick Nguyen</b> <br />
                            The tool can execute many commands automatically by using scripts that you can either write your own scripts or record your actions and edit them later. It also lets you adjust the playback speed and link multiple scripts together to create a chain of actions. <br></br> 
                            Autoquit can help you automate your repetitive tasks with ease and efficiency.
                        </div>
                    </Text>
                </div>
            </div>
        </NavigableContent>
    </Dialog>
}