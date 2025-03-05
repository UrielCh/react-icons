import GrAccessibility from "../components/GrAccessibility.tsx";
import GrAction from "../components/GrAction.tsx";
import GrCentos from "../components/GrCentos.tsx";
import { defaultIconContext } from "../lib/iconContext.ts"

// import { IconContext } from "npm:react-icons";

export default function Home() {
  const size = 20;
  return (
    <div>
          <div>GrAccessibility: <GrAccessibility size={size} /></div>
          <div>GrAction: <GrAction size={size} /></div>
          <div>in red usin className: <GrAction size={size} className="text-red-500" /></div>
          <div>in red usin class: <GrAction size={size} class="text-red-500" /></div>
          <defaultIconContext.Provider value={{ color: "blue", class: "global-class-name" }}>
            <div>in using IconContext value.color: <GrCentos size={size} /></div>
          </defaultIconContext.Provider>
          <defaultIconContext.Provider value={{ class: "text-blue-500" }}>
            <div>in using IconContext value.class: <GrCentos size={size} /></div>
          </defaultIconContext.Provider>
          <defaultIconContext.Provider value={{ className: "text-blue-500" }}>
            <div>in using IconContext value.className: <GrCentos size={size} /></div>
          </defaultIconContext.Provider>
    </div>
  );
}

export const config = {
  title: "Fresh App"
};
