import { useContext, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { PoContext } from "../../context/poProvider";
import { MasterContext } from "../../context/masterProvider";

import "./product.scss";

export const Products = () => {
  const { tax, products, setTax, setProducts } = useContext(PoContext);
  const { productOptions, getOptionDetails } = useContext(MasterContext);

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
  return (
    <Paper
      className="products-outer"
      sx={{ width: "100%", overflow: "hidden" }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Sl no</TableCell>
              <TableCell align="center">Product Description</TableCell>
              <TableCell align="right">Part Code</TableCell>
              <TableCell align="right">Qty</TableCell>
              <TableCell align="right">Rate/Unit</TableCell>
              <TableCell align="right">Amount Rs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, i) => (
              <TableRow>
                <TableCell align="left">{i + 1}</TableCell>
                <TableCell align="center">
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
                </TableCell>
                <TableCell align="right">{product["partCode"]}</TableCell>
                <TableCell align="right">
                  <TextField
                    onChange={(e) => {
                      modifyProduct(i, { qty: e.target.value });
                    }}
                    variant="standard"
                    value={product["qty"]}
                  />
                </TableCell>
                <TableCell align="right">{product["ratePerUnit"]}</TableCell>
                <TableCell align="right">
                  {safeMultiply(product["qty"], product["ratePerUnit"])}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell
                colSpan={6}
                align="center"
                sx={{ cursor: "pointer" }}
                onClick={addNewProduct}
              >
                Click to add new entry
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4} />
              <TableCell align="right" colSpan={1}>
                Subtotal
              </TableCell>
              <TableCell align="right">{calcSubTotal()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4} />
              <TableCell align="right" colSpan={1}>
                Tax
              </TableCell>
              <TableCell align="right">
                <TextField
                  onChange={(e) => {
                    setTax(e.target.value);
                  }}
                  value={tax}
                  sx={{ width: "10vw" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">%</InputAdornment>
                    ),
                  }}
                  variant="standard"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4} />
              <TableCell align="right" colSpan={1}>
                Total
              </TableCell>
              <TableCell align="right">{calcTotal()}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
