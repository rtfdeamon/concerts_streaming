

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
  subscribers: IUser[],
  ticket_price: string,
  artists?: IArtist[]
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
  subscribers?: IUser[],
  ads?: IAd[],
  performances?: IPerformance[],
  ticket_price?: string
}
export interface IChangeShow extends IShow{
  id: string
}

export interface IArtist {
  id: string,
  role: string,
  name: string,
  avatar_url: string,
  username: string,
  description?: string,
  performances?: IPerformance[],
  concerts: IEvent[],
  artist_genre: string
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
  category: string,
  subcategory: string,
  avatar_url: string,
  username: number,
  artists_followed: IArtist[],
  concerts_followed: IEvent[],
  ads: IAd[],
  tickets?: ITicket[]
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
  concert?: IShow,
  performance_time: number
}

export interface IChat {
  id?: string,
  created_at?: string,
  message: IMessage,
  user: IUser
}
export interface IMessage {
  sender: IUser,
  date: number,
  text: string
}

export interface IStreamingInfo {
  status: string,
  playback_url: string,
  publish_credentials: {
    primary_server: string,
    host_port: number,
    stream_name: string,
    username: string,
    password: string
  }
}

