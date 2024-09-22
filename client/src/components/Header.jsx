import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineSearch } from "react-icons/ai"
import { FaMoon , FaSun } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { toggleTheme } from '../redux/theme/themeSlice'
import { signoutSuccess } from '../redux/user/userSlice'

export default function Header() {

    const handleSignout = async () => {
        try {
          const res = await fetch('/api/user/signout', {
            method: 'POST',
          });
          const data = await res.json();
          if (!res.ok) {
            console.log(data.message);
          } else {
            dispatch(signoutSuccess());
          }
        } catch (error) {
          console.log(error.message);
        }
      };

    const path = useLocation().pathname;
    const { currentUser } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const {theme}= useSelector((state) => state.theme)

    return (
        <Navbar className='border-b-2'>
            <Link to="/" className='self-center text-sm sm:text-xl font-semibold dark:text-white'>
                <div className='px-2 py-1 bg-blue-800 rounded-lg text-white'>BlogMania</div>
            </Link>

            <form >
                <TextInput type='text' placeholder='search' rightIcon={AiOutlineSearch} className='hidden lg:inline' />
            </form>
            <Button className='w-12 h-10  lg:hidden' color="gray" pill><AiOutlineSearch /></Button>

            <div className='flex gap-2 md:order-2'>
                <Button className='w-12 h-10 hidden sm:inline ' color="gray" pill onClick={ ()=>{
                    dispatch(toggleTheme())
                }}>
                    {theme==='light'?<FaMoon /> :<FaSun/> }
                    
                </Button>
                {
                    currentUser? (
                        <Dropdown arrowIcon={false} inline label={
                            <Avatar rounded img={currentUser.profilePicture} alt="user" />
                            }>
                        <Dropdown.Header>
                            <span className='block text-sm'>
                                @{currentUser.username} 
                            </span>
                            <span className='block text-sm font-medium truncate'>
                                @{currentUser.email} 
                            </span>
                        </Dropdown.Header>
                            <Link to={'/dashboard?tab=profile'}>
                            <Dropdown.Item>Profile</Dropdown.Item>
                            </Link>

                        <Dropdown.Divider/>
                        <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>

                        </Dropdown>
                    ) :
                     (
                        <Link to="/sign-in">
                        <Button className='bg-blue-800' outline >
                            Sign In
                        </Button>
                    </Link>
                    )
                        
                }
               
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link active={path === "/"} as={'div'}>
                    <Link to="/">Home</Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/about"} as={'div'}>
                    <Link to="/about">About</Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/projects"} as={'div'}>
                    <Link to="/projects">Projects</Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}
