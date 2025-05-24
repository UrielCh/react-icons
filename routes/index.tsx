import { ComponentChildren } from "preact";
import GrAccessibility from "../components/GrAccessibility.tsx";
import GrAction from "../components/GrAction.tsx";
import GrCentos from "../components/GrCentos.tsx";
import { defaultIconContext } from "../lib/iconContext.ts"

// IconCard component for reuse
function IconCard({ title, children, description }: { title: string; children: ComponentChildren; description: string }) {
  return (
    <div className="icon-card">
      <h2 className="icon-card-title">{title}</h2>
      <div className="icon-card-icon">
        {children}
      </div>
      <p className="icon-card-desc">{description}</p>
    </div>
  );
}

export default function Home() {
  const iconSize = 96;
  return (
    <div className="page-container">
      <h1 className="page-title">PReact Icons Showcase</h1>
      <h2 className="page-title">Simple</h2>
      <div className="icon-card-container">
        <IconCard title="GrAccessibility" description="<GrAccessibility size={iconSize} />">
          <GrAccessibility size={iconSize} />
        </IconCard>
        <IconCard title="GrAction" description="<GrAction size={iconSize} />">
          <GrAction size={iconSize} />
        </IconCard>
      </div>
      
      <h2 className="page-title">GrAction using class or className</h2>
      <div className="icon-card-container">
      <IconCard title='in red using "class"' description='<GrAction size={iconSize} class="text-red-500" />'>
          <GrAction size={iconSize} class="text-red-500" />
        </IconCard>
        <IconCard title='in red using attribut "className"' description='<GrAction size={iconSize} className="text-red-500" />'>
          <GrAction size={iconSize} className="text-red-500" />
        </IconCard>
      </div>

      <h2 className="page-title">Using defaultIconContext.Provider to pass a IconContext</h2>
      <div className="icon-card-container">
        <IconCard title="Using IconContext value.class" description='<defaultIconContext.Provider value={{ class: "text-blue-500" }}>...'>
          <defaultIconContext.Provider value={{ class: "text-blue-500", size: iconSize.toString() }}>
            <GrCentos />
          </defaultIconContext.Provider>
        </IconCard>
        <IconCard title="Using IconContext value.className" description='<defaultIconContext.Provider value={{ className: "text-blue-500" }}>...'>
          <defaultIconContext.Provider value={{ className: "text-blue-500", size: iconSize }}>
            <GrCentos />
          </defaultIconContext.Provider>
        </IconCard>
      </div>
    </div>
  );
}


export const config = {
  title: "Fresh App"
};


