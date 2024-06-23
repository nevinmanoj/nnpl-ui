import { useParams } from "react-router-dom";

export const Co = () => {
  const { id } = useParams();
  return <>co here {id}</>;
};
