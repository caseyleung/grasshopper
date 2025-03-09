if (!/pnpm/.test(process.env.npm_execpath || '')) {
    console.log(
        `\u001b[33mThis repo must using pnpm as the package manager]` + 
        `for scripts to work properly. `
    )
    process.exit(1)
}