const getId = require("../getId")

module.exports = [
    {
        name:"getCar",
        callback: async (runner, arg) => {
            const userid = await getId(arg[0] , null , runner , true)
            const cars = await runner(`SELECT * FROM car WHERE user_id='${userid}'`)
            return cars
        }   
    },
    {
        name:"createCar",
        callback: async (runner, arg) => {
            const [pos , name , username] = arg
            const userid = await getId(username , null , runner , true)
            if(userid != -1) await runner(`INSERT INTO car(pos , name, user_id) VALUE ("${pos}" , "${name}" , ${userid})`)
        }   
    },
    {
        name:"updateCar",
        callback: async (runner , arg) => {
            const [column , carname , value , username] = arg
            const userid = await getId(username , null , runner , true)
            await runner(`UPDATE car SET ${column}="${value}" WHERE user_id="${userid}" AND name="${carname}"`)
        }
    },
    {
        name:"deleteCar",
        callback: async(runner , arg) => {
            const userid = await getId(arg[0] , null ,runner, true)
            await runner(`DELETE FROM car WHERE user_id="${userid}" AND name="${arg[1]}"`)
        }
    }
]