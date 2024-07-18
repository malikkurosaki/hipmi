"use client";
import Coba from "@/ui/Coba";
import { useState } from "react";
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

  return <></>;
}
