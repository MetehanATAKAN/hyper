import { useState, useEffect } from "react";

export const useTableSearch = ({ searchVal, retrieve }) => {
    console.log(retrieve);
  const [filteredData, setFilteredData] = useState([]);
  const [origData, setOrigData] = useState([]);
  const [searchIndex, setSearchIndex] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const crawl = (user, allValues) => {
        console.log(user);
        console.log('allvalues=>',allValues);
      if (!allValues) allValues = [];
      for (var key in user) {
        if (typeof user[key] === "object") crawl(user[key], allValues);
        else allValues.push(user[key] + " ");
      }
      return allValues;
    };
    const fetchData = async () => {
    //   const { data: users } = retrieve;
      console.log(retrieve);
      setOrigData(retrieve);
      setFilteredData(retrieve);
      const searchInd = retrieve.map(user => {
        const allValues = crawl(user);
        return { allValues: allValues.toString() };
      });
      setSearchIndex(searchInd);
      if (retrieve) setLoading(false);
    };
    fetchData();
  }, [retrieve]);

  useEffect(() => {
    if (searchVal) {
      const reqData = searchIndex.map((user, index) => {
        if (user.allValues.toLowerCase().indexOf(searchVal.toLowerCase()) >= 0)
          return origData[index];
        return null;
      });
      setFilteredData(
        reqData.filter(user => {
          if (user) return true;
          return false;
        })
      );
    } else setFilteredData(origData);
  }, [searchVal, origData, searchIndex]);

  return { filteredData, loading };
};
