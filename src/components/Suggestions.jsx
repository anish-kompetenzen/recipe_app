import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Modal, Button, ModalHeader, ModalTitle } from 'react-bootstrap';

const Suggestions = ({ count, query, page, favourites, setFavourites, favouriteRecipeIds, setFavouriteRecipeIds }) => {

    const [suggestions, setSuggestions] = useState([]);
    const [dishCount, setDishCount] = useState(8);
    const [recipe, setRecipe] = useState({
        "publisher": "Demo Publisher",
        "ingredients": [],
        "source_url": "Demo URL",
        "recipe_id": "",
        "image_url": "Demo Imagge",
        "social_rank": 0,
        "publisher_url": "Demo URL",
        "title": "Demo Title"
    }
    );

    const words = [
        "carrot", "broccoli", "asparagus", "cauliflower", "corn", "cucumber", "green pepper",
        "lettuce", "mushrooms", "onion", "potato", "pumpkin", "red pepper", "tomato", "beetroot",
        "brussel sprouts", "peas", "zucchini", "radish", "sweet potato", "artichoke", "leek",
        "cabbage", "celery", "chili", "garlic", "basil", "coriander", "parsley", "dill", "rosemary",
        "oregano", "cinnamon", "saffron", "green bean", "bean", "chickpea", "lentil", "apple",
        "apricot", "avocado", "banana", "blackberry", "blackcurrant", "blueberry", "boysenberry",
        "cherry", "coconut", "fig", "grape", "grapefruit", "kiwifruit", "lemon", "lime", "lychee",
        "mandarin", "mango", "melon", "nectarine", "orange", "papaya", "passion fruit", "peach",
        "pear", "pineapple", "plum", "pomegranate", "quince", "raspberry", "strawberry", "watermelon",
        "salad", "pizza", "pasta", "popcorn", "lobster", "steak", "bbq", "pudding", "hamburger", "pie",
        "cake", "sausage", "tacos", "kebab", "poutine", "seafood", "chips", "fries", "masala", "paella",
        "som tam", "chicken", "toast", "marzipan", "tofu", "ketchup", "hummus", "chili", "maple syrup",
        "parma ham", "fajitas", "champ", "lasagna", "poke", "chocolate", "croissant", "arepas", "bunny chow",
        "pierogi", "donuts", "rendang", "sushi", "ice cream", "duck", "curry", "beef", "goat", "lamb", "turkey",
        "pork", "fish", "crab", "bacon", "ham", "pepperoni", "salami", "ribs"
    ];

    useEffect(() => {
        setDishCount(count);
        if (page === 3) {
            setDishCount(100);
            setFavouriteRecipeIds(favouriteRecipeIds);
            setFavourites(favourites);
            setSuggestions(favourites);
        }
        else if (query.length > 0) {
            const fetchData = async () => {
                try {
                    const response = await axios.get("https://forkify-api.herokuapp.com/api/search?q=" + query);
                    setDishCount(100);
                    setSuggestions(response.data.recipes);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        } else {
            const fetchData = async () => {
                try {
                    const randomIndex = Math.floor(Math.random() * words.length);
                    const response = await axios.get("https://forkify-api.herokuapp.com/api/search?q=" + words[randomIndex]);
                    setSuggestions(response.data.recipes);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }
    }, []);

    function toggleFavourite(item) {
        if (favouriteRecipeIds.includes(item.recipe_id)) {
            const updatedFavouriteRecipeIds = favouriteRecipeIds.filter((id) => {
                if (id !== item.recipe_id) {
                    return id;
                }
            });
            const updatedFavourites = favourites.filter((dish) => {
                if (dish.recipe_id !== item.recipe_id) {
                    return dish;
                }
            });
            setFavouriteRecipeIds(updatedFavouriteRecipeIds);
            setFavourites(updatedFavourites);
        } else {
            setFavouriteRecipeIds([...favouriteRecipeIds, item.recipe_id]);
            setFavourites([...favourites, item]);
        }
    }

    function toTitleCase(str) {
        return str
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    function decodeHtml(html) {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.documentElement.textContent || doc.body.textContent;
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function handleView(recipeId) {
        handleShow();
        try {
            const response = await axios.get("https://forkify-api.herokuapp.com/api/get?rId=" + recipeId);
            setRecipe(response.data.recipe);
        } catch (error) {
            console.log("Error : " + error);
        }
    }

    return (
        <>
            <div className="container-fluid px-5">
                <Modal show={show} onHide={handleClose}>
                    <ModalHeader className='card p-0 m-0'>
                        <img src={recipe.image_url} alt="Dish Image" className='' style={{ width: "450px" }} />
                        <ModalTitle className='px-2'>
                            <span>{decodeHtml(toTitleCase(recipe.title))}</span>
                        </ModalTitle>
                    </ModalHeader>
                    <Modal.Body>
                        <h6>Ingredients + Steps to Cook Dish</h6>
                        <ul>
                            {recipe.ingredients.map((item, index) => {
                                return (
                                    <li key={index}>{item}</li>
                                );
                            })}
                        </ul>
                    </Modal.Body>
                </Modal>
                <div className="row">
                    {suggestions.map((item, index) => {
                        if (index < dishCount) {
                            return (
                                <div className="col-md-3" key={index}>
                                    <div className="card mb-4">
                                        <img src={item.image_url} className="card-img-top" alt={item.title} style={{ height: "200px", objectFit: "cover" }} />
                                        <div className="card-body">
                                            <div className='d-flex justify-content-between'>
                                                <h5 className="card-title">{decodeHtml(toTitleCase(item.title))}</h5>
                                                <span style={{ fontSize: "30px" }} className='align-top'
                                                    onClick={() => handleView(item.recipe_id)}>{"👁️"}</span>
                                            </div>
                                            <p className="card-text"><strong>Publisher:</strong> {item.publisher}</p>
                                            <p className="card-text"><strong>Rating:</strong> {Number.parseInt(item.social_rank)}</p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <a href={item.source_url} target='_blank' className='fw-bold'>Check it out</a>
                                                <span onClick={() => toggleFavourite(item)} style={{ fontSize: "20px" }}>
                                                    {favouriteRecipeIds.includes(item.recipe_id) ?
                                                        <span>{"❤️"}</span> : <span>{"🩶"}</span>}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
        </>
    )
}

export default Suggestions