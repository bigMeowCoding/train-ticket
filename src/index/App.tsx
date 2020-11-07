import React, { useCallback, useEffect } from "react";
import logo from "../logo.svg";
import "./App.css";
import { connect } from "react-redux";
import { Simulate } from "react-dom/test-utils";
import Header from "../common/components/header/header";
import Journey from "./components/journey/journey";

function App(props: any) {
  const { from, to } = props;
  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  return (
    <div>
      <Header onBack={onBack} title={"火车站"} />
      <Journey from={from} to={to} />
    </div>
  );
}

export default connect(
  function mapStateToProps(state) {
    return state;
  },
    {}
)(App);
