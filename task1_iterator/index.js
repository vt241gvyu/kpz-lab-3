class Song {
    constructor(title, artist, durationSeconds) {
        this.title = title;
        this.artist = artist;
        this.durationSeconds = durationSeconds;
    }

    toString() {
        const minutes = Math.floor(this.durationSeconds / 60);
        const seconds = String(this.durationSeconds % 60).padStart(2, '0');
        return this.artist + ' - ' + this.title + ' (' + minutes + ':' + seconds + ')';
    }
}

class PlaylistIterator {
    constructor(songs, options) {
        this.songs = songs.slice();
        this.index = 0;

        if (options && options.reverse) {
            this.songs.reverse();
        }
    }

    hasNext() {
        return this.index < this.songs.length;
    }

    next() {
        if (!this.hasNext()) {
            return null;
        }

        const song = this.songs[this.index];
        this.index += 1;
        return song;
    }
}

class ArtistPlaylistIterator extends PlaylistIterator {
    constructor(songs, artist) {
        super(songs.filter(function(song) {
            return song.artist === artist;
        }));
    }
}

class Playlist {
    constructor(name) {
        this.name = name;
        this.songs = [];
    }

    addSong(song) {
        this.songs.push(song);
    }

    createIterator() {
        return new PlaylistIterator(this.songs);
    }

    createReverseIterator() {
        return new PlaylistIterator(this.songs, { reverse: true });
    }

    createArtistIterator(artist) {
        return new ArtistPlaylistIterator(this.songs, artist);
    }
}

function printIterator(title, iterator) {
    console.log(title);

    while (iterator.hasNext()) {
        console.log('- ' + iterator.next().toString());
    }
}

function runIteratorDemo() {
    const playlist = new Playlist('Study mix');
    playlist.addSong(new Song('Intro', 'North Lab', 145));
    playlist.addSong(new Song('Focus', 'Kyiv Beats', 210));
    playlist.addSong(new Song('Deep Work', 'North Lab', 232));
    playlist.addSong(new Song('Final Build', 'Code Sound', 188));

    printIterator('Forward iteration:', playlist.createIterator());
    printIterator('\nReverse iteration:', playlist.createReverseIterator());
    printIterator('\nFiltered by artist:', playlist.createArtistIterator('North Lab'));
}

module.exports = {
    Song,
    Playlist,
    PlaylistIterator,
    ArtistPlaylistIterator,
    runIteratorDemo,
    run: runIteratorDemo
};

if (require.main === module) {
    runIteratorDemo();
}
