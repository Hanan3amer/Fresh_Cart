import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let Cartcontext = createContext();

export default function Cartcontextprovider(props) {
  let [cart, setCart] = useState([]);

  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function getCartItem() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((response) => response)
      .catch((error) => error);
  }

  function addTocart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        { headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  function removeCartitem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }

  function updatecart(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  async function GetCart() {
    let response = await getCartItem();
    setCart(response?.data);
  }

  function checkout(cartId, url, formval) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        {
          shippingAddress: formval,
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  function RemoveCart() {
    axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`)
      .then((response) => response)
      .catch((error) => error);
  }
  useEffect(() => {
    GetCart();
  }, []);

  return (
    <Cartcontext.Provider
      value={{
        addTocart,
        getCartItem,
        removeCartitem,
        updatecart,
        cart,
        setCart,
        checkout,
        RemoveCart,
      }}
    >
      {props.children}
    </Cartcontext.Provider>
  );
}
