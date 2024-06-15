"use client";
"use dev";
import { Flex } from "@mantine/core";
import { DevBox } from "next-dev";
import { useState } from "react";

// Beda Package
import InfiniteScroll from "react-infinite-scroll-component";
import { CobaSatu } from "./CobaSatu";
import { TombolDev } from "./TombolDev";

export default function Coba() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const ttlData = Array.from({ length: 21 });
  const [list, setList] = useState<any[]>(ttlData);

  const fetchMoreData = () => {
    setTimeout(() => {
      setList(list.concat(Array.from({ length: 20 })));
    }, 100);
  };

  const style = {
    height: 30,
    border: "1px solid green",
    margin: 6,
    padding: 8,
  };

  return (
    <DevBox path="dnNjb2RlOi8vZmlsZS8vVXNlcnMvYmFnYXNiYW51bmEvRG9jdW1lbnRzL0JJUC9oaXBtaS9zcmMvdWkvQ29iYS50c3g6MzE6MQ==">
      <Flex gap={"lg"}>
        <div id="scrollableDiv" style={{ height: "100vh", overflow: "auto" }}>
          <InfiniteScroll
            dataLength={list.length}
            next={fetchMoreData}
            hasMore={true}
            loader={
              <center>
                <h4>Loading...</h4>
              </center>
            }
            scrollableTarget="scrollableDiv"
          >
            {list.map((i, index) => (
              <div style={style} key={index}>
                div - #{index}
              </div>
            ))}
          </InfiniteScroll>
        </div>
        <CobaSatu />
        <TombolDev />
      </Flex>
    </DevBox>
  );
}
