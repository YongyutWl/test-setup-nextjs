import React from "react";
import DetailPage from "@/components/productdetail";

const Page = ({ params }: { params: { id: string } }) => {
  return <DetailPage params={params} />;
};

export default Page;
