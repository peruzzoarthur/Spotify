import { RecommendationsRequest, TrackWithAudioFeatures } from "@/types";
import { Track, Album, Artist } from "@spotify/web-api-ts-sdk";
import { createContext, useState, FC, ReactNode, useEffect } from "react";

export type CartItem = Track | Album | Artist | TrackWithAudioFeatures;

type RequestSeeds = {
  seed_tracks: string[];
  seed_genres: string[];
  seed_artists: string[];
};

type CartContextProps = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  requestSeeds: RequestSeeds;
  errorMessage: string;
  setErrorMessage: (message: string) => void;
};

export const CartContext = createContext<CartContextProps>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  requestSeeds: {
    seed_tracks: [],
    seed_genres: [],
    seed_artists: [],
  },
  errorMessage: "",
  setErrorMessage: () => {},
});

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const storedCart = localStorage.getItem("cart");
  const requestForRecommendations = localStorage.getItem("reqForRec");
  const [cart, setCart] = useState<CartItem[]>(
    storedCart ? JSON.parse(storedCart) : []
  );
  const [requestSeeds, setRequestSeeds] = useState<RequestSeeds>(
    requestForRecommendations
      ? JSON.parse(requestForRecommendations)
      : {
          seed_tracks: [],
          seed_genres: [],
          seed_artists: [],
        }
  );

  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("reqForRec", JSON.stringify(requestSeeds));
  }, [cart, requestSeeds]);

  const addToCart = (item: CartItem) => {
    if (isTrack(item) || isArtist(item)) {
      const existingItem = cart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        const message = `Seed with ID ${item.id} already exists in the Recommendation Input Cart.`;
        setErrorMessage(message);
      } else {
        if (cart.length >= 5) {
          const message =
            "You already have 5 items as seed to get your recommendations, consider deleting one of the already listed seeds...";
          setErrorMessage(message);
        } else {
          if (isTrack(item) && requestSeeds.seed_tracks) {
            setCart([...cart, item]);
            requestSeeds.seed_tracks.push(item.id);
          } else if (isArtist(item) && requestSeeds.seed_artists) {
            setCart([...cart, item]);
            requestSeeds.seed_artists.push(item.id);
          }
        }
      }
    }
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));

    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart) as CartItem[];
      const updatedCart = parsedCart.filter((item) => item.id !== itemId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    const requestForRecommendations = localStorage.getItem("reqForRec");
    if (requestForRecommendations) {
      const parsedReqForRec = JSON.parse(
        requestForRecommendations
      ) as RecommendationsRequest;
      const updatedReqForRec = {
        seed_tracks: parsedReqForRec.seed_tracks?.filter((id) => id !== itemId),
        seed_genres: parsedReqForRec.seed_genres,
        seed_artists: parsedReqForRec.seed_artists?.filter(
          (id) => id !== itemId
        ),
      };
      localStorage.setItem("reqForRec", JSON.stringify(updatedReqForRec));
    }

    setRequestSeeds((prevRequestSeeds: RequestSeeds) => ({
      ...prevRequestSeeds,
      seed_tracks: prevRequestSeeds.seed_tracks.filter((id) => id !== itemId),
      seed_artists: prevRequestSeeds.seed_artists.filter((id) => id !== itemId),
    }));
  };

  function isTrack(item: CartItem): item is Track {
    return (item as Track).type === "track";
  }

  function isArtist(item: CartItem): item is Artist {
    return (item as Artist).type === "artist";
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        requestSeeds,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
