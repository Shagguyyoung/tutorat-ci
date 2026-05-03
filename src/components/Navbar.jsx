import React, { useState } from 'react'
import { Menu, X } from "lucide-react"
import { Link } from "react-router-dom"

export default function Navbar() {
    const [menuOuvert, setMenuOuvert] =  useState(false)
  return (
    <nav className='bg-white border-b border-gray-100 px-6 py-4'>
        <div className='max-w-5xl mx-auto flex items-center justify-between'>
            

            {/* loge */}
            <Link to="/" className='text-xl font-extrabold text-violet-600'>
            Tutorat <span className='text-gray-900'>CI</span>
            </Link>

            {/* liens desktop */}
            <div className='hidden md:flex items-center gap-8'>
                <Link to="/" className='text-gray-600 hover:via-violet-600 transition-colors text-sm font-medium'>
                Acceuil
                </Link>
                <Link to="/recherche" className='text-gray-600 hover:via-violet-600 transition-colors text-sm font-medium'>
                Trouver un tuteur
                </Link>
                <Link to="/devenir-tuteur" className='text-gray-600 hover:via-violet-600 transition-colors text-sm font-medium'>
                Devenir un tuteur
                </Link>
            </div>
            {/* bouton connexion*/}
            <div className='hidden md:flex items-center gap-3'>
                <Link to="/connexion" className='text-sm font-semibold text-gray-700 hover:text-violet-600 transition-colors '>
                Connexion
                </Link>
                <Link to="/inscription" className='border-violet-600 hover:via-violet-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors'>
                S'inscrire
                </Link>
            </div>

            {/* bouton menu mobile */}
            <button
                 className='md:hidden text-gray-600' onClick={()=> setMenuOuvert(!menuOuvert)}>
                    {menuOuvert ? <X className='w-6 h-6'/> : <Menu className='w-6 h-6'/>}
                 </button>
        </div>

        {/* menu mobile */}
        {menuOuvert && (
            <div className='md:hidden mt-4 flex flex-col gap-4 px-2 pb-4 border-t border-gray-100 pt-4'>
                <Link to="/" className='text-gray-700 font-medium'>Acceuil</Link>
                <Link to="/recherche" className='text-gray-700 font-medium'>Trouver un tuteur</Link>
                <Link to="/devenir-tuteur" className='text-gray-700 font-medium'>Devenir un tuteur</Link>
                <Link to="/connexion" className='text-gray-700 font-medium'>Connexion</Link>
                <Link to="/inscription" className='bg-violet-600 text-white text-center font-semibold px-4 py-2 rounded-xl'>
                S'inscrire
                </Link>
            </div>
        )}

    </nav>
  )
}
