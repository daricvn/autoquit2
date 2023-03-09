import { createMemo, JSX } from "solid-js"
import { Transition } from "solid-transition-group"
import './CircularProgress.css'

export interface ICircularProgressProps extends JSX.HTMLAttributes<HTMLDivElement> {
    width?: number;
    size?: number;
}

const CircularProgress = (props: ICircularProgressProps) => {
    const width = props.width ?? 2
    const size = props.size ?? 10
    const boxSize = createMemo(()=> (+size + +width))
    const containerSize = createMemo(()=> boxSize() * 2)
    
    return <div class={props.class} style="position: relative; display: inline-block;">
        <Transition name="appear">
            {
                !props.hidden &&
                <svg class="circular-progress" style={`width: ${containerSize()}px; height: ${containerSize()}px`}>
                    <circle class="path" cx={boxSize()} cy={boxSize()} r={size} fill="none" stroke-width={width} stroke-miterlimit="10"
                        stroke={props.color ?? "white"}></circle>
                </svg>
            }
        </Transition>
    </div>
}

export function CircularProgressWithText(props: ICircularProgressProps)
{
    return <div class="flex space-x-2">
        <div>
            <CircularProgress {...props} />
        </div>
        <div class="flex-auto">
            {props.children}
        </div>
    </div>
        
}

export default CircularProgress