import React, { useState, useContext, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Hero2 from "../components/Hero2";
import StartUsing from "../components/StartUsing";
import WhatArePeopleSaying from "../components/WhatArePeopleSaying";
import { DataContext } from "../store/store";

const HomePage = ({ popup, setPopup }) => {
  const { state, dispatch } = useContext(DataContext);
  const { auth, error, loading } = state;

  return (
    <div>
      <Header auth={auth.email} />

      <Hero
        dispatch={dispatch}
        email={auth.email}
        accountType={auth.accountType}
      />
      <StartUsing setPopup={setPopup} />
      <Hero2 />
      <WhatArePeopleSaying />
      <Footer />
    </div>
  );
};

export default HomePage;
