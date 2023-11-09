import React, { useEffect, useState } from "react";
import { Data } from "./types";
import DataSource from "./DataSource";

type Props = {
  transformData: (data: Data[]) => Data[];
  dataSource: DataSource;
  dependency?: string;
};

const Child: React.FC<Props> = ({
  transformData,
  dataSource,
  dependency = undefined,
}) => {
  const [data, setData] = useState<Data[]>([]);

  const dataChanged = (dataFromDs) => {
    if (!dataFromDs) {
      return;
    }
    const transformedData = transformData(dataFromDs);
    console.log("Added Data", transformedData);
    setData(transformedData);
  };

  useEffect(() => dataSource.registerCallback(dataChanged), []);
  useEffect(() => dataChanged(dataSource.fetchData()), [dependency]);

  return (
    <div style={{ border: "1px solid blue" }}>
      <h2>Child</h2>
      <button onClick={dataSource.fetchData}>fetchNewData</button>
      <ul>
        {data.map((d) => (
          <li>{`${d.name} - ${d.age}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default Child;
