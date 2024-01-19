import { Profile } from "./Profile";
import { Login } from "./Login";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useSdk } from "@/hooks/useSdk";

export const Home = () => {
  const sdk = useSdk();

  const { data, error, isFetching } = useUserProfile({ sdk });

  if (error) {
    return (
      <div>
        {error.message} {error.status}
      </div>
    );
  }

  return (
    <div>
      <div className="App">
        <header className="App-header">
          {!data ? (
            <Login />
          ) : (
            <>{isFetching ? <div>Loading...</div> : <Profile />}</>
          )}
        </header>
      </div>
    </div>
  );
};
