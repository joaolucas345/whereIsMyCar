module.exports = [
    {
        name:"getCar",
        callback: async (runner, arg) => {
            const cars = await runner("SELECT * FROM car")
            return cars
        }   
    },
    {
        name:"createCar",
        callback: async (runner, arg) => {
            const [pos , name] = arg
            await runner(`INSERT INTO car(pos , name) VALUE ("${pos}" , "${name}")`)
        }   
    },
    {
        name:"updateCar",
        callback: async (runner , arg) => {
            const [column , old , value] = arg
            await runner(`UPDATE car SET ${column}="${value}" WHERE name="${old}"`)
        }
    },
    {
        name:"deleteCar",
        callback: async(runner , arg) => {
            await runner(`DELETE FROM car WHERE name="${arg[0]}"`)
        }
    }
]