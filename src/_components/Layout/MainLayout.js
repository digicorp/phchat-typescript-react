import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export class MainLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <main>
        <div className="pmd-content">
          {/* <Content fluid> */}
          <div className="">
            <Header />

            <React.Fragment>{children}</React.Fragment>
          </div>
        </div>
        <Footer />
      </main>
    );
  }
}
