import { Assets, Spritesheet } from "pixi.js";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { TileSheetAtlas } from "../types/common/TileSheetAtlas";


const SpritesheetContext = createContext<Spritesheet|null>(null);

export const useSpritesheet = () => {
const context = useContext(SpritesheetContext);
return context;
}
export const SpriteSheetProvider = ({ children }: { children: ReactNode }) => {
    const [sheet, setSheet] = useState<Spritesheet|null>(null);

    useEffect(()=>{

        const loadSheet= async ()=>{
            const imageUrl = new URL("./assets/tilesheet/tiles_sheet.png", import.meta.url).href;
            const baseTexture = await Assets.load(imageUrl);
            const sheet = new Spritesheet(baseTexture, TileSheetAtlas);
            await sheet.parse()

            setSheet(sheet);
        }
        loadSheet();
    },[])

    if(!sheet) return null;

	return (
        <SpritesheetContext.Provider value={sheet}>
            {children}
        </SpritesheetContext.Provider>
    );
};
