function solve(data) {
    class Song {
        constructor(typeList, name, time) {
            this.typeList = typeList;
            this.name = name;
            this.time = time;
        }
    }

    const count = data.shift();
    const songType = data.pop();

    const songs = [];

    data.forEach((line) => {
        const [typeList, name, time] = line.split('_');

        songs.push(new Song(typeList, name, time));
    });

    if (songType === 'all') {
        songs.forEach((song) => console.log(song.name));
    } else {
        songs
            .filter((song) => song.typeList === songType)
            .forEach((song) => console.log(song.name));
    }
}

solve([2, 'like_Replay_3:15', 'ban_Photoshop_3:48', 'all']);
