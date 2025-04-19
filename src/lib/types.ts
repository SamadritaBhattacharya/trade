export interface Order {
    id: string
    time: string
    client: string
    ticker: string
    tickerAudio?: boolean
    side: "Buy" | "Sell"
    product: string
    qty: string
    price: string
    status?: string
    type?: string
  }
  
  export interface FilterOption {
    id: string
    label: string
    value: string
  }
  
  export interface ClientOption {
    id: string
    name: string
  }
  