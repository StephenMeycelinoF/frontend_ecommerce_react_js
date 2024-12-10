import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "IDR";
  const deliver_fee = 1000;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [negotiations, setNegotiations] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  // Ambil data produk
  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products); // Simpan produk
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Ambil data negosiasi
  const fetchNegotiations = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/negotiation`, {
        headers: { token },
      });

      if (response.data.success) {
        setNegotiations(response.data.data); // Simpan data negosiasi di state
      }
    } catch (error) {
      console.error("Failed to fetch negotiations:", error);
    }
  };

  // Fungsi untuk mendapatkan jumlah total cart
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalCount += cartItems[items][item];
        }
      }
    }
    return totalCount;
  };

  // Fungsi untuk mendapatkan total amount (harga) cart
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          // Cek negosiasi untuk produk ini
          const negotiation = negotiations.find(
            (neg) => neg.product._id === items
          );
          
          const finalPrice =
            negotiation && negotiation.status === "accepted"
              ? negotiation.offeredPrice
              : itemInfo.price; 
          totalAmount += finalPrice * cartItems[items][item];
        }
      }
    }
    return totalAmount;
  };

  // Fungsi untuk menambah produk ke cart
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  // Fungsi untuk mengupdate quantity produk di cart
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  // Fungsi untuk mendapatkan data cart user
  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Ambil data saat pertama kali render
  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchNegotiations(); // Ambil data negosiasi ketika ada token
    }
  }, [token]);

  // Value yang diberikan ke context
  const value = {
    products,
    currency,
    deliver_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    negotiations,
    token,
    setToken,
    navigate,
    backendUrl,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
