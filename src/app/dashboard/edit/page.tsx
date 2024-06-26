// pages/dashboard/edit/[id].tsx
 "use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const EditProductPage = () => {
  const router = useRouter();
  const { id } = router.query; // Lấy ID sản phẩm từ URL
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    // Fetch thông tin sản phẩm từ API khi component được render
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (productId: string | string[]) => {
    try {
      const res = await fetch(`https://6520d2b6906e276284c4b174.mockapi.io/product/${productId}`);
      if (res.ok) {
        const data = await res.json();
        setName(data.name);
        setDescription(data.description);
        setImage(data.image);
      } else {
        throw new Error("Failed to fetch product");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://6520d2b6906e276284c4b174.mockapi.io/product/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          image,
        }),
      });
      if (res.ok) {
        router.push("/dashboard"); // Redirect về dashboard sau khi chỉnh sửa thành công
      } else {
        throw new Error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    }
  };

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Image URL:
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProductPage;
