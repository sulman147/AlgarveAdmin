import React, { useRef, useState, useEffect } from 'react'

import './thememenu.css'

import { useDispatch } from 'react-redux'

import ThemeAction from '../../redux/actions/ThemeAction'

const mode_settings = [
    {
        id: 'light',
        name: 'Light',
        background: 'light-background',
        class: 'theme-mode-light',
        appearance: 'apearence-color-blue',
    },
    {
        id: 'dark',
        name: 'Dark',
        background: 'dark-background',
        class: 'theme-mode-dark',
        appearance: 'second-bg-dark',
    }
]

const color_settings = [
    {
        id: 'blue',
        name: 'Blue',
        background: 'blue-color',
        class: 'theme-color-blue'
    },
    {
        id: 'red',
        name: 'Red',
        background: 'red-color',
        class: 'theme-color-red'
    },
    {
        id: 'cyan',
        name: 'Cyan',
        background: 'cyan-color',
        class: 'theme-color-cyan'
    },
    {
        id: 'green',
        name: 'Green',
        background: 'green-color',
        class: 'theme-color-green'
    },
    {
        id: 'orange',
        name: 'Orange',
        background: 'orange-color',
        class: 'theme-color-orange'
    },
]
const theme_settings = [

    {
        id: 'blue',
        name: 'Blue',
        background: 'blue-color',
        class: 'apearence-color-blue'
    },
    {
        id: 'red',
        name: 'Red',
        background: 'red-color',
        class: 'apearence-color-red'
    },
    {
        id: 'cyan',
        name: 'Cyan',
        background: 'cyan-color',
        class: 'apearence-color-cyan'
    },
    {
        id: 'green',
        name: 'Green',
        background: 'green-color',
        class: 'apearence-color-green'
    },
    {
        id: 'orange',
        name: 'Orange',
        background: 'orange-color',
        class: 'apearence-color-orange'
    },
]

const clickOutsideRef = (content_ref, toggle_ref) => {
    document.addEventListener('mousedown', (e) => {
        // user click toggle
        if (toggle_ref.current && toggle_ref.current.contains(e.target)) {
            content_ref.current.classList.toggle('active')
        } else {
            // user click outside toggle and content
            if (content_ref.current && !content_ref.current.contains(e.target)) {
                content_ref.current.classList.remove('active')
            }
        }
    })
}

const ThemeMenu = () => {

    const menu_ref = useRef(null)
    const menu_toggle_ref = useRef(null)
    const setActiveMenu = () => menu_ref.current.classList.add('active')
    const closeMenu = () => menu_ref.current.classList.remove('active')

    clickOutsideRef(menu_ref, menu_toggle_ref)

    const [currMode, setcurrMode] = useState('light')
    const [currColor, setcurrColor] = useState('blue')
    const [currTheme, setcurrTheme] = useState('blue')

    const dispatch = useDispatch()

    const setMode = mode => {
        setcurrMode(mode.id)
        console.log("this is mode ", mode)
        localStorage.setItem('themeMode', mode.class)
        localStorage.setItem('themeColor', mode.appearance)
        dispatch(ThemeAction.setMode(mode.class))
        dispatch(ThemeAction.setTheme(mode.appearance))
    }

    const setColor = color => {
        setcurrColor(color.id)
        localStorage.setItem('colorMode', color.class)
        dispatch(ThemeAction.setColor(color.class))
    }
    const setTheme = color => {
        setcurrTheme(color.id)
        localStorage.setItem('themeColor', color.class)
        dispatch(ThemeAction.setTheme(color.class))
    }

    useEffect(() => {
        const modeClass = mode_settings.find(e => e.class === localStorage.getItem('themeMode', 'theme-mode-light'))

        const colorClass = color_settings.find(e => e.class === localStorage.getItem('colorMode', 'theme-mode-light'))

        const themeClass = theme_settings.find(e => e.class === localStorage.getItem('themeColor', 'theme-mode-light'))

        if (modeClass !== undefined) setcurrMode(modeClass.id)

        if (colorClass !== undefined) setcurrColor(colorClass.id)

        if (themeClass !== undefined) setcurrTheme(themeClass.id)

    }, []);

    return (
        <div>
            <button ref={menu_toggle_ref} className="dropdown__toggle" onClick={() => setActiveMenu()}>
                <i className='bx bx-palette'></i>
            </button>
            <div ref={menu_ref} className="theme-menu">
                <h4>Theme settings</h4>
                <button className="theme-menu__close" onClick={() => closeMenu()}>
                    <i className='bx bx-x'></i>
                </button>
                <div className="theme-menu__select">
                    <span>Choose mode</span>
                    <ul className="mode-list">
                        {
                            mode_settings.map((item, index) => (
                                <li key={index} onClick={() => setMode(item)}>
                                    <div className={`mode-list__color ${item.background} ${item.id === currMode ? 'active' : ''}`}>
                                        <i className='bx bx-check'></i>
                                    </div>
                                    <span>{item.name}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="theme-menu__select">
                    <span>Choose color</span>
                    <ul className="mode-list">
                        {
                            color_settings.map((item, index) => (
                                <li key={index} onClick={() => setColor(item)}>
                                    <div className={`mode-list__color ${item.background} ${item.id === currColor ? 'active' : ''}`}>
                                        <i className='bx bx-check'></i>
                                    </div>
                                    <span>{item.name}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="theme-menu__select">
                    <span>Choose Theme</span>
                    <ul className="mode-list">
                        {
                            theme_settings.map((item, index) => (
                                <li key={index} onClick={() => setTheme(item)}>
                                    <div className={`mode-list__color ${item.background} ${item.id === currTheme ? 'active' : ''}`}>
                                        <i className='bx bx-check'></i>
                                    </div>
                                    <span>{item.name}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ThemeMenu
