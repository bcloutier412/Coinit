export const formatMarketCap = (market_cap) => {

    const market_cap_rounded = Math.round(market_cap)

    if (market_cap_rounded >= 1000000000000) {
        console.log('formatting')
        let string_market_cap = market_cap_rounded.toString();
        string_market_cap = string_market_cap.slice(
            0,
            string_market_cap.length - 11
        );
        return (
            string_market_cap.slice(0, string_market_cap.length - 1) +
            "." +
            string_market_cap.slice(
                string_market_cap.length - 1,
                string_market_cap.length
            ) +
            "T"
        );
    }
    else if (market_cap_rounded >= 1000000000) {
        let string_market_cap = market_cap_rounded.toString();
        string_market_cap = string_market_cap.slice(
            0,
            string_market_cap.length - 8
        );
        return (
            string_market_cap.slice(0, string_market_cap.length - 1) +
            "." +
            string_market_cap.slice(
                string_market_cap.length - 1,
                string_market_cap.length
            ) +
            "B"
        );
    } else if (market_cap_rounded >= 1000000) {
        let string_market_cap = market_cap_rounded.toString();
        string_market_cap = string_market_cap.slice(
            0,
            string_market_cap.length - 5
        );
        return (
            string_market_cap.slice(0, string_market_cap.length - 1) +
            "." +
            string_market_cap.slice(
                string_market_cap.length - 1,
                string_market_cap.length
            ) +
            "M"
        );
    } else if (market_cap_rounded >= 1000) {
        let string_market_cap = market_cap_rounded.toString();
        string_market_cap = string_market_cap.slice(
            0,
            string_market_cap.length - 2
        );
        return (
            string_market_cap.slice(0, string_market_cap.length - 1) +
            "." +
            string_market_cap.slice(
                string_market_cap.length - 1,
                string_market_cap.length
            ) +
            "K"
        );
    } else {
        return market_cap;
    }
};
