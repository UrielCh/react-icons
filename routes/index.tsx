import GrAccessibility from "../components/GrAccessibility.tsx";
import GrAction from "../components/GrAction.tsx";
import GrCentos from "../components/GrCentos.tsx";
import { defaultIconContext } from "../lib/iconContext.ts"

// import { IconContext } from "npm:react-icons";

export default function Home() {
  return (
    <>
      <div style={{ height: '100vh', width: '100vw', backgroundColor: '#fee' }}>
        <div style={{ height: '600px', width: '300px', backgroundColor: '#edd' }}>
          <div>GrAccessibility :<GrAccessibility size={96} /></div>
          <div>GrAction :<GrAction size={96} /></div>
          <defaultIconContext.Provider value={{ color: "blue", class: "global-class-name" }}>
            <div>GrCentos :<GrCentos size={96} /></div>
          </defaultIconContext.Provider>
        </div>

        <p>
          Welcome to `fresh`. Try updating this message in the
          ./routes/index.tsx file, and refresh.
        </p>
      </div>
    </>
  );
}

export const config = {
  title: "Fresh App"
};
