//import Content from './Content';
import React from "react";

export const EmptyLayout = ({ children, ...restProps }) => (
  <main className="cr-app bg-light" {...restProps}>
    <div>{children}</div>
  </main>
);
