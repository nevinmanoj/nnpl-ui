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

import { PoContext } from "../../context/poProvider";
import { MasterContext } from "../../context/masterProvider";

import "./product.scss";

export const Products = () => {
  const { tax, products, setTax, setProducts } = useContext(PoContext);
  const { productOptions, getOptionDetails } = useContext(MasterContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const [index, setIndex] = useState(0);
  console.log(products[index]);
  const open = Boolean(anchorEl);
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
        <AccordionSummary>
          <div className="acc-heading-value"> Items </div>
        </AccordionSummary>
        <AccordionDetails>
          <table aria-label="spanning table" className="table">
            {/* table Header */}
            <thead>
              <tr>
                <td align="left">Sl no</td>
                <td align="center">Product</td>
                <td align="center">Product Description</td>
                <td align="right">Part Code</td>
                <td align="right">Qty</td>
                <td align="right">Rate/Unit</td>
                <td align="right">Amount Rs</td>
                <td align="right"></td>
              </tr>
            </thead>
            {/* table Body */}
            <tbody>
              {products != null &&
                products.map((product, i) => (
                  <>
                    <tr className="main-row">
                      <td align="left">{i + 1}</td>
                      <td align="center">
                        <Autocomplete
                          value={product["product"]}
                          onChange={(e, v) => {
                            handleChange(e, v, i);
                          }}
                          options={productOptions}
                          renderInput={(params) => (
                            <TextField {...params} variant="standard" />
                          )}
                        />
                      </td>
                      <td align="center">
                        <TextField
                          onChange={(e) => {
                            modifyProduct(i, { productDesc: e.target.value });
                          }}
                          variant="standard"
                          value={product["productDesc"]}
                        />
                      </td>
                      <td align="right">{product["partCode"]}</td>
                      <td align="right">
                        <TextField
                          onChange={(e) => {
                            modifyProduct(i, { qty: e.target.value });
                          }}
                          variant="standard"
                          value={product["qty"]}
                        />
                      </td>
                      <td align="right">
                        <TextField
                          onChange={(e) => {
                            modifyProduct(i, { ratePerUnit: e.target.value });
                          }}
                          variant="standard"
                          value={product["ratePerUnit"]}
                        />
                      </td>
                      <td align="right">
                        {safeMultiply(product["qty"], product["ratePerUnit"])}
                      </td>
                      <td align="right">
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
                      </td>
                    </tr>
                    {product["footNote"] != null && (
                      <tr>
                        <td colSpan={8} align="center">
                          <TextField
                            onChange={(e) => {
                              modifyProduct(i, { footNote: e.target.value });
                            }}
                            variant="standard"
                            value={product["footNote"]}
                          />
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              {/*table Footer */}
              <tr>
                <td
                  colSpan={6}
                  align="center"
                  sx={{ cursor: "pointer" }}
                  onClick={addNewProduct}
                >
                  Click to add new entry
                </td>
              </tr>
              <tr>
                <td colSpan={5} />
                <td align="right" colSpan={1}>
                  Subtotal
                </td>
                <td align="right">{calcSubTotal()}</td>
              </tr>
              <tr>
                <td colSpan={5} />
                <td align="right" colSpan={1}>
                  Tax
                </td>
                <td align="right">
                  <TextField
                    onChange={(e) => {
                      setTax(e.target.value);
                    }}
                    value={tax}
                    sx={{ widthead: "10vw" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">%</InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={5} />
                <td align="right" colSpan={1}>
                  Total
                </td>
                <td align="right">{calcTotal()}</td>
              </tr>
            </tbody>
          </table>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
