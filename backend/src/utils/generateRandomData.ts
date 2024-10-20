export function generateRandomData() {
    // Generate random data
    const newData = [
        {
            name: "Page A",
            uv: Math.floor(Math.random() * 5000),
            pv: Math.floor(Math.random() * 5000),
        },
        {
            name: "Page B",
            uv: Math.floor(Math.random() * 5000),
            pv: Math.floor(Math.random() * 5000),
        },
        {
            name: "Page C",
            uv: Math.floor(Math.random() * 5000),
            pv: Math.floor(Math.random() * 5000),
        },
        {
            name: "Page D",
            uv: Math.floor(Math.random() * 5000),
            pv: Math.floor(Math.random() * 5000),
        },
        {
            name: "Page E",
            uv: Math.floor(Math.random() * 5000),
            pv: Math.floor(Math.random() * 5000),
        },
        {
            name: "Page F",
            uv: Math.floor(Math.random() * 5000),
            pv: Math.floor(Math.random() * 5000),
        },
        {
            name: "Page G",
            uv: Math.floor(Math.random() * 5000),
            pv: Math.floor(Math.random() * 5000),
        },
    ];

    return newData;
}

// Call the function every 60 seconds
// setInterval(() => {
//     const randomData = generateRandomData();
//     console.log(randomData);
// }, 60000);
