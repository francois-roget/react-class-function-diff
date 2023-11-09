import * as React from "react";
import { ChangeEvent } from "react";
import Child from "./Child";
import { Data } from "./types";
import DataSource from "./DataSource";

type Props = {
  dataSource: DataSource;
};

class ParentAsClass extends React.Component<Props> {
  state = { merged: false };

  transformData = (data: Data[]): Data[] => {
    if (this.state.merged) {
      // return data.filter((d) => d.age % 2 == 0);
      return [
        data.reduce(
          (v, acc) => {
            acc.name += v.name;
            acc.age += v.age;
            return acc;
          },
          { name: "", age: 0 }
        ),
      ];
    }
    return data;
  };

  handleFilterChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ merged: event.currentTarget.checked });
  };

  render() {
    let { dataSource } = this.props;

    return (
      <div style={{ border: "1px solid red" }}>
        <h1>Parent</h1>
        <input
          type="checkbox"
          onChange={this.handleFilterChange}
          checked={this.state.merged}
        />{" "}
        Merge Child elements
        <Child
          transformData={this.transformData}
          dataSource={dataSource}
          dependency={`${this.state.merged}`}
        />
      </div>
    );
  }
}

export default ParentAsClass;
