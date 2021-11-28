import { createMemo } from "solid-js"
import { Transition } from "solid-transition-group"
import './CircularProgress.css'


const CircularProgress = (props) => {
    const width = props.width ?? 2
    const size = props.size ?? 10
    const boxSize = createMemo(()=> (+size + +width))
    const containerSize = createMemo(()=> boxSize() * 2)
    
    return <div className={props.className} style="position: relative; display: inline-block;">
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

export function CircularProgressWithText(props)
{
    return <div class="flex space-x-2">
        <div>
            <CircularProgress {...props} />
        </div>
        <div className="flex-auto">
            {props.children}
        </div>
    </div>
        
}

export default CircularProgress