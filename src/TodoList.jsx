import React, { useEffect, useState } from 'react';
import cat from './assets/cat.png';


const TodoList = () => {

    const [inputText, setInputText] = useState("");
    const [lists, setLists] = useState([]);


    const selectItem = (event) => {
        setInputText(event.target.value);
    };

    const addItem = () => {

        if (inputText !== '') {
            let toStoreData = [...lists, inputText]
            setLists(toStoreData);
            localStorage.setItem('listsItems', JSON.stringify(toStoreData));
            setInputText("");
        }

    };

    const deleteItem = (id) => {
        let toDeleteData = lists.filter((_, i) => id !== i);
        setLists(toDeleteData);

        localStorage.setItem('listsItems', JSON.stringify(toDeleteData));
    };


    useEffect(() => {
        try {
            const storedData = JSON.parse(localStorage.getItem('listsItems')) || [];
            if (Array.isArray(storedData)) {
                setLists(storedData);
            } else {
                // If the data is not an array, set an empty array as a fallback
                setLists([]);
            }
        }
        catch (error) {
            console.error('Error parsing data from local storage:', error);
            // If there's an error parsing the data, set an empty array as a fallback
            setLists([]);
        }
    }, []);


    return (
        <div className="container">

            <img src={cat} />
            <input onChange={selectItem} value={inputText} type="text" id="listItems" name="listItems" placeholder="Milk" />
            <button onClick={addItem} id="add-button">Add to cart</button>
            <ul id="shopping-list">
                {
                    lists.map((val, i) =>
                        <span key={i}>
                            <i onClick={() => deleteItem(i)} id={i} className="fa-solid fa-xmark"></i>
                            <li>{val}</li>
                        </span>
                    )
                }
            </ul>

        </div>
    )
}



export default TodoList;
