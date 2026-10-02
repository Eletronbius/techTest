import { Application, extend } from "@pixi/react";
import { Application as PixiApplication, Container, Sprite } from "pixi.js";
import { PlayerBoatSprite } from "./components/PlayerBoatSprite";
import { Background } from "./components/Background";
import { SpriteSheetProvider } from "./Context/SpriteSheetProvider";
import { Tile } from "./components/Tile";
import { CollisionProvider } from "./Context/CollisionContext";
import { Chaser } from "./components/Chaser";

// extend tells @pixi/react what Pixi.js components are available
extend({
  Container,
  Sprite,
});

export default function App() {
  return (
    // We'll wrap our components with an <Application> component to provide
    // the Pixi.js Application context
    <Application
      resizeTo={window}
      onInit={(app: PixiApplication) => {
        (globalThis as typeof globalThis & { __PIXI_APP__?: PixiApplication }).__PIXI_APP__ = app;
      }}
      >
      <CollisionProvider>

      <SpriteSheetProvider>
      <Background/>

       <Tile name="grass_island_top_mid_1" x={1} y ={1}/>
      <Tile name="grass_island_top_mid_2" x={2} y ={1}/>
      <Tile name="grass_island_top_left" x={3} y ={1}/>
      <Tile name="stone_island_mid_left_1" x={3} y ={2}/>
      <Tile name="stone_island_bottom_left" x={3} y ={3}/>
      <Tile name="grass_island_bottom_mid_2" x={2} y ={3}/>
      <Tile name="grass_island_bottom_mid_1" x={1} y ={3}/>
      <Tile name="grass_island_mid_left_2" x={1} y ={2}/>
      <Tile name="grass_island_center" x={2} y ={2}/>

      <Tile name="grass_island_top_mid_1" x={1} y ={5}/>
      <Tile name="grass_island_top_mid_2" x={2} y ={5}/>
      <Tile name="grass_island_top_left" x={3} y ={5}/>
      <Tile name="stone_island_mid_left_1" x={3} y ={6}/>
      <Tile name="stone_island_bottom_left" x={3} y ={7}/>
      <Tile name="grass_island_bottom_mid_2" x={2} y ={7}/>
      <Tile name="grass_island_bottom_mid_1" x={1} y ={7}/>
      <Tile name="grass_island_mid_left_2" x={1} y ={6}/>
      <Tile name="grass_island_center" x={2} y ={6}/>
      
      <Tile name="grass_island_top_mid_1" x={8} y ={1}/>
      <Tile name="grass_island_top_mid_2" x={9} y ={1}/>
      <Tile name="grass_island_top_left" x={10} y ={1}/>
      <Tile name="grass_island_mid_left_2" x={8} y ={2}/>
      <Tile name="grass_island_center" x={9} y ={2}/>
      <Tile name="stone_island_mid_left_1" x={10} y ={2}/>
      <Tile name="grass_island_mid_left_2" x={8} y ={3}/>
      <Tile name="grass_island_center" x={9} y ={3}/>
      <Tile name="stone_island_mid_left_1" x={10} y ={3}/>
      <Tile name="grass_island_mid_left_2" x={8} y ={4}/>
      <Tile name="grass_island_center" x={9} y ={4}/>
      <Tile name="stone_island_mid_left_1" x={10} y ={4}/>
      <Tile name="grass_island_mid_left_2" x={8} y ={5}/>
      <Tile name="grass_island_center" x={9} y ={5}/>
      <Tile name="stone_island_mid_left_1" x={10} y ={5}/>
      <Tile name="grass_island_mid_left_2" x={8} y ={6}/>
      <Tile name="grass_island_center" x={9} y ={6}/>
      <Tile name="stone_island_mid_left_1" x={10} y ={6}/>
      <Tile name="grass_island_bottom_mid_1" x={8} y ={7}/>
      <Tile name="grass_island_bottom_mid_2" x={9} y ={7}/>
      <Tile name="stone_island_bottom_left" x={10} y ={7}/>

      </SpriteSheetProvider>
      <PlayerBoatSprite />
   
      
      </CollisionProvider>
    </Application>
  );
}
