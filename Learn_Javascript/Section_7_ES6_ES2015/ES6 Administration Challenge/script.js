/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/


// Create a prototype function for Park and Street
class Unit {
    constructor(name, builtYear) {
        this.name = name;
        this.builtYear = builtYear;
    }
}

// Park class
class Park extends Unit {
    // Constructor
    constructor(name, builtYear, numTrees, area) {
        super(name, builtYear);
        this.numTrees = numTrees;
        this.area = area;
    }
    
    // report the tree density
    reportTreeDensity() {
        const density = (this.numTrees / this.area).toFixed(2);
        console.log(`${this.name} has a tree density of ${density} trees per square kilometer.`);
    }
}


// Street class
class Street extends Unit {
    // Constructor
    constructor(name, builtYear, lengthStr, sizeStr = 3) {
        super(name, builtYear);
        this.lengthStr = lengthStr;
        this.sizeStr = sizeStr;
    }
    
    // report the size classification of the street
    sizeClassification() {
        const classification = new Map();
        classification.set(1, "tiny");
        classification.set(2, "small");
        classification.set(3, "normal");
        classification.set(4, "big");
        classification.set(5, "huge");
        console.log(`${this.name} is built in ${this.builtYear} with a ${classification.get(this.sizeStr)} size of ${this.lengthStr} kilometers.`);
    }
}

// function for reporting the average age of parks
function avgAge(...parks) {
    let totalAge = 0;
    parks.forEach(park => totalAge += new Date().getFullYear() - park.builtYear);
    console.log(`Our ${parks.length} parks have an average age of ${(totalAge / parks.length).toFixed(2)} years.`)
}

// function for reporting the parks which have more than 1000 trees
function isMore1000Trees(...parks) {
    parks.forEach(park => {
        if (park.numTrees > 1000) {
            console.log(`${park.name} has more than 1000 trees.`);
        }
    });
}

// function for reporting the total and average lengths of streets
function calStrLength(...streets) {
    let totalLength = 0;
    streets.forEach(street => totalLength += street.lengthStr);
    console.log(`Our ${streets.length} streets have a total length of ${totalLength.toFixed(2)} km, with an average length of ${(totalLength / streets.length).toFixed(2)} km.`)
}

// Create Parks report
function parksReport(parks) {
    console.log("---------PARKS REPORT----------");
    avgAge(parks);
    parks.forEach(park => park.reportTreeDensity());
    isMore1000Trees(parks);
}

// Create Streets report
function streetsReport(streets) {
    console.log("---------STREETS REPORT----------");
    calStrLength(streets);
    streets.forEach(street => street.sizeClassification());
}

// input streets and parks
const parks = [new Park('Sanssouci Park', 1748, 10000, 2.75),
                new Park('Park Babelsberg', 1833, 6500, 1.14),
                new Park('Treptower Park', 1896, 4756, 0.84),
                new Park('Tiergarten', 1527, 14300, 2.1)];

const streets = [new Street('Gauss strasse', 1963, 3, 2),
                new Street('Berliner strasse', 1912, 42, 4),
                new Street('Street of Kings', 1874, 11.5),
                new Street('Unknown Street', 1999, 96, 5)];

parksReport(parks);
streetsReport(streets);

