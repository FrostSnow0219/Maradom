import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import { Routes, Route, HashRouter } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermOfUse from "./pages/TermOfUse";
import SalesAndRefunds from "./pages/SalesAndRefunds";
import Legal from "./pages/Legal";
import Home from "./pages/Home";

import TrueAutomation from "./pages/TrueAutomation";
import AutoEcosystem from "./pages/AutoEcosystem";
import Security from "./pages/Security";
import Archie from "./pages/Archie";
import Integration from "./pages/Integration";
import Merlin from "./pages/Merlin";
import OpenSource from "./pages/OpenSource";
import Privacy from "./pages/Privacy";

import FAQ from "./pages/FAQ";

import { AppProvider } from "./utils/context";

// import KeyFeatures from './components/KeyFeatures';

function App() {
  return (
    <AppProvider>
      <Router>
        <div id="App" className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/term-of-use" element={<TermOfUse />} />
            <Route path="/sales-and-refunds" element={<SalesAndRefunds />} />
            <Route path="/legal" element={<Legal />} />

            <Route path="/true-automation" element={<TrueAutomation />} />
            <Route path="/autonomous-ecosystem" element={<AutoEcosystem />} />
            <Route path="/security" element={<Security />} />
            <Route path="/merlin" element={<Merlin />} />
            <Route path="/integration" element={<Integration />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/archie" element={<Archie />} />
            <Route path="/open-source" element={<OpenSource />} />

            {/* <Route path="/faq" element={<FAQ />} /> */}
          </Routes>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
