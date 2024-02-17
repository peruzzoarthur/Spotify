import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { client_id, scopes, callback, redirect_url } from "../spotify";
import { Button } from "@/components/ui/button";
import { AnalogBackground } from "@/components/background/analogBackground";
import { Container } from "@/components/Container";

export const Login = () => {
  const handleLogin = async () => {
    await SpotifyApi.performUserAuthorization(
      client_id,
      redirect_url,
      [scopes],
      callback
    );
  };

  return (
    <>
      <AnalogBackground>
        <Container className="bg-white bg-opacity-0">
          <Button
            className="items-center justify-center mt-4 text-white bg-black"
            onClick={handleLogin}
          >
            Login
          </Button>
        </Container>
      </AnalogBackground>
    </>
  );
};
