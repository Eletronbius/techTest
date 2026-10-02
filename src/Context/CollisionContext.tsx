import { System } from "check2d";
import { createContext, ReactNode, useContext, useRef } from "react";

interface CollisionContextType {
  register: (rect: {x:number,y:number,height:number,width:number, isStatic?:boolean}) => () => void;
  checkAABB: (rect: {x:number,y:number,height:number,width:number,rotation:number}) => boolean;

}
const CollisionContext = createContext<CollisionContextType|null>(null)

export const useCollision = () => {
  const collisionContext = useContext(CollisionContext);
  return collisionContext;
};

export const CollisionProvider = ({ children }: { children: ReactNode })=>{

    const systemRef = useRef(new System());

    const register = (rect: {x:number,y:number,height:number,width:number, isStatic?:boolean}) => {
    const box = systemRef.current.createBox({ x: rect.x, y: rect.y }, rect.width, rect.height, {
      isStatic: true,
    });

    return () => {
      systemRef.current.remove(box);
    };
  };
  const checkAABB = (rect: {x:number,y:number,height:number,width:number,rotation:number}): boolean => {
    const tempBox = systemRef.current.createBox({ x: rect.x, y: rect.y }, rect.width, rect.height,{angle:rect.rotation});
    let isColliding = false;
    systemRef.current.checkOne(tempBox, (response) => {
      isColliding = true;
      console.log(response.a)
    });

    systemRef.current.remove(tempBox);

    return isColliding;
  };
    return (
        <CollisionContext.Provider value={{ register, checkAABB }}>
        {children}
        </CollisionContext.Provider>
    );
}