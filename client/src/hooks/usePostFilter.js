import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { postListCall } from "../api/post";

export function usePostFilter(sign) {
  const [callCheck, setCallCheck] = useState(sign);

  const [inD, setInD] = useState();
  const [tt, setTT] = useState(null);
  //   const { searchText } = useSelector((state) => state.state);

  const fetchData = async () => {
    const { status, data } = await postListCall();
    if (status === 200) {
      setTT(data);
    }
  };

  useEffect(() => {
    if (inD) {
      setInD(false);
      fetchData();
    }
  }, [inD]);
  console.log(tt);
  return tt;
}
