import { useContext, useEffect } from "react";
import { UserContext } from "../context/userProvider";
import { ListTable } from "../components/docList/ListTable";
import { ListSearch } from "../components/docList/ListSeatch";
import "./DocList.scss";

export const DocList = ({ item }) => {
  const { fetchAndSetdocList } = useContext(UserContext);
  useEffect(() => {
    fetchAndSetdocList(item);
  }, [item]);

  return (
    <div className="doclist-outer">
      <ListSearch />
      <ListTable item={item} />
    </div>
  );
};
