import React, { useState } from 'react'
import { Card, CardBody } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Suggestions from './Suggestions';

const Dashboard = () => {

    const location = useLocation();
    const [favourites, setFavourites] = useState(location?.state?.favourites ? location?.state?.favourites : []);
    const [favouriteRecipeIds, setFavouriteRecipeIds] = useState(location?.state?.favouriteRecipeIds ? location?.state?.favouriteRecipeIds : []);

    const [user, setUser] = useState(location?.state?.user || {
        userName: "",
        userEmail: "",
        userPass: ""
    });

    return (
        <Card>
            <Header user={user} page={1} favourites={favourites} favouriteRecipeIds={favouriteRecipeIds} />
            <CardBody style={{ height: "auto" }}>
                <div className='px-4 pt-1'>
                    <h3 className='ps-3 pb-2'>Hi {user.userName}, Here are today's recipe suggestions!</h3>
                    <Suggestions count={8} query={""} page={1}
                        favourites={favourites} setFavourites={setFavourites}
                        favouriteRecipeIds={favouriteRecipeIds} setFavouriteRecipeIds={setFavouriteRecipeIds}
                    />
                </div>
            </CardBody>
        </Card>
    )
}

export default Dashboard