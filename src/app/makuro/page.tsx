"use client";
import { useState } from "react";
import useInfiniteScroll, {
  ScrollDirection,
} from "react-easy-infinite-scroll-hook";
import { createItems, loadMore } from "./_util";
import { useShallowEffect } from "@mantine/hooks";
import { Center, Loader, Text } from "@mantine/core";
// Beda Package
import InfiniteScroll from "react-infinite-scroll-component";

export default function App() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const ttlData = Array.from({ length: 21 });
  const [list, setList] = useState<any[]>(ttlData);

  // useShallowEffect(() => {
  //   setData(createItems());
  // }, []);

  // const next = async (direction: ScrollDirection) => {
  //   console.log("next", direction);
  //   try {
  //     setIsLoading(true);
  //     const newData = await loadMore();

  //     const d = direction === "up" ? [...newData, ...data] : [];
  //     setData(d);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const ref = useInfiniteScroll({
  //   next,
  //   rowCount: data.length,
  //   hasMore: { up: true },
  // });

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
    <>
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
    </>
  );

  return (
    <Center>
      <div>
        <Center>{isLoading && <Loader />}</Center>

        <div
          // ref={ref as any}
          className="List"
          style={{
            height: 500,
            overflowY: "auto",
          }}
        >
          {data.map((key: any) => (
            <div className="Row" key={key}>
              {key}
            </div>
          ))}
        </div>
      </div>
    </Center>
  );
}
