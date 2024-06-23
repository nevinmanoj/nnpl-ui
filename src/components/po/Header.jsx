import "./header.scss";

export const PoHeader = () => {
  return (
    <div className="po-header-outer">
      <div>
        <div>Purchase Order</div>
        <div>NNPL/SW/MS/2023-23/123</div>
      </div>
      <div className="po-header-date">
        <div>Date</div>
        <div>12-May-2023</div>
      </div>
    </div>
  );
};
