export const formatDate = (dateParam: string) => {
    const date = dateParam.split("T")
    const partsDate = date[0]
    const fielsDate = partsDate.split("-")
    const year = fielsDate[0]
    const month = fielsDate[1]
    const day = fielsDate[2]
    return `${day}/${month}/${year}`
}

export const currentDate = () => {
    const today = new Date().toISOString().split('T')[0];

    return `${today}`
}