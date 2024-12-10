import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/images/assets";
import CartTotal from "../components/CartTotal";
import { toast } from "react-toastify";
import axios from "axios";

export default function Cart() {
  const {
    products,
    currency,
    cartItems,
    updateQuantity,
    navigate,
    token,
    backendUrl,
    negotiations,
  } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [offerPrice, setOfferPrice] = useState("");

  // Update cartData saat cartItems berubah
  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  // Fungsi untuk cek status negosiasi produk
  const getNegotiationStatus = (productId) => {
    const negotiation = negotiations.find(
      (neg) => neg.product._id === productId
    );
    return negotiation || { status: "No Negotiation", offeredPrice: null };
  };

  const handleNegotiation = async () => {
    if (!offerPrice || isNaN(offerPrice) || offerPrice <= 0) {
      toast.error("Masukkan harga tawaran yang valid.");
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/negotiation`,
        {
          productId: selectedItem._id,
          offeredPrice: Number(offerPrice),
        },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Negosiasi berhasil dikirim!");
        setShowModal(false);
        setOfferPrice("");
        setSelectedItem(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan saat mengirim negosiasi.");
    }
  };

  // Hitung total harga untuk semua item di keranjang, memperhitungkan status negosiasi
  const totalCartPrice = cartData.reduce((total, item) => {
    const productData = products.find((product) => product._id === item._id);
    const negotiationStatus = getNegotiationStatus(item._id);
    // Gunakan harga tawaran jika status negosiasi sudah diterima
    const finalPrice =
      negotiationStatus.status === "accepted"
        ? negotiationStatus.offeredPrice
        : productData.price;

    return total + finalPrice * item.quantity;
  }, 0);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title title={"Your"} subtitle={"Cart"} />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );
          const negotiationStatus = getNegotiationStatus(item._id);
          const finalPrice =
            negotiationStatus.status === "accepted"
              ? negotiationStatus.offeredPrice
              : productData.price;
          const totalPrice = finalPrice * item.quantity;

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_2fr_1fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img src={productData.image[0]} className="w-24" alt="" />
                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {finalPrice}
                    </p>{" "}
                    {/* Harga yang sudah disesuaikan */}
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <input
                  onChange={(e) =>
                    e.target.value === "" || e.target.value === "0"
                      ? null
                      : updateQuantity(
                          item._id,
                          item.size,
                          Number(e.target.value)
                        )
                  }
                  type="number"
                  className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                  defaultValue={item.quantity}
                  min={1}
                />
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    setSelectedItem(item);
                    setShowModal(true);
                  }}
                  className="bg-blue-500 text-white text-sm px-4 py-1 rounded"
                >
                  Negotiate
                </button>
                <img
                  onClick={() =>
                    updateQuantity(item._id, item.size, item.quantity - 1)
                  }
                  src={assets.bin_icon}
                  className="w-4 cursor-pointer sm:w-5"
                  alt="Hapus"
                />
              </div>
              <div className="text-sm text-gray-600">
                Status: {negotiationStatus.status}
              </div>
              <div className="text-sm text-gray-600">
                Total: {currency}
                {totalPrice.toFixed(2)} {/* Total harga per item */}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          {/* CartTotal Component */}
          <CartTotal total={totalCartPrice} currency={currency} />{" "}
          {/* Panggil CartTotal dengan total */}
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Negotiation */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-[90%] max-w-md">
            <h2 className="text-lg font-bold mb-4">Tawar Harga</h2>
            <input
              type="number"
              placeholder="Masukkan harga tawaran"
              className="border p-2 w-full mb-4"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  setOfferPrice("");
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Batal
              </button>
              <button
                onClick={handleNegotiation}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Kirim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
