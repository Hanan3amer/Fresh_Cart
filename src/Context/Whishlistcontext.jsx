import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let Whishlistcontext = createContext();

export default function Whishlistcontextprovider(props) {
  let [whishlist, setwhishlist] = useState([]);

  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function addTowhishlist(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId },
        { headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  function getWhishlist() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
      .then((response) => response)
      .catch((error) => error);
  }

  async function Getwhishlist() {
    let response = await getWhishlist();
    setwhishlist(response?.data);
  }

  function removewhishlist(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }

  useEffect(() => {
    Getwhishlist();
  }, []);
  return (
    <Whishlistcontext.Provider
      value={{
        addTowhishlist,
        whishlist,
        setwhishlist,
        getWhishlist,
        removewhishlist,
      }}
    >
      {props.children}
    </Whishlistcontext.Provider>
  );
}
