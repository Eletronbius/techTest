import { Assets, Spritesheet, Texture,TilingSprite} from "pixi.js";
import { useEffect, useState } from "react"
import { TileSheetAtlas } from "../types/common/TileSheetAtlas";
import { useApplication, extend } from "@pixi/react";

extend({TilingSprite})

export const Background = () =>{

    const [tileTexture, setTileTexture] = useState<Texture|null>(null);
    const {app} = useApplication();
    useEffect(()=>{

        const loadTileSheet = async () => {
            const baseTexture = await Assets.load("src/assets/tilesheet/tiles_sheet.png")
            const sheet = new Spritesheet(baseTexture,TileSheetAtlas)
            await sheet.parse()

            const waterTile = sheet.textures['water']
            setTileTexture(waterTile);
        }
        loadTileSheet();
    },[])

    if(!tileTexture)return null;

    return (
        <pixiTilingSprite
            texture={tileTexture}
            width={app.screen.width}
            height={app.screen.height}
        />
    )
}