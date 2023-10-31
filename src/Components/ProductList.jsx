import React, { useState } from "react";
import styled from "styled-components";
import productsData from "../Products";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.h1`
  font-size: 28px;
  text-align: center;
`;

const Filters = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
`;

const ProductsContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  list-style: none;
  padding: 0;
`;

const ProductItem = styled.li`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  transition: transform 0.2s ease, opacity 0.5s ease; // Added opacity transition

  &:hover {
    transform: scale(1.05);
  }
`;

const ProductImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const ProductTitle = styled.h3`
  font-size: 18px;
  margin: 10px 0;
`;

const ProductDescription = styled.p`
  font-size: 16px;
  color: #555;
`;

const ProductPrice = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #007bff;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  button {
    margin: 0 10px;
    padding: 10px 20px;
    font-size: 16px;
  }

  span {
    font-size: 18px;
    margin: 0 10px;
  }
`;

const ProductList = () => {
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [sortedProducts, setSortedProducts] = useState(filteredProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4; // Display 4 products per page

  const handleFilterChange = (event) => {
    const category = event.target.value;
    const filteredProducts = category === "all" ? productsData : productsData.filter(product => product.category === category);
    setFilteredProducts(filteredProducts);
    setSortedProducts(filteredProducts);
    setCurrentPage(1);
  };

  const handleSortChange = (event) => {
    const sortingMethod = event.target.value;
    const sortedProducts = [...filteredProducts];

    if (sortingMethod === "price-asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortingMethod === "price-desc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    setSortedProducts(sortedProducts);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  return (
    <Container>
      <Header>Product List</Header>
      <Filters>
        <Select onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="electronics">Electronics</option>
          <option value="apparel">Apparel</option>
          <option value="home">Home</option>
        </Select>
        <Select onChange={handleSortChange}>
          <option value="price-asc">Price (Ascending)</option>
          <option value="price-desc">Price (Descending)</option>
        </Select>
      </Filters>
      <ProductsContainer>
        {paginatedProducts.map((product) => (
          <ProductItem key={product.id}>
            <ProductImage src={product.image} alt={product.title} />
            <ProductTitle>{product.title}</ProductTitle>
            <ProductDescription>{product.description}</ProductDescription>
            <ProductPrice>${product.price}</ProductPrice>
          </ProductItem>
        ))}
      </ProductsContainer>
      <Pagination>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </Pagination>
    </Container>
  );
};

export default ProductList;
