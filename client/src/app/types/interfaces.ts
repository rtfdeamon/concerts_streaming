

export interface IEvent {
  id: string,
  created_at: string,
  name: string,
  description: string,
  date: string,
  slots: number,
  poster_url: string,
  status: string,
  category: string,
  user_id: IUser,
  subscribers: IUser[]
}

export interface IEvents {
  events: IEvent[]
}


export interface IShow{
  name?: string,
  description?: string,
  date?: string,
  slots?: number,
  posterUrl?: string,
  status?: string,
  category?: string,
  user_id?: number,
  perfomanceTime?: number
}
export interface IChangeShow extends IShow{
  id: string
}

export interface IArtist {
  id: string,
  role: string,
  name: string,
  avatar_url: string,
  username: string
}

export interface IAcceptedShow {
  id: string,
  title: string,
  date: string,
  poster_url: string
}

export interface IUser {
  id: number,
  role:	string,
  name: string,
  avatar_url: string,
  username: number,
  artists_followed: IArtist[],
  concerts_followed: IEvent[]
}
export interface IToken {
  accessToken : string,
  refreshToken: string
}

export interface IResult {
  artists: IArtist[],
  shows: IEvent[]
}