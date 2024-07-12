import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { DatabaseZap } from "lucide-react";

export const getAllData = async () => {
  let media = [];
  const querySnapshot = await getDocs(collection(db, "media"));
  querySnapshot.forEach((doc) => {
    media.push({ key: doc.id, data: doc.data() });
  });
  return media;
};
const getGeneralData = async () => {
  let generalData;
  const docRef = doc(db, "settings", "general");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    generalData = docSnap.data();
  } else {
    console.log("No such document!");
  }

  return generalData;

};

export const sortNeededData = async () => {
  let media = {
    data: [],
    type: "",
    carouselInterval: 0,
  };
  try {
    const data = await getGeneralData();
    media.carouselInterval = data.carouselInterval;

    switch (data.displayMode) {
      case "single":
        media.data.push(data.singleMediaStore);
        media.type = "single";
        break;
      case "multiple":
        media.data = data.multiMediaStore;
        media.type = "multiple";
        break;
      case "all":
        media.type = "all";
        break;

      default:
        console.log("Error with data field !!");
        break;
    }
    return media;
  } catch (error) {
    console.log("Error Occured", error.message);
  }
};

export const getFinalList = async (mediaData, sortedData) => {
  if (sortedData.type === "single" || sortedData.type === "multiple") {   
    const sortedMediaData = mediaData.filter((media) =>
      sortedData.data.includes(media.key),
    );
    return sortedMediaData;
  } else {
    return mediaData;
  }
};
