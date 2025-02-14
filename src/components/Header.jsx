import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarToggler, CardHeader } from 'reactstrap';

const Header = ({ user, page, favourites, favouriteRecipeIds }) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const navigate = useNavigate();

    function goToMenu() {
        navigate("/m", {
            state: {
                user: user,
                favourites: favourites,
                favouriteRecipeIds: favouriteRecipeIds
            }
        });
    }

    function goToDashBoard() {
        navigate("/d", {
            state: {
                user: user,
                favourites: favourites,
                favouriteRecipeIds: favouriteRecipeIds
            }
        });
    }

    function goToFavourites() {
        navigate("/f", {
            state: {
                user: user,
                favourites: favourites,
                favouriteRecipeIds: favouriteRecipeIds
            }
        });
    }

    return (
        <div>
            <CardHeader className='d-flex justify-content-between text-black'>
                <h3 onClick={goToDashBoard}><i className="bi bi-egg-fried"></i><i className="bi bi-cup-straw"></i> Recipe App</h3>
                <div className='d-flex align-items-end'>
                    <h5
                        onClick={goToMenu}
                        className={page === 2 ? 'text-info' : ''}
                        style={page === 2 ? { borderBottom: '2px solid #0dcaf0' } : {}}
                    >
                        Menu
                    </h5>
                    <h5
                        className={page === 3 ? 'text-info mx-4' : 'mx-4'}
                        onClick={goToFavourites}
                        style={page === 3 ? { borderBottom: '2px solid #0dcaf0' } : {}}
                    >
                        Favourites
                    </h5>
                    <h5>Logout</h5>
                </div>
            </CardHeader>
        </div>
    )
}

export default Header