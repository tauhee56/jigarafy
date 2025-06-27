import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";

const useAuthUser = () => {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false, // auth check
  });

  // Temporarily make all users admin to access the admin panel
  const user = authUser.data?.user ? { ...authUser.data.user, isAdmin: true } : null;
  return { isLoading: authUser.isLoading, authUser: user };
};
export default useAuthUser;
