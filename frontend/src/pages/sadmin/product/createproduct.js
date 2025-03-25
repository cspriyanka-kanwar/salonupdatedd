import { useState } from "react";
import axios from "../../../api/axiosConfig";
import SAAdminLayout from "../../../layouts/Salonadmin";
import { FaBox, FaPlus, FaMinus, FaBarcode } from "react-icons/fa";

const brands = {
    "L'Oreal": ["Shampoo", "Conditioner", "Hair Mask"],
    "Nivea": ["Moisturizer", "Face Wash", "Sunscreen"],
    "O.P.I": ["Nail Polish", "Nail Extensions"],
};

function AllProducts() {
    const [name, setName] = useState("");
    const [search, setSearch] = useState("");
    const [phone, setPhone] = useState("");
    const [price, setPrice] = useState("");
    const [inclusiveTax, setInclusiveTax] = useState(false);
    const [mrp, setMrp] = useState("");
    const [hsnCode, setHsnCode] = useState("");
    const [barcode, setBarcode] = useState("");
    const [brand, setBrand] = useState("");
    const [subcategory, setSubcategory] = useState("");
    const [stock, setStock] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [measurement, setMeasurement] = useState("");
    const [tax, setTax] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [message, setMessage] = useState("");
    const [isConsumable, setIsConsumable] = useState(null);
    const [isRetail, setIsRetail] = useState(null);

    const handleImageChange = (e) => {
        setImages([...e.target.files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.append("name", name);
            formData.append("phone", phone);
            formData.append("price", price);
            formData.append("inclusiveTax", inclusiveTax);
            formData.append("mrp", mrp);
            formData.append("hsnCode", hsnCode);
            formData.append("barcode", barcode);
            formData.append("brand", brand);
            formData.append("subcategory", subcategory);
            formData.append("stock", stock);
            formData.append("quantity", quantity);
            formData.append("measurement", measurement);
            formData.append("tax", tax);
            formData.append("description", description);
            formData.append("isConsumable", isConsumable);
            formData.append("isRetail", isRetail);
            images.forEach((image) => formData.append("images", image));

            const response = await axios.post("/products/create", formData, {
                headers: { Authorization: token, "Content-Type": "multipart/form-data" },
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <SAAdminLayout>
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full sm:w-96 space-y-6">
                    <div className="flex justify-center mb-6">
                        <FaBox className="text-4xl text-blue-500" />
                    </div>

                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Add 🛒 Product</h1>

                    {message && <p className="text-red-500 text-center mb-4">{message}</p>}
                    
                    <input
                        type="text"
                        placeholder="Search Product"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full p-3 border rounded-md"
                    />
                    
                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-3 border rounded-md"
                    />

                    <input
                        type="text"
                        placeholder="Product Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 border rounded-md"
                    />

                    <div className="flex space-x-4">
                        <label>Consumable:</label>
                        <label>
                            <input type="radio" value="Yes" checked={isConsumable === "Yes"} onChange={() => setIsConsumable("Yes")} /> Yes
                        </label>
                        <label>
                            <input type="radio" value="No" checked={isConsumable === "No"} onChange={() => setIsConsumable("No")} /> No
                        </label>
                    </div>

                    <div className="flex space-x-4">
                        <label>Retail:</label>
                        <label>
                            <input type="radio" value="Yes" checked={isRetail === "Yes"} onChange={() => setIsRetail("Yes")} /> Yes
                        </label>
                        <label>
                            <input type="radio" value="No" checked={isRetail === "No"} onChange={() => setIsRetail("No")} /> No
                        </label>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                        <input
                            type="number"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full p-3 border rounded-md"
                        />
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" checked={inclusiveTax} onChange={(e) => setInclusiveTax(e.target.checked)} />
                            <span>Price Inclusive of Tax</span>
                        </label>
                        <input
                            type="number"
                            placeholder="MRP"
                            value={mrp}
                            onChange={(e) => setMrp(e.target.value)}
                            className="w-full p-3 border rounded-md"
                        />
                        <input
                            type="text"
                            placeholder="HSN Code"
                            value={hsnCode}
                            onChange={(e) => setHsnCode(e.target.value)}
                            className="w-full p-3 border rounded-md"
                        />
                        <input
                            type="text"
                            placeholder="Barcode"
                            value={barcode}
                            onChange={(e) => setBarcode(e.target.value)}
                            className="w-full p-3 border rounded-md"
                        />
                        <button type="button" className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-md">
                            <FaBarcode className="mr-2" /> Generate Barcode
                        </button>
                        <button
                            type="submit"
                            className="w-full p-3 bg-green-500 text-white font-bold rounded-md"
                        >
                            Add Product
                        </button>
                    </form>
                </div>
            </div>
        </SAAdminLayout>
    );
}

export default AllProducts;  