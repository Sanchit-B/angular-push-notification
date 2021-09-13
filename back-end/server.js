const express = require('express');
const app = express();

const webPush = require('web-push');
const cors = require('cors');

const VAPID_PUBLIC = 'BO1KZMFibF9lx_rhdZSQBKIln9biXtJXiBKUHu0h8_5tLacsfy1ZgQhm-uWs6BUm_1biXLWW3yqazI26ulBPScI';
const VAPID_PRIVATE = '_vGaEXWsrQ9jo-oXfs8bmemofEnAxDoxmJR0Cpv-XP4';

const fakeDatabase = [];

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

webPush.setVapidDetails('mailto:example@domain.com', VAPID_PUBLIC, VAPID_PRIVATE);

app.post('/subscription', (req, res) => {
    console.log('===================================== request recieved at line 19 ===================================');
    fakeDatabase.push(req.body)
    res.sendStatus(200);
})

app.post('/sendNotification', (req, res) => {
    console.log('===================================== request recieved at line 25 ===================================');

    const notificationPayload = {
        notification: {
            title: 'New Notification',
            body: 'This is the body of notification',
            icon: 'assets/icons/icon-512x512.png'
        }
    }

    const promises = [];
    fakeDatabase.forEach(sub => {
        promises.push(
            webPush.sendNotification(sub, JSON.stringify(notificationPayload))
        )
    })
    
    Promise.all(promises).then(
        res.sendStatus(200)
    ).catch(
        error => {
            console.log('===================================== error at line 49: ===================================');
            console.log(error)
        }
    )
})

app.listen(3000, () => {
    console.log('Server started on port 3000')
});