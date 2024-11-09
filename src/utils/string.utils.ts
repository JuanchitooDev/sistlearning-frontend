export const sanitizeFileName = (name: string) => {
    return name
        .normalize('NFD') // Normaliza el string
        .replace(/[\u0300-\u036f]/g, '') // Elimina los acentos
        .replace(/[ñ]/g, 'n') // Convierte la eñe a 'n'
        .replace(/[^a-zA-Z0-9-_]/g, '_') // Reemplaza caracteres no permitidos por '_'
        .replace(/\s+/g, '_') // Reemplaza espacios en blanco por '_'
        .toLowerCase(); // Convierte a minúsculas
}

export const capitalizeNames = (nombre: string) => {
    const nombreMinusculas = nombre.toLowerCase()
    const partsNombre = nombreMinusculas.split(' ')
    const partsMayusculas = partsNombre.map(word => word.charAt(0).toUpperCase() + word.slice(1))
    const nombreCapitalized = partsMayusculas.join(' ')
    return nombreCapitalized
}