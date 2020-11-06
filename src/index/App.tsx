import React, { useEffect } from "react";
import logo from "../logo.svg";
import "./App.css";
import { connect } from "react-redux";
import { Simulate } from "react-dom/test-utils";

function App() {
  useEffect(() => {
    fetch("/user").then((d)=> {
      return d.json()
    }).then(
      (data) => {
        console.log(data);
      },
      (er) => {
        console.error(er);
      }
    );
  }, []);
  return <div>app</div>;
}

export default connect(
  function mapStateToProps(state) {},
  function mapDispatchToProps(dispatch) {}
)(App);
