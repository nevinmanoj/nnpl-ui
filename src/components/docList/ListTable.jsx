import { useContext, useState } from "react";
import { UserContext } from "../../context/userProvider";
import { Skeleton, TablePagination } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import "./ListTable.scss";
import { ddmmmyyyy } from "../../utils/formatting/dateFormatting";

const cellSizesOrdered = ["vm", "lg", "md", "lg", "lg", "md"];

export const ListTable = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const { docList, page, setpage, loading, limit, setlimit, totalDocs } =
    useContext(UserContext);

  const handleChangePage = (event, newPage) => {
    setpage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setlimit(parseInt(event.target.value, 10));
    setpage(0);
  };

  return (
    <div className="doc-table">
      {/* doc-table Header */}
      <div className="doc-table-header">
        <div
          className={"doc-table-cell doc-table-label " + cellSizesOrdered[0]}
        >
          Sl No
        </div>
        <div
          className={"doc-table-cell doc-table-label " + cellSizesOrdered[1]}
        >
          Ref No
        </div>
        <div
          className={"doc-table-cell doc-table-label " + cellSizesOrdered[2]}
        >
          Date
        </div>
        <div
          className={"doc-table-cell doc-table-label " + cellSizesOrdered[3]}
        >
          Customer
        </div>
        <div
          className={"doc-table-cell doc-table-label " + cellSizesOrdered[4]}
        >
          Distributor
        </div>
        <div
          className={
            "doc-table-cell doc-table-label endcol " + cellSizesOrdered[5]
          }
        >
          Total Value
        </div>
        {/* <div className="doc-table-cell doc-table-label vm"></div> */}
      </div>
      {/* doc-table Body */}
      <div className="doc-table-body">
        {loading ? (
          <>
            {Array.from({ length: 2 }, (_, index) => (
              <div className="docs-loading">
                {cellSizesOrdered.map((v, i) => (
                  <div className={"doc-table-cell " + v}>
                    <Skeleton animation={"wave"} height={50} />
                  </div>
                ))}
              </div>
            ))}
          </>
        ) : (
          <>
            {docList != null &&
              docList.map((doc, i) => {
                const distributor =
                  doc["distributor"] == null ? "-" : doc["distributor"];
                const customer =
                  doc["customer"] == null ? "-" : doc["customer"];

                return (
                  <>
                    <div className="doc-table-hdivider" />
                    <div
                      className="main-row"
                      onClick={() => {
                        navigator(location.pathname + "/" + doc["_id"]);
                      }}
                    >
                      <div
                        className={"doc-table-cell vm " + cellSizesOrdered[0]}
                      >
                        {i + 1}
                      </div>
                      <div className={"doc-table-cell " + cellSizesOrdered[1]}>
                        {doc["ref"]}
                      </div>

                      <div className={"doc-table-cell " + cellSizesOrdered[2]}>
                        {ddmmmyyyy(doc["date"])}
                      </div>
                      <div className={"doc-table-cell " + cellSizesOrdered[3]}>
                        {customer}
                      </div>
                      <div className={"doc-table-cell " + cellSizesOrdered[4]}>
                        {distributor}
                      </div>
                      <div className={"doc-table-cell " + cellSizesOrdered[5]}>
                        {doc["grandTotal"]}
                      </div>
                    </div>
                  </>
                );
              })}
            <div className="doc-table-hdivider" />
            <div className="docs-pagination">
              <TablePagination
                component="div"
                count={totalDocs}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={limit}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          </>
        )}
      </div>
      <div className="doc-table-hdivider" />
    </div>
  );
};
