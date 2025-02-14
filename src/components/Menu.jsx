import React, { useState } from 'react'
import Suggestions from './Suggestions'
import Header from './Header'
import { Button, Card, CardBody, Form, FormControl } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'

const Menu = () => {

    const location = useLocation();
    const [favourites, setFavourites] = useState(location?.state?.favourites ? location?.state?.favourites : []);
    const [favouriteRecipeIds, setFavouriteRecipeIds] = useState(location?.state?.favouriteRecipeIds ? location?.state?.favouriteRecipeIds : []);

    const [user, setUser] = useState(location?.state?.user || {
        userName: "",
        userEmail: "",
        userPass: ""
    });

    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");

    function handleSearch(event) {
        event.preventDefault();
        setQuery(keyword);
    }

    return (
        <div>
            <Card>
                <Header user={user} page={2} favourites={favourites} favouriteRecipeIds={favouriteRecipeIds} />
                <CardBody style={{ height: "auto" }}>
                    <Form method='post' onSubmit={handleSearch} className='container w-50 mb-2 d-flex btn-group'>
                        <FormControl value={keyword} onChange={(event) => setKeyword(event.target.value)}
                            placeholder='Search recipes using keywords here' autoFocus className='btn' style={{ border: "1px solid black" }} />
                        <Button type='submit'><i className="bi bi-search"></i></Button>
                    </Form>
                    <Suggestions count={8} query={query} page={2}
                        favourites={favourites} setFavourites={setFavourites}
                        favouriteRecipeIds={favouriteRecipeIds} setFavouriteRecipeIds={setFavouriteRecipeIds}
                    />
                </CardBody>
            </Card>
        </div>
    )
}

export default Menu