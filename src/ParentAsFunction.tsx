import * as React from "react";
import { ChangeEvent, useState } from "react";
import Child from "./Child";
import { Data } from "./types";
import DataSource from "./DataSource";

type Props = {
  dataSource: DataSource;
};

const ParentAsFunction: React.FC<Props> = ({ dataSource }) => {
  const [merged, setMerged] = useState(false);

  /*
   * In this implementation, the `merged` state is always set to its default value even if changed
   * in the `handleFilterChange` (and reflected in the checkbox state)
   * It behaves correctly in the function based implementation
   */
  const transformData = (data: Data[]): Data[] => {
    if (merged) {
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

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setMerged(event.currentTarget.checked);
  };

  return (
    <div style={{ border: "1px solid red" }}>
      <h1>Parent</h1>
      <label>
        <input type="checkbox" onChange={handleFilterChange} checked={merged} />{" "}
        Merge Child elements
      </label>
      <Child
        transformData={transformData}
        dataSource={dataSource}
        dependency={`${merged}`}
      />
    </div>
  );
};

export default ParentAsFunction;
