import React, { useContext, useEffect, useState } from "react";
import { Whishlistcontext } from "../../Context/Whishlistcontext";
export default function Wishlist() {
  let [Whishlist, setWhishlist] = useState([]);
  let { getWhishlist, removewhishlist, setwhishlist } =
    useContext(Whishlistcontext);
  async function getWhish() {
    let response = await getWhishlist();
    let res = response.data.data;
    let result = res.map((item) => {
      console.log(item);
      return item;
    });
    setWhishlist(result);
  }
  async function removewhish(productId) {
    let response = await removewhishlist(productId);
    if (response?.data?.status === "success") {
      const updatedList = Whishlist.filter((item) => item._id !== productId);
      setWhishlist(updatedList);
      setwhishlist(updatedList);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      getWhish();
    }
  }, []);
  
  return (
    <>
      <div className="relative overflow-x-auto sm:rounded-lg border">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 border">
          <caption className="text-left py-3 text-2xl ms-3 font-bold border-b">
            Whishlist
          </caption>
          <tbody>
            {Whishlist?.map((product) => (
              <tr
                key={product._id}
                className="bg-white border-b hover:bg-gray-50"
              >
                <td className="p-4">
                  <img
                    src={product.imageCover}
                    className="w-16 md:w-32 max-w-full max-h-full"
                    alt={product.title}
                  />
                </td>
                <td className="px-1 py-4 font-semibold text-gray-900">
                  {product.title}
                </td>

                <td className="px-1 py-4 font-semibold text-gray-900">
                  <span className="text-green-400 font-thin">LE</span>{" "}
                  {product.price}
                </td>
                <td className="px-1 py-4">
                  <span
                    onClick={() => removewhish(product?._id)}
                    className="font-medium text-red-600 dark:text-red-500 hover:text-red-300 cursor-pointer"
                  >
                    Remove
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
