import generateRandomData from "./generateRandomData";
import { Callback } from "./types";

/*
 * This class simulates an external datasource that calls its registered callbacks
 * when new data is available.
 */
class DataSource {
  callbacks: Callback[] = [];

  registerCallback = (cb: Callback) => {
    if (!this.callbacks.includes(cb)) {
      this.callbacks.push(cb);
    }
  };

  fetchData = () => {
    const data = generateRandomData();
    this.callbacks.forEach((cb) => cb(data));
  };
}

export default DataSource;
