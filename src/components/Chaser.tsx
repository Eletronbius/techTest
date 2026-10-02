import { useApplication, useTick } from "@pixi/react"
import { Assets, Sprite, Texture } from "pixi.js";
import { useEffect, useRef, useState } from "react";
import { useCollision } from "../Context/CollisionContext";


export const Chaser =() => {
    const { app } = useApplication();
    const [position, setPosition] = useState({x:app.screen.width/3+100,y:app.screen.height/2});
    const [rotation, setRotation] = useState(0);
    const spriteRef = useRef<Sprite>(null);
    const [texture, setTexture] = useState(Texture.EMPTY);
    const register = useCollision();
    useEffect(()=>{
        if (texture === Texture.EMPTY){
            const imageUrl = new URL('./png/default/ships/ship_20.png', import.meta.url).href;
            Assets.load(imageUrl).then((result) =>{
                setTexture(result);
            })
        }
        const sprite = spriteRef.current
        if (!sprite) return;
        register?.register({x:position.x,y:position.y,height:sprite.height,width:sprite.width,isStatic:false})
            setRotation(3*Math.PI/2)
    },[texture])
    
    
    useTick(()=>{
        const sprite = spriteRef.current
        if (!sprite) return;
        const bounds = sprite.getBounds();

        setPosition((prev:{x:number,y:number})=>{
            const {x,y}= prev
            let dx=0;
            let dy=0;

            const isOutLeft = bounds.x+dx+32 < 0;
            const isOutRight = bounds.x + bounds.width+dx+32 > app.screen.width;
            const isOutTop = bounds.y+dy+32 < 0;
            const isOutBottom = bounds.y + bounds.height+dy+32> app.screen.height;
            const isPartiallyOffscreen = isOutLeft || isOutRight || isOutTop || isOutBottom;

            if(isPartiallyOffscreen)return{x:x,y:y}
            
            if(register?.checkAABB({x:x+dx,y:y+dy,width:sprite.width-50,height:sprite.height-50,rotation:rotation}))
                {
                    
                    return{x:x,y:y}

                }

            

            return {x:x+dx,y:y+dy}
        })
    })

    return(
    <pixiSprite
    ref={spriteRef}
    texture={texture}
    x={position.x}
    y={position.y}
    rotation={rotation}
    anchor={0.5}
    />
    );
}