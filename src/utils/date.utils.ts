export const formatDate = (dateString: string) => {
    // const date = new Date(dateString)
    // const day = String(date.getDate()).padStart(2, '0')
    // const month = String(date.getMonth() + 1).padStart(2, '0')
    // const year = date.getFullYear()
    const date = dateString.split("T")
    const partsDate = date[0]
    const fielsDate = partsDate.split("-")
    const year = fielsDate[0]
    const month = fielsDate[1]
    const day = fielsDate[2]
    return `${day}/${month}/${year}`
}

export const currentDate = () => {
    const today = new Date().toISOString().split('T')[0];
    return today
}