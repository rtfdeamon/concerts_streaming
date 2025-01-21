export const getIsoStringDate = (date: string | undefined) => {
    return new Date(date as string).toISOString().split('T')[0]
}