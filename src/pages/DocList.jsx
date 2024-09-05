import { useContext, useEffect } from "react";
import { UserContext } from "../context/userProvider";
import { ListTable } from "../components/docList/ListTable";
import { ListSearch } from "../components/docList/ListSeatch";
import "./DocList.scss";
import { DocFilter } from "../components/docList/filters";
import { useLocation } from "react-router-dom";
export const DocList = ({ item }) => {
  const { fetchAndSetdocList, token, page, limit } = useContext(UserContext);

  const location = useLocation();

  useEffect(() => {
    fetchAndSetdocList(item);
  }, [item, token, location, page, limit]);

  return (
    <div className="doclist-outer">
      <DocFilter />
      <div>
        <ListSearch />
        <ListTable />
      </div>
    </div>
  );
};
