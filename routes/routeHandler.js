const express = require('express');
const router = express.Router();

const meeting = [{"userId": "Pradeep", "noMeeting": 1}, {"userId": "Swetha", "noMeeting": 2}];
const calls = [{"userId":"Pradeep", "calls": 2}, {"userId": "Swetha", "calls": 3}];
const course = [{"userId": "Pradeep", "course": 5}, {"userId": "Swetha", "course": 5}];
// const activity = [{"userId": "Pradeep", "activity": 5}, {"userId": "Swetha", "activity": 5}];

const getMeeting = () => {
    return new Promise((resolve) => {
        resolve(meeting);
    });
}

const getCalls = () => {
    return new Promise((resolve) => {
        resolve(calls)
    });
}
const getCourseContent = () => {
    return new Promise((resolve) => {
        resolve(course)
    });
}

// return list of promises based on arr
function getPromiseParams(arr) {
    let promiseHolder = [];
    arr.forEach(ar => {
        let pr = new Promise((resolve) => {
            resolve(ar);
        });
        promiseHolder.push(pr);
    });
    return promiseHolder;
}

function responseFormatter(result) {
    let res = {};
    let resObj = {};
    result.forEach((data ) => {
            data.value.forEach(user => {
                if (!res[user.userId]) {
                    res[user.userId] = {};
                }
    
                if (!res[user.userId]["noMeeting"] && user.noMeeting != undefined) {
                    res[user.userId]["noMeeting"] = user.noMeeting;
                }
                if (!res[user.userId]["calls"] && user.calls != undefined) {
                    res[user.userId]["calls"] = user.calls;
                }
                if (!res[user.userId]["course"] && user.course != undefined) {
                    res[user.userId]["course"] = user.course;
                }
            })
    });

    // res --> {"1":{"noMeeting":3,"calls":1,"course":5},"2":{"noMeeting":5,"calls":4,"course":2}}
    Object.keys(res).forEach((key)=> {
        resObj[key] = (res[key].calls + res[key].noMeeting ) * 5 + (res[key].course * 10);
    });
    resObj = Object.entries(resObj).sort((a,b) => b[1]-a[1]);
    return resObj;
}


router.get("/", async (req, response) => {
    // let userInput = req.body (i.e ["numMeetings", "calls", "course"])
    // getPromiseParams(userInput) - will give array of promises based on user input
    // const result = await Promise.allSettled(getPromiseParams(userInput))
    const result = await Promise.allSettled([getMeeting(), getCalls(), getCourseContent()])
                                .catch(err=> {
                                    console.log(err);
                                });
    
    const temp = responseFormatter(result);
    const finalResult = {
        "status": 200,
        "data": temp
    };
    response.status(200).json(finalResult);
});

module.exports = router;