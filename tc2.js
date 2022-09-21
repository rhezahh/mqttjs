const mqtt = require('mqtt')
const { faker } = require('@faker-js/faker')

function initClient() {
    return new Promise((resolve, reject) => {
        const client = mqtt.connect('mqtt://108.137.24.62')

        client.on('connect', () => {
            client.subscribe('time', (err) => {
                if (err) {
                    reject(err)
                }
                client.subscribe(`time/${faker.datatype.uuid()}`, (err) => {
                    if (err) {
                        reject(err)
                    }
                })
            })

        })

        client.on('message', (topic, message) => {
            const time = new Date().getTime()
            const diff = Math.abs(message - time)
            console.log('Diff', diff)
            if (diff > 2_000) {
                reject(new Error('diff more than 2s'))
            }
        })
    })
}

function sleep(x) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), x)
    })
}

async function start() {
    let num = 0

    try {
        while (true) {
            for (let i = 0; i < 5_000; i++) {
                initClient(i).catch(err => {
                    console.log('failed with client number: ', num)
                    process.exit(0)
                })
                num++
                await sleep(10)
            }
        }
    } catch (err) {
        console.error(err, num)
    }
}

start()