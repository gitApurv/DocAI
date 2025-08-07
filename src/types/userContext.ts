import User from "./user";

interface UserContextType {
  userDetails: User | undefined;
  setUserDetails: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export default UserContextType;
