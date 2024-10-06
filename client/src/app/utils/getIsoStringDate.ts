export const getIsoStringDate = (date: string) => {
    return new Date(date).toISOString().split('T')[0]
}