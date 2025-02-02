import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <ThreeDots height="80" width="80" color="#4fa94d" ariaLabel="loading" />
    </div>
  );
};

export default Loader;
