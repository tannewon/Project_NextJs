"use client";
import { useEffect, useState } from "react";
import { USER_API_URL } from "@/lib/util";
import { FormData } from "@/type/types";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";

const UserPage = () => {
  const [users, setUsers] = useState<FormData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(USER_API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data: FormData[] = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id: string) => {
    try {
      const response = await fetch(`${USER_API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      // Update users state after successful deletion
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "10px 10px 350px" }}>
      <div style={{ position: "relative", width: "250px",marginBottom:'30px' }}>
            <button
              type="submit"
              style={{
                position: "absolute",
                right: "210px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "30px",
                height: "30px",
                border: "none",
                borderRadius: "15px",
                background: "transparent",
              }}
            >
              <FaSearch
                style={{ color: "gray", width: "20px", height: "20px" }}
              />
            </button>
            <input
              type="text"
              name="search"
              placeholder="Search user"
              style={{
                fontSize: "15px",
                width: "150px",
                height: "30px",
                border:'none',
                borderRadius: "10px",
                paddingRight: "45px", // Space for the button
                paddingLeft: "45px", // Space for the text from the left border
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr 2fr 1fr",
          width: "100%",
          maxWidth: "100%",
          gap: "10px",
          textAlign: "left",
          borderBottom: "2px solid orange",
        }}
      >
        <div style={{ fontWeight: "bold", padding: "10px" }}>Name</div>
        <div style={{ fontWeight: "bold", padding: "10px" }}>Email</div>
        <div style={{ fontWeight: "bold", padding: "10px" }}>Avatar</div>
        <div style={{ fontWeight: "bold", padding: "10px" }}>Actions</div>
      </div>

      {filteredUsers.map((user) => (
        <div
          key={user.id}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr 2fr 1fr",
            width: "100%",
            maxWidth: "1200px",
            gap: "10px",
            alignItems: "center",
            padding: "10px 0",
            borderBottom: "1px solid #ccc",
          }}
        >
          <div style={{ marginLeft: '10px' }}>{user.name}</div>
          <div>{user.email}</div>
          <div style={{ display: "flex", marginLeft: '10px' }}>
            <Image
              src={user.avatar}
              alt={user.name}
              width={70}
              height={70}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Link href={`/dashboard/user/edit/?id=${user.id}`} passHref>
              <CiEdit
                style={{
                  width: "30px",
                  height: "30px",
                  color: "orange",
                  cursor: "pointer",
                }}
              />
            </Link>
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0",
              }}
              onClick={() => deleteUser(user.id)}
            >
              <MdDeleteForever style={{ width: "30px", height: "30px", color: "red" }} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserPage;
