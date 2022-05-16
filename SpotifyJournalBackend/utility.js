    // Calculate the time for the past hour, this gets rid of next day cases.
    const unixTimestamp = Date.now();
    const msToHour = 3_600_000;
    // round to nearest hour
    const currentHourTime = unixTimestamp - (unixTimestamp % msToHour);
    const pastHourTime = currentHourTime - msToHour;

    module.exports = {unixTimestamp, msToHour, currentHourTime, pastHourTime};