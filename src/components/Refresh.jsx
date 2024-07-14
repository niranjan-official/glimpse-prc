import React, { useEffect, useRef } from "react";
import { getDatabase, ref, onValue, off } from "firebase/database";

const Refresh = () => {
  const isInitialLoad = useRef(true);
  const previousValue = useRef(null);

  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, "/refresh");
    
    const listener = onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      if (isInitialLoad.current) {
        isInitialLoad.current = false;
        previousValue.current = data;
      } else if (data !== previousValue.current) {
        console.log("Value changed", data);
        window.location.reload();
      }
    });

    return () => {
      off(starCountRef, 'value', listener);
    };
  }, []);

  return null;
};

export default Refresh;
