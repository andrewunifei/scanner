import stream24hDataPropsInterface from "../interfaces/stream24hData"

export default () => {
    const dummy: stream24hDataPropsInterface = {
        e: '', // Event type
        E: 0, // Event time
        s: '', // Symbol
        p: '', // Price change
        P: '', // Price change percent
        w: '', // Weighted average price
        x: '', // First trade(F)-1 price (first trade before the 24hr rolling window)
        c: '', // Last price
        Q: '', // Last quantity
        b: '', // Best bid price
        B: '', // Best bid quantity
        a: '', // Best ask price
        A: '', // Best ask quantity
        o: '', // Open price
        h: '', // High price
        l: '', // Low price
        v: '', // Total traded base asset volume
        q: '', // Total traded quote asset volume
        O: 0, // Statistics open time
        C: 0, // Statistics close time
        F: 0, // First trade ID
        L: 0, // Last trade Id
        n: 0 // Tota
    }

    return dummy;
}