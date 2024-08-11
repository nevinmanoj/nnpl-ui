import { useContext } from "react";
import { UserContext } from "../../context/userProvider";
import { useNavigate, useLocation } from "react-router-dom";
import "./ListTable.scss";
import { capsFirst } from "../../utils/firstcaps";
export const ListTable = ({ item }) => {
  const navigator = useNavigate();
  const location = useLocation();
  const { docList } = useContext(UserContext);
  const col5 = item != "purchase-invoice" ? "customer" : "distributor";
  // const col5 = "billing";

  return (
    <div className="doc-table">
      {/* doc-table Header */}
      <div className="doc-table-header">
        <div className="doc-table-cell doc-table-label vm">Sl No Value</div>
        <div className="doc-table-cell doc-table-label lg">Ref No</div>
        <div className="doc-table-cell doc-table-label md">Status</div>
        <div className="doc-table-cell doc-table-label lg">Date</div>
        <div className="doc-table-cell doc-table-label lg">
          {capsFirst(col5)}
        </div>
        <div className="doc-table-cell doc-table-label sm">Total Value</div>
        {/* <div className="doc-table-cell doc-table-label vm"></div> */}
      </div>
      {/* doc-table Body */}
      <div className="doc-table-body">
        {docList != null &&
          docList.map((doc, i) => {
            return (
              <>
                <div className="doc-table-hdivider" />
                <div
                  className="main-row"
                  onClick={() => {
                    navigator(location.pathname + "/" + doc["_id"]);
                  }}
                >
                  <div className="doc-table-cell vm">{i + 1}</div>
                  <div className="doc-table-cell lg">{doc["ref"]}</div>
                  <div className="doc-table-cell md">{doc["status"]}</div>
                  <div className="doc-table-cell lg"> {doc["date"]}</div>
                  <div className="doc-table-cell lg">
                    {doc[col5] && doc[col5].title}
                  </div>
                  <div className="doc-table-cell sm">{doc["grandTotal"]}</div>

                  {/* <div className="doc-table-cell vm">
                        <IconButton
                          id="demo-positioned-button"
                          aria-controls={
                            open ? "demo-positioned-menu" : undefined
                          }
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          onClick={(e) => {
                            handleClick(e);
                            setIndex(i);
                          }}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                        >
                          <MenuItem
                            onClick={() => {
                              modifyProduct(index, {
                                footNote:
                                  products[index].footNote == null ? "" : null,
                              });
                              handleClose();
                            }}
                          >
                            {products[index].footNote == null
                              ? "Add"
                              : "Remove"}
                            Footnote
                          </MenuItem>
                          <MenuItem onClick={() => deleteProduct(index)}>
                            Delete
                          </MenuItem>
                        </Menu>
                      </div> */}
                </div>
              </>
            );
          })}
      </div>
      <div className="doc-table-hdivider" />
    </div>
  );
};
