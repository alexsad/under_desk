const msToTime = (msDuration: number) => {
    const durationInSecs = Math.floor(msDuration / 1000);
    const mins = Math.floor(durationInSecs / 60);
    return [
        mins,
        durationInSecs < 60 ? durationInSecs : durationInSecs - mins * 60,
    ]
}

const formatTime = (value: number) => {
    return `00${value}`.substring(`${value}`.length);
}

export { formatTime, msToTime };

