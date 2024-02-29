

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
  access: string,
  performance_time: number,
  subscribers: IUser[]
}

export interface IEvents {
  events: IEvent[]
}

export interface IPerformance {
    id?: string,
    name: string,
    description?: string,
    created_at?: string,
    status?: string,
    stream_key?: string,
    artist_demo_url?: string,
    user?: Number, 
    concert?: string
}

export interface IShow{
  id?: string,
  created_at?: string,
  name?: string,
  description?: string,
  date?: string,
  slots?: number,
  poster_url?: string,
  status?: string,
  category?: string,
  user_id?: number,
  performance_time?: number
  access?: string,
  subscribers: IUser[],
  ads?: IAd[],
  performances?: IPerformance[]
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

export interface IAd {
  id: string,
  created_at: string,
  banner_url: string,
  user: IUser,
  status: string
  concert: IEvent
}
export interface ITicket {
  id: string,
  created_at: string,
  status: string,
  concert: IShow,
  user: IUser,
  concerts_followed: string
}
export interface IArtistRequest {
  id?: string,
  name: string,
  description?: string,
  created_at?: string,
  status?: string,
  stream_key?: string,
  artist_demo_url?: string,
  user?: IUser, 
  concert?: IShow
}