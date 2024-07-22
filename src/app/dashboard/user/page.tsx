"use client";
import { useEffect, useState } from "react";
import { USER_API_URL } from "@/lib/util";
import { FormData } from "@/type/types";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdDeleteForever, MdOutlineModeEdit } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

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
            <Image
              src={user.avatar}
              alt={user.name}
              width={100} // Set appropriate width
              height={100}
              style={{
                borderRadius: "50%",
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
                }}
              />
            </Link>
            <button
              style={{
                color: "red",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => deleteUser(user.id)}
            >
              <MdDeleteForever style={{ width: "30px", height: "30px" }} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserPage;
