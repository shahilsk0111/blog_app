import { Footer } from 'flowbite-react'
import React from 'react'
import {BsFacebook , BsInstagram , BsTwitterX , BsGithub} from 'react-icons/bs'
import { Link } from 'react-router-dom'

export default function FooterCom() {
    return (
        <Footer container className='border border-t-6 border-teal-500' >
            <div className=' w-full max-w-7xl mx-auto'>
                <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
                    <div className='mt-5'>
                        <Link to="/" className='self-center text-lg sm:text-xl font-semibold dark:text-white'>
                            <div className='px-2 py-1 bg-blue-800 rounded-lg text-white'>BlogMania</div>
                        </Link>
                    </div>
                    <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
                        <div>
                        <Footer.Title title='About'/>
                        <Footer.LinkGroup col>
                                <Footer.Link href='https://www.medium.com' target='_blank' rel='nooperner noreferrer'>
                                    My Blogs
                                </Footer.Link>
                                <Footer.Link href='/about' target='_blank' rel='nooperner noreferrer'>
                                    About
                                </Footer.Link>
                        </Footer.LinkGroup>
                        </div>
                        <div>
                        <Footer.Title title='Follow Us '/>
                        <Footer.LinkGroup col>
                                <Footer.Link href='https://www.github.com/shahilsk' target='_blank' rel='nooperner noreferrer'>
                                    Github
                                </Footer.Link>
                                <Footer.Link href='https://www.linkedin.com' target='_blank' rel='nooperner noreferrer'>
                                    LinkedIn
                                </Footer.Link>
                        </Footer.LinkGroup>
                        </div>
                        <div>
                        <Footer.Title title='Legal'/>
                        <Footer.LinkGroup col>
                                <Footer.Link href='#' >
                                    Privacy Policy
                                </Footer.Link>
                                <Footer.Link href='#'>
                                    Terms &amp; Conditions
                                </Footer.Link>
                        </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
                <Footer.Divider/>
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <Footer.Copyright href='#' by='BlogMania' year={new Date().getFullYear()}/>
                    <div className='flex gap-4 sm:mt-0 mt-4 sm:justify-center'>
                        <Footer.Icon href='#' icon={BsFacebook}/>
                        <Footer.Icon href='#' icon={BsInstagram}/>
                        <Footer.Icon href='#' icon={BsTwitterX}/>
                        <Footer.Icon href='#' icon={BsGithub}/>
                        
                    </div>
                </div>
            </div>
        </Footer>
    )
}
