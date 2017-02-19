(function() {
     function SongPlayer(Fixtures) {
        var SongPlayer = {};
        
        /**
        * @desc object with currently selected album information
        * @type {Object}
        */
        var currentAlbum = Fixtures.getAlbum();
                  
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;
         
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as zzObject
        * @param {Object} song
        */
         
        var setSong = function(song) {
            
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            SongPlayer.currentSong = song;
        };
         
         /**
        * @function playSong
        * @desc Plays currentBuzzObject and sets playing attribute of SongPlayer.currentSong object to true
        * @param {Object} song
        */ 
         
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };
         
        /**
        * @function stopSong
        * @desc Stops the currentBuzzObject
        * @param {Object} song
        */
        var stopSong = function(song) {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        };
         
         /**
        * @function getSongIndex
        * @desc gets the index number of current song
        * @param number
        */ 
         
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        
        /**
        * @desc Active song object from list of songs
        * @type {Object}
        */
        SongPlayer.currentSong = null;
         
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) 
            {
                setSong(song);

                playSong(song);
            
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) 
                {
                     playSong(song);
                }
            }
        };
         
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
         
         
         /**
        * @function SongPlayer.previous
        * @desc gets the index of the previous song in the album object
        */ 
    
        SongPlayer.previous = function() {
            
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
         
         /**
        * @function SongPlayer.next
        * @desc gets the index of the next song in the album object
        */ 
         
         SongPlayer.next = function() {
            
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if (currentSongIndex >= currentAlbum.songs.length) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
         
         
          return SongPlayer;
     }
    
        
 
      angular
      .module('blocJams')
      .factory('SongPlayer', SongPlayer);
})();