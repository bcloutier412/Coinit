/*
    *** STRUCTURE ***
    links [{
        path: [router path],
        text: [text for button]
    }]
*/

const links = [
    {
        path: "home",
        text: "Home",
        image: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-house-door-fill"
                viewBox="0 0 16 16"
            >
                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
            </svg>
        ),
    },
    {
        path: "assets",
        text: "My assets",
        image: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-pie-chart"
                viewBox="0 0 16 16"
            >
                <path d="M7.5 1.018a7 7 0 0 0-4.79 11.566L7.5 7.793V1.018zm1 0V7.5h6.482A7.001 7.001 0 0 0 8.5 1.018zM14.982 8.5H8.207l-4.79 4.79A7 7 0 0 0 14.982 8.5zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
            </svg>
        ),
    },
    // {
    //     path: "advanced-trade",
    //     text: "Trade"
    // },
    // {
    //     path: "earn",
    //     text: "Earn"
    // },
    // {
    //     path: "learning-rewards",
    //     text: "Learning rewards"
    // }
];

export default links;
