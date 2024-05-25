import { useState } from "react";
import useDataStore from "../store";

const Navbar = () => {
    // get data and functions from global store
    const { node, edge, nodeData } = useDataStore((state) => state);
    const [isSave, setIsSave] = useState(true)


    // Save data flow if conditions check done
    const handleSave = () => {
        if (edge !== 0 && (node - 1 === edge || node === edge)) {
            console.log("node1")

            setIsSave(true)
            localStorage.setItem("nodeData", JSON.stringify(nodeData))
        } else {
            console.log("node 2")
            setIsSave(false)
            localStorage.removeItem("nodeData")
        }
    }

    return (
        <nav className='bg-gray-300 w-full '>
            <div className='flex items-center py-2'>
                <div className='w-4/5 flex justify-center'>
                    {!isSave &&
                        <span className=" py-2 rounded-md px-3 bg-red-300">Cannot save flow</span>
                    }
                </div>
                <div className="w-1/5 flex justify-center">

                    <button onClick={handleSave} className='border border-blue-600 py-2 px-4 rounded-md bg-white text-blue-500 text-sm'>
                        Save Changes
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;