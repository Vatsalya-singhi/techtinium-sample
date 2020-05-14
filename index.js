let capacity = {
    "Large": 10,
    "XLarge": 20,
    "2XLarge": 40,
    "4XLarge": 80,
    "8XLarge": 160,
    "10XLarge": 320,
};

let table = {
    "New York": {
        "Large": 120,
        "XLarge": 230,
        "2XLarge": 450,
        "4XLarge": 774,
        "8XLarge": 1400,
        "10XLarge": 2820,
    },
    "India": {
        "Large": 140,
        "2XLarge": 413,
        "4XLarge": 890,
        "8XLarge": 1300,
        "10XLarge": 2970,
    },
    "China": {
        "Large": 110,
        "XLarge": 200,
        "4XLarge": 670,
        "8XLarge": 1180,
    }
};

function submit() {
    let unit = document.getElementById("unit").value;
    let hour = document.getElementById("hour").value;

    var el_down = document.getElementById("GFG_DOWN");


    if (!unit || !hour) {
        el_down.innerHTML = "Improper values entered";
        return;
    }

    let output = [];
    Object.keys(table).forEach((city) => {
        output.push(calculate(unit, hour, city));
    })

    console.log('output=>', output);

    el_down.innerHTML = JSON.stringify(output);
}

function calculate(unit, hour, city) {
    hour = Number(hour);
    const unitFinal = Number(unit);
    let capAvailable = Object.keys(table[city]);

    let n = capAvailable.length;

    let fsum = Number.MAX_VALUE;
    let fdict = {};

    for (let j = n - 1; j >= 0; j--) {
        let sum = 0;
        let dict = {};

        unit = unitFinal;

        for (let i = j; i >= 0; i--) {
            let q = Math.floor(unit / capacity[capAvailable[i]]);
            if (q >= 1) {
                unit = unit % capacity[capAvailable[i]];
                sum += q * table[city][capAvailable[i]] * hour;

                dict[capAvailable[i]] = q;
            }
        }

        if (sum < fsum) {
            fsum = sum;
            fdict = dict;
        }
    }

    let returnObj = {
        "region": city,
        "total_cost": fsum,
        "machines": fdict,
    };

    console.log(JSON.stringify(returnObj));

    return returnObj
}