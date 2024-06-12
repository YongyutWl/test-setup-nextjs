// pages/summary.tsx
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Typography } from "@mui/material";
import { Product } from "@/interfaces/Product";

const SummaryPage = () => {
  const products = useSelector((state: RootState) => state.products.products);

  const totalPrice = products.reduce(
    (acc: number, product: Product) => acc + product.price,
    0
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-12">
      <Typography
        variant="h2"
        className="text-3xl font-bold text-center text-gray-800"
      >
        Summary
      </Typography>
      <div className="flex items-center justify-center mt-8">
        <Typography variant="h4" className="font-bold text-green-500">
          Total Price: ${totalPrice}
        </Typography>
      </div>
    </div>
  );
};

export default SummaryPage;
