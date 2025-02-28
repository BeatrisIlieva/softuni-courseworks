function solve(input) {
    const [count, ...rest] = input;

    class Song {
        constructor(typeList, name, time) {
            this.typeList = typeList;
            this.name = name;
            this.time = time;
        }
    }

    const typeList = rest.pop();
    const songList = [];

    for (let i = 0; i < count; i++) {
        const line = rest[i];
        const [typeList, name, duration] = line.split('_');

        const song = new Song(typeList, name, duration);
        songList.push(song);
    }

    if (typeList == 'all') {
        songList.forEach(song => console.log(song.name));
    } else {
        const filteredSongs = songList.filter(song => song.typeList == typeList);

        filteredSongs.forEach(song => console.log(song.name));
    }
}

solve([
    4,

    'favourite_DownTown_3:14',

    'listenLater_Andalouse_3:24',

    'favourite_In To The Night_3:58',

    'something_Live It Up_3:48',

    'all'
]);
