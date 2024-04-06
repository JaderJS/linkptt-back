export const config = {
    port: Number(process.env.PORT) ?? 4001,
    secretToken: process.env.SECRET_TOKEN ?? "NOT FOUNDED"
}

console.log("CONFIG", config)