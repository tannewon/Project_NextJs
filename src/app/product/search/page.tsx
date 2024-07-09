// SearchPage.jsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { PRODUCT_API_URL } from "@/lib/util";

const fetchData = async () => {
  const res = await fetch(
    PRODUCT_API_URL
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const SearchPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchData()
      .then((data) => {
        setData(data);
        setFilteredData(data); // Set initial filtered data
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const searchQuery = router.query.q as string;
    if (searchQuery) {
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        item.id.toString().toLowerCase().includes(searchQuery.toLowerCase().trim())
      );
      setFilteredData(filtered); // Update filtered data
    } else {
      setFilteredData(data); // Reset to original data if no search query
    }
  }, [router.query.q, data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1 style={{ color: "orange", textAlign: "center" }}>Search Products</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const searchQuery = (e.target as HTMLFormElement).search.value.trim();
          router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
        }}
        style={{ textAlign: "center" }}
      >
        <input
          type="text"
          defaultValue={(router.query.q as string) ?? ""}
          name="search"
          placeholder="Search by product name"
          style={{ padding: "10px", marginRight: "10px" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            backgroundColor: "orange",
            color: "white",
            border: "none",
          }}
        >
          Search
        </button>
      </form>
      <div
        style={{
          marginTop: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "10px",
          padding: "20px",
        }}
      >
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div key={item.id}>
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "300px", height: "250px" }}
              />
              <h3>
                {item.name}{" "}
                <Link
                  style={{ marginLeft: "150px" }}
                  href={`/product/${item.id}`}
                >
                  <button
                    style={{
                      marginTop: "10px",
                      backgroundColor: "orange",
                      padding: "10px 20px",
                      cursor: "pointer",
                      borderRadius: "4px",
                    }}
                  >
                    Detail
                  </button>
                </Link>
              </h3>
              <p style={{ color: "red" }}>{item.price}$</p>
              <p>{item.description}</p>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
