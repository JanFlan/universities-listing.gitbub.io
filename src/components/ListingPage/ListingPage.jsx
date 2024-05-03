import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import APIService from "../../services/APIService";

const ListingPage = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await APIService.fetchItems();
                if (data.length === 0) {
                    setErrorMessage("No data found");
                } else {
                    setItems(data);
                    setFilteredItems(data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setErrorMessage("Failed to fetch data");
            }
        };

        fetchData();
    }, []);

    /**
     * Handles the click event on an item in the list, navigating to the details page for that item
     * @param {Object} item - The item object representing the clicked item
     */
    const handleItemClick = (item) => {
        history.push({
            pathname: `/details/${encodeURIComponent(item.name)}`,
            state: { item },
        });
    };

    /**
     * Sorts the items based on the specified direction and updates the filtered items state
     * @param {"ASC" | "DESC"} direction - The direction in which to sort the items ("ASC" for ascending and "DESC" for descending)
     */
    const handleSort = (direction) => {
        const sortedItems = [...filteredItems].sort((a, b) => (
            direction === "ASC" ?
                a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name)
        ));
        setFilteredItems(sortedItems);
    };

    /**
     * Handles the search functionality by filtering items based on the search term
     * @param {React.ChangeEvent<HTMLInputElement>} event - The event object representing the change in the input field
     */
    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTerm(searchTerm);
        const filteredItems = items.filter((item) => item.name.toLowerCase().includes(searchTerm));
        setFilteredItems(filteredItems);
        if (filteredItems.length === 0) {
            setErrorMessage("No matching items found");
        } else {
            setErrorMessage("");
        }
    };

    /**
     * Handles the deletion of an item from the universities" list
     * @param {React.MouseEvent<HTMLButtonElement>} event - The event object representing the click event on the delete button
     * @param {number} index - The index of the item to be deleted
     */
    const handleDelete = (event, index) => {
        event.stopPropagation(); // Stop event propagation so row clicking can be ignored on button pressing
        const updatedItems = [...filteredItems];
        updatedItems.splice(index, 1);
        setFilteredItems(updatedItems);
        if (updatedItems.length === 0) {
            setErrorMessage("No items remaining");
        } else {
            setErrorMessage("");
        }
    };


    return (
        <div>
            <h1>Universities</h1>
            <div className="search-bar-container">
                <input className="search-bar" type="text" placeholder="Search" value={searchTerm} onChange={handleSearch} />
                <div className="sort-container">
                    <button className="sort-button" onClick={() => handleSort("ASC")}>Sort Ascending</button>
                    <button className="sort-button" onClick={() => handleSort("DESC")}>Sort Descending</button>
                </div>
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <ul>
                {filteredItems.map((item, index) => (
                    <li key={item.name} className="list-item">
                        <div onClick={() => handleItemClick(item)} className="item-name">
                            {item.name}
                            <button className="delete-button" onClick={(event) => handleDelete(event, index)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListingPage;
