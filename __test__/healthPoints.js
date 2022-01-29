// Simplified version of method in
function healthPoints(damage) {
    let hp = 100 - damage;
    let health = hp;

    return health;
}

module.exports = healthPoints