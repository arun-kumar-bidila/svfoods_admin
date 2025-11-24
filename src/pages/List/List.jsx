import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./List.css";

const List = () => {
  const [list, setList] = useState([]);
  const url = "http://localhost:4000";

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/listfood`);

      if (response.data.success) {
        setList(response.data.data);
        // toast.success("data fetched");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/removefooditem`, {
        id: foodId,
      });
      await fetchList();

      if (response.data.success) {
        toast.success("Item Deleted");
         
        
      } else {
        toast.error("Error in getting response");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div className="list-table-format" key={index}>
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p className="cursor" onClick={() => removeFood(item._id)}>
                x
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
