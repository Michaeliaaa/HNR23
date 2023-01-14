import './style/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { Tips } from "./components/Tips";
import Pages from "./components/Pages";
import React from 'react';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <Tips />
      <Pages />
    </div>
  );
}

export default App;
