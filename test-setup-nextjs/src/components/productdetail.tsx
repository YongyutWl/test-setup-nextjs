"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Product } from "../interfaces/Product";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Chip,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";

const DetailPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axiosInstance.get(`/products/${params.id}`);
      setProduct(response.data);
    };
    fetchProduct();
  }, [params.id]);

  if (!product) return null;

  const StyledTypography = styled(Typography)(({ theme }) => ({
    fontSize: "1.2rem",
    fontWeight: 600,
    marginBottom: theme.spacing(2),
  }));

  const StyledChip = styled(Chip)(({ theme }) => ({
    margin: theme.spacing(0.5),
    fontSize: "0.8rem",
    fontWeight: 600,
  }));

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <img
                src={product.thumbnail}
                alt={product.title}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledTypography variant="h3">{product.title}</StyledTypography>
          <Typography variant="h6" color="textSecondary">
            {product.brand}
          </Typography>
          <StyledTypography variant="h5" color="primary">
            Price: ${product.price}
          </StyledTypography>
          <StyledTypography variant="h5" color="textSecondary">
            Stock: {product.stock}
          </StyledTypography>
          <div>
            {product.tags.map((tag: string) => (
              <StyledChip
                label={tag}
                color="primary"
                key={tag}
                sx={{ mr: 1 }}
              />
            ))}
          </div>

          <Typography
            variant="body1"
            color="textSecondary"
            sx={{ mt: 2, lineHeight: 1.5 }}
          >
            <Box fontWeight={600}>Description:</Box>
            <Box sx={{ mt: 1 }}>{product.description}</Box>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DetailPage;
