import { useContext, useState } from "react";

import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import AccordionDetails from "@mui/material/AccordionDetails";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { isValidNumber } from "../../utils/validNumberChecker";
import { PoContext } from "../../context/poProvider";
import { MasterContext } from "../../context/masterProvider";

import "./PoProducts.scss";
import { ErrorMessage } from "./errorMessage";

export const PoProducts = () => {
  const { tax, products, setTax, setProducts, errors } = useContext(PoContext);
  const { productOptions, getOptionDetails } = useContext(MasterContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const [index, setIndex] = useState(0);
  const open = Boolean(anchorEl);
  const errorActive = errors.products.value;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = async (event, newValue, index) => {
    const res = await getOptionDetails("products", newValue.value);
    if (res != null) {
      modifyProduct(index, res);
    }
  };

  const modifyProduct = (index, newValues) => {
    var newProducts = products.map((p, i) => {
      if (i == index) return { ...p, ...newValues };
      else return p;
    });
    setProducts(newProducts);
  };
  const safeMultiply = (a, b) => {
    if (a == undefined || b == undefined) return 0;
    else return a * b;
  };

  const calcSubTotal = () => {
    var st = 0;
    products.map((p) => {
      st = st + safeMultiply(p["qty"], p["ratePerUnit"]);
    });

    return st;
  };

  const calcTotal = () => {
    const st = calcSubTotal();
    return st + safeMultiply(st, tax) / 100;
  };

  const addNewProduct = () => {
    setProducts([
      ...products,
      {
        product: "",
      },
    ]);
  };
  const deleteProduct = (index) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
    setIndex(0);
    handleClose();
  };
  return (
    <div className="products-outer">
      <Accordion className="accordian" defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div className="acc-heading-value">Items</div>
          {errorActive && (
            <ErrorMessage label="products" loc="right" errors={errors} />
          )}
        </AccordionSummary>
        <AccordionDetails>
          <div className="table">
            {/* table Header */}
            <div className="table-header">
              <div className="table-cell tabel-label vm">Sl No</div>
              <div className="table-cell tabel-label lg">Product</div>
              <div className="table-cell tabel-label xl">
                Product Description
              </div>
              <div className="table-cell tabel-label md">Part Code</div>
              <div align="center" className="table-cell tabel-label sm">
                Qty
              </div>
              <div align="center" className="table-cell tabel-label md">
                Rate/Unit
              </div>
              <div align="right" className="table-cell tabel-label md">
                Amount Rs
              </div>
              <div className="table-cell tabel-label vm"></div>
            </div>
            {/* table Body */}
            <div className="table-body">
              {products != null &&
                products.map((product, i) => (
                  <>
                    <div className="table-hdivider" />
                    <div className="main-row">
                      <div className="table-cell vm">{i + 1}</div>
                      <div className="table-cell lg">
                        <Autocomplete
                          value={product["product"]}
                          onChange={(e, v) => {
                            handleChange(e, v, i);
                          }}
                          options={productOptions}
                          renderInput={(params) => (
                            <TextField
                              error={
                                errorActive &&
                                (product["product"] == null ||
                                  product["product"] == "")
                              }
                              onChange={(e) => {
                                modifyProduct(i, { qty: e.target.value });
                              }}
                              {...params}
                              variant="outlined"
                              size="small"
                              sx={{ width: "90%" }}
                            />
                          )}
                        />
                      </div>
                      <div className="table-cell xl">
                        <TextField
                          multiline
                          onChange={(e) => {
                            modifyProduct(i, { productDesc: e.target.value });
                          }}
                          sx={{ width: "90%" }}
                          variant="outlined"
                          size="small"
                          value={product["productDesc"]}
                        />
                      </div>
                      <div className="table-cell md">{product["partCode"]}</div>
                      <div className="table-cell sm">
                        <TextField
                          error={errorActive && !isValidNumber(product["qty"])}
                          onChange={(e) => {
                            modifyProduct(i, { qty: e.target.value });
                          }}
                          variant="outlined"
                          size="small"
                          value={product["qty"]}
                        />
                      </div>
                      <div className="table-cell md">
                        <TextField
                          error={
                            errorActive &&
                            !isValidNumber(product["ratePerUnit"])
                          }
                          onChange={(e) => {
                            modifyProduct(i, { ratePerUnit: e.target.value });
                          }}
                          variant="outlined"
                          size="small"
                          value={product["ratePerUnit"]}
                        />
                      </div>
                      <div align="right" className="table-cell md">
                        {safeMultiply(product["qty"], product["ratePerUnit"])}
                      </div>
                      <div className="table-cell vm">
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
                      </div>
                    </div>
                    {product["footNote"] != null && (
                      <div className="footnote">
                        <TextField
                          sx={{ width: "50%" }}
                          multiline
                          label="Footnote"
                          placeholder="Enter foot note"
                          onChange={(e) => {
                            modifyProduct(i, { footNote: e.target.value });
                          }}
                          variant="outlined"
                          size="small"
                          value={product["footNote"]}
                        />
                      </div>
                    )}
                  </>
                ))}
              <div className="table-hdivider" />
            </div>
            {/*table Add option */}

            <div
              sx={{ cursor: "pointer" }}
              onClick={addNewProduct}
              className="add-new-item"
            >
              Add New Entry <AddIcon />
            </div>
            <div className="table-hdivider" />
            {/*table Footer */}
            <div className="table-footer">
              <div className="table-cell tabel-label md">Subtotal</div>
              <div className="table-cell md" align="right">
                {calcSubTotal()}
              </div>
            </div>
            <div className="table-footer">
              <div className="table-cell tabel-label md">Tax</div>
              <div className="table-cell md" align="right">
                <TextField
                  error={errorActive && !isValidNumber(tax)}
                  onChange={(e) => {
                    setTax(e.target.value);
                  }}
                  value={tax}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">%</InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  size="small"
                />
              </div>
            </div>
            <div style={{ justifyContent: "end", display: "flex" }}>
              <div className="table-hdivider-sm" />
            </div>

            <div className="table-footer">
              <div className="table-cell tabel-label md">Total</div>
              <div className="table-cell md" align="right">
                {calcTotal()}
              </div>

              {/* <div className="table-cell vm" /> */}
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
