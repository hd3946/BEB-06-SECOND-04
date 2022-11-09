import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postListCall } from "../api/post";
import { filtering, searchControl } from "../store/slice";

export function usePost(callSign) {
  const dispatch = useDispatch();
  const [lists, setList] = useState({
    allList: [],
    filterList: [],
  });
  const { searchText } = useSelector((state) => state.state);
  const { allList, filterList } = lists;
  const fetchData = async () => {
    const { status, data } = await postListCall();
    if (status === 200) {
      console.log(searchText);
      console.log("200췍");
      setList({ ...lists, allList: data.postList });
      console.log("올 리스트 저장");
      if (searchText) {
        console.log("필터로 들어옴");
        const filter = data.postList.filter((data, index) => {
          return data.User.nickname === searchText;
        });
        setList({ ...lists, filterList: filter });
        // dispatch(searchControl({ searchText: null }));
        // dispatch(filtering({ list: filter.reverse() }));
      }
    } else {
      console.log("검색 없음");
    }
    return;
  };

  useEffect(() => {
    if (callSign === "on") {
      fetchData();
    }
  }, [searchText]);

  return [filterList, allList];
}
