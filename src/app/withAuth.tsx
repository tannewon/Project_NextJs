// hoc/withAuth.tsx
"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

const withAuth = (WrappedComponent: any, allowedRoles: string[]) => {
  return (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const user = Cookies.get("user");
      if (user) {
        const parsedUser = JSON.parse(user);
        if (!allowedRoles.includes(parsedUser.role)) {
          router.push("/login");
        }
      } else {
        router.push("/login");
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
