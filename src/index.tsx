import * as React from "react";
import { createRoot } from "react-dom/client";
import DataSource from "./DataSource";
//import ParentAsClass from "./ParentAsClass";
import ParentAsFunction from "./ParentAsFunction";

const root = createRoot(document.getElementById("root")!);
const ds = new DataSource();

/*
 * Using this implementation will show the problem of the values not being properly transformed
 * because the state does not behave correctly
 */
root.render(<ParentAsFunction dataSource={ds} />);

/*
 * Using this implementation, everything runs as expected
 */
// root.render(<ParentAsClass dataSource={ds} />);
