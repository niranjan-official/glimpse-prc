import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { getAllData, getFinalList, sortNeededData } from "../functions";
import Screen from "./Screen";
import Refresh from "./Refresh";

const Layout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchLoad, setFetchLoad] = useState(true);
  const [mediaList, setMediaList] = useState("");
  const [interval, setInterval] = useState(0);

  useEffect(() => {
    getData();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const getData = async () => {
    const [mediaData, sortedData] = await Promise.all([
      getAllData(),
      sortNeededData(),
    ]);
    console.log(mediaData, sortedData);

    const finalMediaList = await getFinalList(mediaData, sortedData);
    console.log(finalMediaList);

    setMediaList(finalMediaList);
    setFetchLoad(false);
    setInterval(sortedData.carouselInterval);
  };

  if (isLoading || fetchLoad) {
    return <Loading />;
  } else {
    return (
      <div className="h-screen w-full bg-black">
        <Screen list={mediaList} interval={interval} />
        <Refresh/>
      </div>
    );
  }
};

export default Layout;
