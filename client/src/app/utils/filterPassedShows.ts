export const filterPassedShows = (shows: any) => {
    //@ts-ignore
    return shows.filter(show => new Date(show.date) > new Date(Date.now()))
}