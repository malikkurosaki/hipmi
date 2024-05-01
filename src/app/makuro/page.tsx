"use client";
import { useState } from "react";
import useInfiniteScroll, {
  ScrollDirection,
} from "react-easy-infinite-scroll-hook";
import { createItems, loadMore } from "./_util";
import { useShallowEffect } from "@mantine/hooks";

export default function App() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useShallowEffect(() => {
    setData(createItems());
  }, []);

  const next = async (direction: ScrollDirection) => {
    console.log("next", direction);
    try {
      setIsLoading(true);
      const newData = await loadMore();

      const d = direction === "up"? [...newData, ...data]: []
      setData(d);
    } finally {
      setIsLoading(false);
    }
  };

  const ref = useInfiniteScroll({
    next,
    rowCount: data.length,
    hasMore: { up: true },
  });

  return (
    <div>
      <div
        ref={ref as any}
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
      {isLoading && <div>Loading...</div>}
    </div>
  );
}
