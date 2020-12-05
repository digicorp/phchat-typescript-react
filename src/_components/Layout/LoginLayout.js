import React from "react";

export class LoginLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <main className="container-fluid">
        <div className="login-v1 row">
          {/* START LEFT PANEL */}
          <div className="col-md-12 d-flex align-items-center bg-white">
            <div className="login-section card pmd-card mb-0">
              <React.Fragment>{children}</React.Fragment>
            </div>
          </div>
          {/* END LEFT PANEL */}
        </div>
      </main>
    );
  }
}
