import { useCallback, useEffect, useState } from "react";
type Direction = "UP" | "LEFT" | "RIGHT";
const keys: Record<string,Direction>={
    
    ArrowUp:"UP",
    ArrowLeft:"LEFT",
    ArrowRight:"RIGHT"

}

export const useControls = ()=>{

    const [heldDirections, setHeldDirections] = useState<Direction[]>([])

    const handleKey = useCallback((e:KeyboardEvent, isKeyDown:boolean)=>{
        const direction = keys[e.code];
        if(!direction) return

        setHeldDirections((prev) => {

            if(isKeyDown){
                return prev.includes(direction) ? prev : [direction, ...prev]
            }
            return prev.filter((dir)=>dir!==direction)
        })
    },[])

    useEffect(()=>{

        const handleKeyDown = (e:KeyboardEvent)=> handleKey(e,true) 
        const handleKeyUp = (e:KeyboardEvent)=> handleKey(e,false) 

        window.addEventListener('keydown',handleKeyDown)
        window.addEventListener('keyup',handleKeyUp)

        return () =>{

            window.removeEventListener('keydown',handleKeyDown)
            window.removeEventListener('keyup',handleKeyUp)

        }

    },[handleKey])


    const getControlsDirection = useCallback(
        (): { currentKey:Direction, pressedKeys:Direction[]}=>({currentKey:heldDirections[0],pressedKeys:heldDirections})
        ,[heldDirections]
    )

    return {getControlsDirection}
}
