"use client";
import Image from "next/image";
import React from "react";
import Img from "../../../public/images.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faTrash,
    faTimes,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthStore } from "@/store/auth";
import { getItems, addMenuItem, editMenuItemServer, deleteMenuItem } from "@/actions/items/items";
import toast from "react-hot-toast";

interface MenuItem {
    id: number;
    name: string;
    price: number;
    stock: number;
    category: "mainCourse" | "snacks";
    image: string;
    image_id: string;
    description?: string | null;
    is_veg: boolean;
}

interface editMenuItem {
    name: string;
    price: string;
    stock: string;
    category: string; // Default category
    image: File | null;
    description: string;
}

function Page() {
    const { user } = useAuthStore();
    const [popup, setPopup] = React.useState(false);
    const [items, setItems] = React.useState<MenuItem[]>([]);
    const [isEdit, setIsEdit] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState<MenuItem | null>(
        null
    );
    const [saveOrEditItem, setSaveOrEditItem] = React.useState(false);
    const [inItem, setInItem] = React.useState({
        name: "",
        price: "",
        stock: "",
        category: "mainCourse", // Default category
        is_veg:'true',
        image: null as File | null,
        description: "",
    });
    const [newEditedOrSaveItem, setNewEditedOrSaveItem] =
        React.useState<editMenuItem >({
            name: "",
            price: "",
            stock: "",
            category: "mainCourse", // Default category
            image: null as File | null,
            description: "",
        });
    const popUpwindowHandeler = (item: MenuItem) => {
        setSelectedItem(item);
        setNewEditedOrSaveItem({
            name: item.name,
            price: String(item.price),
            stock: String(item.stock),
            category: item.category, // Default category
            image: null as File | null,
            description: item.description ?? "",
        })
        
        setPopup((prev) => !prev);
    };

    const closePopup = () => {
        setPopup((prev) => !prev);
    };

    const handleDeleteItem = async (id: string) => {
        
        deleteMenuItem(Number(id)).then((res)=>{
            if(res.success){
                toast.success(res.message);
                closePopup()
                fetchItems();
            }
            else{
                toast.error(res.message);
            }
        })
    };
    const fetchItems = async () => {
        const item = await getItems();
        setItems(item ?? []);
    };

    const handleEditOrSaveItem = async () => {
        setSaveOrEditItem((prev) => !prev);
  
        if(saveOrEditItem){
            const fItem=new FormData();
            console.log(newEditedOrSaveItem);
            Object.entries(newEditedOrSaveItem).forEach(([key, value]) => {
                if(value){
                    fItem.append(key, value);
                }
            })
            fItem.append("id",String(selectedItem?.id));
            editMenuItemServer(fItem).then((res)=>{
                if(res.success){
                    toast.success(res.message);
                    fetchItems();
                    closePopup()
                }else{
                    toast.error(res.message);
                }

                
            })
            
        }
       
        
    };

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;

        // Type guard to check if e.target is an HTMLInputElement and has files
        if (
            name === "image" &&
            e.target instanceof HTMLInputElement &&
            e.target !== null &&
            e.target.files
        ) {
            const input = e.target as HTMLInputElement; // Type assertion here
            const file = input.files != null ? input?.files[0] : null;
            if (!file) return;
            setInItem((prevItem) => ({
                ...prevItem,
                [name]: file,
            }));
        }
        // else if(name==='is_veg'){
        //     if(value==='true'){
        //         setInItem((prevItem) => ({ ...prevItem, [name]:  }));
        //     }else{
        //         setInItem((prevItem) => ({ ...prevItem, [name]: false }));
        //     }
        // }
         else {
            setInItem((prevItem) => ({ ...prevItem, [name]: value }));
        }
    };

    const handleAddItem = async () => {
        const formData = new FormData();
        Object.entries(inItem).forEach(([key, value]) => {
            if (!value ) return;
            
            else if (value instanceof Blob) formData.append(key, value);
            else formData.append(key,value);
        });
        
        addMenuItem(formData).then((res)=>{
            if(res.success){
                alert(formData.get("is_veg"))
                toast.success(res.message);
                fetchItems();
                
            }
            else{
                toast.error(res.message);
            }
        }).finally(()=>{
            setInItem({
                name: "",
                price: "",
                stock: "",
                category: "mainCourse", // Default category
                image: null ,
                description: "",
                is_veg:'true'
            });
        })
        
        
    };

    const editOrSaveInputHandler=async(e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >)=>{
            const {value,name}=e.target;
        setNewEditedOrSaveItem((prev) =>{
            let updated;
            if(e.target instanceof HTMLInputElement && e.target.files && e.target.files.length>0){
                const file=e.target?.files[0];
                updated={...prev,[name]:file};
            }
            else updated = { ...prev, [name]: value };
           
            
            return updated
        });
        // console.log(newEditedOrSaveItem);
        
    }

    React.useEffect(() => {
        fetchItems();
    }, []);

    /*
    
    className=""
    
    */

    return (
        <div className="px-10">
            <div className=" mt-32 flex flex-col-reverse grid-cols-1 md:grid md:grid-cols-2">
                <div className="  flex flex-col items-center justify-center">
                    <p className="text-xl mb-8 md:mb-16">Are you Hungry?</p>
                    <p className="text-2xl md:text-6xl font-bold md:font-extrabold mb-10 md:mb-28">{`Don't wait!`}</p>
                    <div className="flex justify-center align-center">
                        <div className="flex items-center justify-center p-5 md:p-9 rounded-r-full rounded-l-full h-16 md:h-10 w-36 md:w-48 text-center bg-orange-600 mr-5 md:ml-5">
                            Order Now
                        </div>
                        <div className="flex items-center justify-center p-5 md:p-9 rounded-r-full rounded-l-full h-16 md:h-10 w-36 md:w-48 text-center bg-pink-600 md:mr-5">
                            Go to cart
                        </div>
                    </div>
                </div>
                <div className="flex items-center mb-10 justify-center">
                    <Image
                        src={Img}
                        alt="image"
                        className="w-56 h-56 md:w-96 md:h-96   rounded-full"
                    />
                </div>
            </div>

            <div>
                <h1 className=" md:mt-0 mt-10 border-y-4 md:w-36 text-center font-bold text-3xl">
                    All Items
                </h1>
                <div className="pt-10">
                    {user?.isAdmin &&
                        (isEdit ? (
                            <div className="mb-4 flex flex-col justify-center items-center p-4 border rounded-lg bg-gray-800 text-black">
                                <button
                                    className="relative mb-5 bg-red-500 text-white px-4 py-2 rounded-md"
                                    onClick={() => setIsEdit(() => !isEdit)}
                                >
                                    close
                                </button>
                                <h3 className="text-lg md:text-3xl md:mb-5 font-semibold mb-2 text-white text-center">
                                    Add New Item
                                </h3>
                                <label
                                    htmlFor="name"
                                    className="text-white text-start text-xl font-semibold w-full mb-2"
                                >
                                    Enter name of Dish
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    value={inItem.name}
                                    onChange={handleInputChange}
                                    className="p-2 border rounded-md w-full mb-2"
                                />
                                <label
                                    htmlFor="price"
                                    className="text-white text-start text-xl font-semibold w-full mb-2"
                                >
                                    Enter price of Dish
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    id="price"
                                    placeholder="Price"
                                    value={inItem.price}
                                    onChange={handleInputChange}
                                    className="p-2 border rounded-md w-full mb-2"
                                />
                                <label
                                    htmlFor="stock"
                                    className="text-white text-start text-xl font-semibold w-full mb-2"
                                >
                                    Enter stock of Dish
                                </label>
                                <input
                                    type="number"
                                    name="stock"
                                    id="stock"
                                    placeholder="Stock"
                                    value={inItem.stock}
                                    onChange={handleInputChange}
                                    className="p-2 border rounded-md w-full mb-2"
                                />
                                <label
                                    htmlFor="category"
                                    className="text-white text-start text-xl font-semibold w-full mb-2"
                                >
                                    Enter the type of Dish
                                </label>
                                <select
                                    name="is_veg"
                                    value={`${inItem.is_veg}`}
                                    onChange={handleInputChange}
                                    className="p-2 border rounded-md w-full mb-2"
                                >
                                    <option value={`true`}>Veg</option>
                                    <option value={`false`}>Non-Veg</option>
                                </select>
                                <label
                                    htmlFor="category"
                                    className="text-white text-start text-xl font-semibold w-full mb-2"
                                >
                                    Enter categorys of Dish
                                </label>
                                <select
                                    name="category"
                                    value={inItem.category}
                                    onChange={handleInputChange}
                                    className="p-2 border rounded-md w-full mb-2"
                                >
                                    <option value={`mainCourse`}>
                                        Main Course
                                    </option>
                                    <option value={`snacks`}>Snacks</option>
                                </select>
                                <label
                                    htmlFor="image"
                                    className="text-white text-start text-xl font-semibold w-full mb-2"
                                >
                                    Enter price of Dish
                                </label>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    placeholder="Image URL"
                                    // value={inItem.image}
                                    onChange={handleInputChange}
                                    className="p-2 border rounded-md w-full mb-2"
                                />
                                {/* <input
                                    type="text"
                                    name="image"
                                    placeholder="Image URL"
                                    value={inItem.image}
                                    onChange={handleInputChange}
                                    className="p-2 border rounded-md w-full mb-2"
                                /> */}
                                <label
                                    htmlFor="description"
                                    className="text-white text-start text-xl font-semibold w-full mb-2"
                                >
                                    Enter description of Dish
                                </label>
                                <textarea
                                    name="description"
                                    id="description"
                                    placeholder="Description"
                                    value={inItem.description}
                                    onChange={handleInputChange}
                                    className="p-2 border rounded-md w-full mb-2 "
                                ></textarea>
                                <button
                                    onClick={handleAddItem}
                                    className="bg-green-500 text-white px-4 w-36  py-2 rounded-md"
                                >
                                    <FontAwesomeIcon icon={faPlus} /> Add Item
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsEdit(() => !isEdit)}
                                className="bg-green-500 text-white px-4 w-36  py-2 rounded-md mb-6"
                            >
                                {" "}
                                Add New Item{" "}
                            </button>
                        ))}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                        {items.map((item, i) => (
                            <div
                                className="border-2 rounded-xl mb-10 md:mx-5 border-green-500 w-72 h-96 flex flex-col items-center justify-around"
                                key={i}
                            >
                                <div className=" bg-blue-700">
                                    <Image
                                        src={item.image}
                                        alt="image"
                                        height={1000}
                                        width={1000}
                                        className=" w-56 h-52"
                                    />
                                </div>
                                <p className="text-2xl font-bold">
                                    {item.name}
                                </p>
                                <p
                                    className="text-xl font-semibold text-blue-600 cursor-pointer"
                                    onClick={() => popUpwindowHandeler(item)}
                                >
                                    Show More
                                </p>
                                <div className="flex items-center justify-between  w-3/4">
                                    <p className="text-lg  font-semibold">
                                        ₹ {item.price}
                                    </p>
                                    <p
                                        className={`${item.is_veg ? "bg-green-600" : "bg-red-600"} w-5 h-5 min-h-5 min-w-5`}
                                    ></p>
                                    <button className="bg-orange-200 text-orange-800 border-orange-800 px-6 rounded-full border-4 py-2">
                                        +Add
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {popup && (
                        <div className="fixed inset-0 text-black bg-black bg-opacity-50 flex justify-center items-center">
                            <div className="bg-slate-700 p-6 rounded-lg w-96 relative">
                                <button
                                    className={`absolute top-2 right-2 text-xl text-red-500 hover:text-black ${saveOrEditItem ? "hidden" : ""}`}
                                    onClick={closePopup}
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                                <input
                                    className="text-2xl font-bold mb-2 bg-transparent"
                                    name="name"
                                    readOnly={!saveOrEditItem}
                                    disabled={!saveOrEditItem}
                                    value={newEditedOrSaveItem?.name}
                                    onChange={(e) => editOrSaveInputHandler(e)}
                                />

                                <div className="relative w-full h-40">
                                    <label
                                        className={`fixed text-3xl cursor-pointer ${!saveOrEditItem ? "hidden" : ""}`}
                                        htmlFor="up-image"
                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                    </label>
                                    <input
                                        type="file"
                                        name="up-image"
                                        id="up-image"
                                        readOnly={!saveOrEditItem}
                                        disabled={!saveOrEditItem}
                                        className="hidden"
                                        onChange={(e) =>
                                            editOrSaveInputHandler(e)
                                        }
                                    />
                                    <Image
                                        src={selectedItem?.image as string}
                                        alt={"selectedItem.name"}
                                        height={150}
                                        width={150}
                                        objectFit="cover"
                                        className="rounded-md mx-auto"
                                    />
                                </div>
                                <textarea
                                    name="description"
                                    id="description"
                                    readOnly={!saveOrEditItem}
                                    disabled={!saveOrEditItem}
                                    className="text-center text-zink-900 bg-transparent mb-2 w-full"
                                    value={
                                        newEditedOrSaveItem?.description ?? ""
                                    }
                                    onChange={(e) => editOrSaveInputHandler(e)}
                                ></textarea>
                                <div>
                                    ₹{`${!saveOrEditItem}`}
                                    <input
                                        className="text-lg font-semibold bg-transparent ml-2"
                                        name="price"
                                        value={newEditedOrSaveItem?.price}
                                        onChange={(e) =>
                                            editOrSaveInputHandler(e)
                                        }
                                        readOnly={!saveOrEditItem}
                                        disabled={!saveOrEditItem}
                                    />
                                </div>

                                <p
                                    className={
                                        selectedItem?.is_veg === true
                                            ? "text-green-600 text-bold text-lg"
                                            : "text-red-600 text-bold text-lg"
                                    }
                                >
                                    {selectedItem?.category}
                                </p>
                                <p className="text-sm py-1">
                                    Stock:{" "}
                                    <input
                                        type="text"
                                        name="stock"
                                        className={`bg-transparent ml-2`}
                                        value={newEditedOrSaveItem?.stock}
                                        onChange={(e) =>
                                            editOrSaveInputHandler(e)
                                        }
                                        readOnly={!saveOrEditItem}
                                        disabled={!saveOrEditItem}
                                    />
                                </p>
                                {user?.isAdmin && (
                                    <div className="flex justify-between mt-4">
                                        {saveOrEditItem ? (
                                            <button
                                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                                onClick={handleEditOrSaveItem}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faEdit}
                                                />{" "}
                                                Save
                                            </button>
                                        ) : (
                                            <button
                                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                                onClick={handleEditOrSaveItem}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faEdit}
                                                />{" "}
                                                Edit
                                            </button>
                                        )}
                                        <button
                                            onClick={() =>
                                                handleDeleteItem(`${selectedItem?.id}`)
                                            }
                                            className="bg-red-500 text-white px-4 py-2 rounded-md"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />{" "}
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Page;
