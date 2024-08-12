import { useContext } from "react";
import { UserContext } from "../../context/userProvider";
import { useNavigate, useLocation } from "react-router-dom";
import Chip from "@mui/material/Chip";
import "./ListTable.scss";
import { capsFirst } from "../../utils/formatting/firstcaps";
import { formatDateString } from "../../utils/formatting/dateFormatting";
export const ListTable = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const { docList } = useContext(UserContext);

  return (
    <div className="doc-table">
      {/* doc-table Header */}
      <div className="doc-table-header">
        <div className="doc-table-cell doc-table-label vm">Sl No</div>
        <div className="doc-table-cell doc-table-label lg">Ref No</div>
        <div className="doc-table-cell doc-table-label sm">Status</div>
        <div className="doc-table-cell doc-table-label md">Date</div>
        <div className="doc-table-cell doc-table-label lg">Customer</div>
        <div className="doc-table-cell doc-table-label lg">Distributor</div>
        <div className="doc-table-cell doc-table-label md endcol">
          Total Value
        </div>
        {/* <div className="doc-table-cell doc-table-label vm"></div> */}
      </div>
      {/* doc-table Body */}
      <div className="doc-table-body">
        {docList != null &&
          docList.map((doc, i) => {
            const distributor =
              doc["distributor"] == null ? "-" : doc["distributor"].title;
            const customer =
              doc["customer"] == null ? "-" : doc["customer"].title;

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
                  <div className="doc-table-cell sm">
                    <Chip
                      color={doc["status"] == "draft" ? "primary" : "success"}
                      // color="success"
                      label={capsFirst(doc["status"])}
                      variant="outlined"
                    />
                  </div>
                  <div className="doc-table-cell md">
                    {formatDateString(doc["date"])}
                  </div>
                  <div className="doc-table-cell lg">{distributor}</div>
                  <div className="doc-table-cell lg">{customer}</div>
                  <div className="doc-table-cell md">{doc["grandTotal"]} </div>

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
