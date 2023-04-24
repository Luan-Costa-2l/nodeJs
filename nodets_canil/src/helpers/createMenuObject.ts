type ActiveMenuType = '' | 'all' | 'dog' | 'cat' | 'fish';

export const creteMenuObject = (activeMenu: ActiveMenuType ) => {
    return {
        all: activeMenu === 'all',
        dog: activeMenu === 'dog',
        cat: activeMenu === 'cat',
        fish: activeMenu === 'fish'
    }
}