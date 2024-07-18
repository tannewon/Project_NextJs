"use client"
import { useEffect, useState } from "react";
import { USER_API_URL } from "@/lib/util";
import { FormData } from "@/type/types";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserPage = () => {
  const [users, setUsers] = useState<FormData[]>([]);
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

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
      <h1 style={{ color: "orange" }}>User List</h1>
      <div
          onClick={() => router.push("/dashboard")}
          style={{
            backgroundColor: "grey",
            color: "white",
            border: "none",
            padding: "5px 10px",
            cursor: "pointer",
            borderRadius: "4px",
            display: "inline-block",
            width:'50px',
            marginLeft:'900px'
          }}
        >
          BACK
        </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          width: "100%",
          maxWidth: "800px",
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
     
      {users.map((user) => (
        <div
          key={user.id}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            width: "100%",
            maxWidth: "800px",
            gap: "10px",
            alignItems: "center",
            padding: "10px 0",
            borderBottom: "2px solid #ccc",
          }}
        >
          <div>{user.name}</div>
          <div>{user.email}</div>
          <div>
            <img
              src={user.avatar}
              alt={user.name}
              style={{
                width: "100px",
                height: "auto",
                borderRadius: "50px",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Link href={`/dashboard/user/${user.id}`} passHref
          
                style={{
                  width: "50px",
                  height: "40px",
                  backgroundColor: "yellow",
                  borderRadius: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#000",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                Edit
            </Link>
            <button
              style={{
                width: "50px",
                height: "40px",
                backgroundColor: "red",
                borderRadius: "5px",
                color: "#fff",
                cursor: "pointer",
                border:'none'
              }}
              onClick={() => deleteUser(user.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserPage;
