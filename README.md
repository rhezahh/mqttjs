![mqtt.js](https://raw.githubusercontent.com/mqttjs/MQTT.js/137ee0e3940c1f01049a30248c70f24dc6e6f829/MQTT.js.png)

### Prerequisites:
 - node version `v18.8.0`

### How to getting started:
 ```sh
$ git clone "url this project"
$ cd mqttjs
$ npm install
``` 
### How to Run:

```sh
$ node tc1.js                     | Run case 1
$ node tc2.js                     | Run case 2
```

### Cases:
```sh
Case 1:
- Subscribe to topic “time” to get server time every second, keep the connection until test
finished.
- Measure how many max concurrent subscribing MQTT clients before begin to fail.
- Fail condition: if server-time received is more than 2 seconds from client local time due
to late-arrival.

Case 2:
- Subscribe to topic “time/<random-uuid>”, keep the connection until test finished
- Get server time on the subscription before with sending “<random-uuid>” request message to “time/request” topic
- Measure how many max concurrent requesting MQTT clients before begin to fail.
- Fail condition: if response-time (measured between request and response) is more than
2 seconds apart.
```
