const setMode = mode => {
    return {
        type: 'SET_MODE',
        payload: mode
    }
}

const setColor = color => {
    return {
        type: 'SET_COLOR',
        payload: color
    }
}
const setTheme = theme => {
    return {
        type: 'SET_THEME',
        payload: theme
    }
}

const getTheme = () => {
    return {
        type: 'GET_THEME'
    }
}

const exportDefault = {
    setColor,
    setMode,
    setTheme,
    getTheme
}

export default exportDefault