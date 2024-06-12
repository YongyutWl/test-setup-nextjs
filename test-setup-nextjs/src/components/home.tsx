"use client";
import React, {
  Suspense,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { fetchProducts } from "../store/productSlice";
import { Autocomplete, Button, TextField } from "@mui/material";
import axiosInstance from "@/utils/axiosInstance";
import { Product } from "@/interfaces/Product";
import { useRouter } from "next/navigation";
import _ from "lodash";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

import "tailwindcss/tailwind.css";

export type AutocompleteOptions =
  | {
      label: string;
      value: string;
    }
  | {
      label?: string;
      value?: string;
    };

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string | null>("all");

  const columns: GridColDef[] = [
    { field: "thumbnail", headerName: "Thumbnail", width: 150 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "price", headerName: "Price", width: 100 },
    { field: "stock", headerName: "Stock", width: 100 },
    { field: "totalPrice", headerName: "Total Price", width: 100 },
    {
      field: "detail",
      headerName: "Detail",
      renderCell: (params) => (
        <Button
          onClick={() => {
            router.push(`/detail/${params?.row?.id}`);
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Detail
        </Button>
      ),
    },
  ];

  const memoProduct = useMemo(() => {
    let filteredProducts = [...products];

    if (categories === "overPrice") {
      filteredProducts = filteredProducts.filter(
        (product) => product.price > 1000 && product.discountPercentage > 0
      );
    } else if (categories === "totalPrice") {
      filteredProducts = filteredProducts.map((product) => ({
        ...product,
        totalPrice: product.price * (1 - product.discountPercentage / 100),
      }));
    } else if (categories === "rating") {
      filteredProducts.sort((a, b) => b.rating - a.rating || a.price - b.price);
    }
    return filteredProducts.filter((product: Product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, products, categories]);

  const handleSearch = useCallback(
    _.debounce((event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    }, 1000),
    []
  );

  const getProducts = async () => {
    const res = await axiosInstance.get("/products");
    setProducts(res.data.products);
    dispatch(fetchProducts());
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
      <TextField
        label="Search"
        onChange={handleSearch}
        fullWidth
        margin="normal"
        className="mb-4"
        sx={{ width: 500 }}
      />

      <Autocomplete
        options={[
          {
            label: "ทั้งหมด",
            value: "all",
          },
          {
            label: "กรองราคามากว่า 1000",
            value: "overPrice",
          },
          {
            label: "แสดงราคารวมต่อชิ้น",
            value: "totalPrice",
          },
          {
            label: "เรียงเรตติ้ง",
            value: "rating",
          },
        ]}
        disableClearable
        defaultValue={{ label: "ทั้งหมด", value: "all" }}
        getOptionLabel={(option) => option.label}
        onChange={(_event, value: AutocompleteOptions | null) => {
          setCategories(value?.value || null);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="เลือกการกรอง"
            variant="outlined"
            className="mb-4"
          />
        )}
        sx={{ width: 500 }}
      />

      <div className="bg-white shadow-md rounded-lg p-4 max-w-[900px] h-[1800px] w-[900px] h-[900px]">
        <DataGrid
          rows={memoProduct || []}
          columns={columns}
          sx={{
            height: 600,
            width: "100%",
          }}
          autoPageSize
        />
      </div>
    </div>
  );
};

export default HomePage;
