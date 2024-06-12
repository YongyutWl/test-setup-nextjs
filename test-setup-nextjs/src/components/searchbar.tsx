// /components/SearchBar.tsx
import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import _ from "lodash";

interface SearchBarProps {
  onSearch?: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch = () => {
    console.log("search");
  },
}) => {
  const handleSearch = _.debounce((value: string) => onSearch(value), 500);

  return (
    <TextField
      placeholder="Search products"
      onChange={(e) => handleSearch(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton size="large" aria-label="search" edge="start">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      className="border"
    />
  );
};

export default SearchBar;
