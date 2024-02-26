import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import TUser from "../schemas/users.schema";

const useGetUsersById = (id:string) => {
  return useQuery({
    queryKey: ["Users", id],
    queryFn: () =>
      axios.get<TUser>("http://localhost:1100/Users/" + id).then((res) => res.data),
  });
};

export default useGetUsersById;
