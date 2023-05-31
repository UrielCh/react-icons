import { Head } from "$fresh/runtime.ts";
import GrAccessibility from "../components/GrAccessibility.tsx";
import GrAction from "../components/GrAction.tsx";
import GrCentos from "../components/GrCentos.tsx";
// <div>GrCentos: <GrCentos/></div>

export default function Home() {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div style={{ height: '100vh', width: '100vw', backgroundColor: '#fee' }}>
        <div style={{ height: '100px', width: '300px', backgroundColor: '#edd' }}>
          <div>GrAccessibility :<GrAccessibility /></div>
          <GrAction/>
        </div>
        <p>
          Welcome to `fresh`. Try updating this message in the
          ./routes/index.tsx file, and refresh.
        </p>
      </div>
    </>
  );
}
