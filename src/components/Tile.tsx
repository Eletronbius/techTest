import { Sprite } from "pixi.js";
import { useSpritesheet } from "../Context/SpriteSheetProvider"
import { useApplication } from "@pixi/react";
import { useCollision } from "../Context/CollisionContext";


export const Tile =({name,x,y,solid=true}: {name:string,x:number,y:number,solid?:boolean})=>{


    const {app} = useApplication();
    const sheet = useSpritesheet();
    const register = useCollision();
    if(!sheet) return null;
    const texture = sheet.textures[name];
    if(!texture) return null;
    if((x>(app.screen.width/64)-1) || (x<0)) return null;
    if(solid) register?.register({x:x*64,y:y*64,height:64,width:64})
    return(
        <pixiSprite
            texture={texture}
            x={x*64}   
            y={y*64}
        />
    )

}