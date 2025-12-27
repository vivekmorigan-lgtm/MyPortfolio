import Land from "./pages/Land.jsx";
import Nav from "./components/Nav";
import ClickSpark from "./components/cursor.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
import CustomCursor2 from "./components/CustomCursor2.jsx";
import Divider from "./components/divider.jsx";
import About from "./pages/About.jsx";
import Skills from "./pages/Skills.jsx";
import Projects from "./pages/Projects.jsx";
import TxtAni from "./components/Txt_ani.jsx";

function App() {
  return (
    <>
      <CustomCursor />
      <ClickSpark>
        <Nav />
        <main style={{ paddingTop: 85 }}>
          <Land />
          <Divider />
          <About />
          <Divider />
          <Skills />
          <Divider />
          <Projects />
          <Divider />
          <TxtAni
            marqueeText="Thank you for visiting my portfolio!"
            speed={-3}
            interactive={true}
          />
        </main>
      </ClickSpark>
    </>
  );
}

export default App;
