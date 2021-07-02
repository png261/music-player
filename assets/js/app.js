/*
 * MUSIC PLAYER
 * AUTHOR: PhuongNguyen
 */

$(document).ready(function () {
    (function () {
        const $slide = $('#slidePlaylist');
        const $audio = $('#audio');
        const $timeProgress = $('#time__progress');
        const $volumeProgress = $('#volume__progress');
        const $currentTime = $('.time__current');
        const $durationTime = $('.time__duration');
        const $muteBtn = $('#volume__mute');
        const $modeCheck = $('#switchMode');
        const $settingsToggle = $('#settings__toggle');
        const $settingsBox = $('#settings__box');
        const $notificationsBox = $('#notifications__box');
        const $searchInput = $('#search__input');
        const $searchBox = $('#search__box');
        const $resetBtn = $('#reset');

        const PROGRESS_COLOR = getComputedStyle(document.documentElement).getPropertyValue(
            '--progress-bg-color'
        );

        let isPlay = false;
        let isMute = false;
        let isDarkMode = false;
        let isSaveData = true;
        let currentVolume = 1;
        let playlistIndex = 0;

        const playLists = [
            {
                title: '3',
                author: 'Ngọt',
                date: 2019,
                thumbnail: '../assets/images/thumbnail/ngot.jpg',
                currentIndex: 0,
                isRandom: false,
                isRepeat: false,
                playedSongs: [],
                songs: [
                    {
                        name: 'MÀU (đen trắng)',
                        path: '../assets/songs/playlist_1/MAU den trang - Ngot (NhacPro.net).mp3',
                    },
                    {
                        name: 'EM CÓ CHẮC Không (?) (bài ca rebound)',
                        path: '../assets/songs/playlist_1/EM CO CHAC Khong bai ca reboun... - Ngot (NhacPro.net).mp3',
                    },
                    {
                        name: 'GIẢ VỜ',
                        path: '../assets/songs/playlist_1/GIA VO - Ngot (NhacPro.net).mp3',
                    },
                    {
                        name: '(sau đây là) DỰ BÁO THỜI TIẾT (cho các vùng vào ngày mai)',
                        path: '../assets/songs/playlist_1/sau day la DU BAO THOI TIET ch... - Ngot (NhacPro.net).mp3',
                    },
                    {
                        name: 'Chuyển KÊNH (sản phẩm này không phải là thuốc)',
                        path: '../assets/songs/playlist_1/Chuyen KENH san pham nay khong... - Ngot (NhacPro.net).mp3',
                    },
                    {
                        name: 'HẾT THỜI',
                        path: '../assets/songs/playlist_1/HET THOI - Ngot (NhacPro.net).mp3',
                    },
                    {
                        name: 'VÉ ĐI Thiên Đường (một chiều)',
                        path: '../assets/songs/playlist_1/VE DI Thien Duong mot chieu - Ngot (NhacPro.net).mp3',
                    },
                    {
                        name: '(tôi) ĐI TRÚ ĐÔNG',
                        path: '../assets/songs/playlist_1/toi DI TRU DONG - Ngot (NhacPro.net).mp3',
                    },
                    {
                        name: 'LẦN CUỐI (đi bên em xót xa người ơi)',
                        path: '../assets/songs/playlist_1/LAN CUOI di ben em xot xa nguo... - Ngot (NhacPro.net).mp3',
                    },
                ],
            },
            {
                title: 'Đen Vâu',
                author: 'Đen Vâu',
                date: 2020,
                thumbnail: '../assets/images/thumbnail/denvau.jpg',
                currentIndex: 0,
                isRandom: false,
                isRepeat: false,
                playedSongs: [],
                songs: [
                    {
                        name: 'Loving You',
                        path: '../assets/songs/playlist_2/Loving You - Kimmese Den (NhacPro.net).mp3',
                    },
                    {
                        name: 'Bài Này Chill Phết',
                        path: '../assets/songs/playlist_2/Bai Nay Chill Phet - Den MIN (NhacPro.net).mp3',
                    },
                    {
                        name: 'Trời hôm nay nhiều mây cực!',
                        path: '../assets/songs/playlist_2/Troi hom nay nhieu may cuc - Den (NhacPro.net).mp3',
                    },
                    {
                        name: 'Hai Triệu Năm',
                        path: '../assets/songs/playlist_2/Hai Trieu Nam - Den Bien (NhacPro.net).mp3',
                    },
                    {
                        name: 'Anh Đếch Cần Gì Nhiều Ngoài Em',
                        path: '../assets/songs/playlist_2/Anh Dech Can Gi Nhieu Ngoai Em - Den Vu Thanh Dong (NhacPro.net).mp3',
                    },
                    {
                        name: 'Đưa Nhau Đi Trốn',
                        path: '../assets/songs/playlist_2/Dua Nhau Di Tron - Den Linh Cao (NhacPro.net).mp3',
                    },
                    {
                        name: 'Mười Năm (Lộn Xộn 3)',
                        path: '../assets/songs/playlist_2/Muoi Nam Lon Xon 3 - Den Ngoc Linh (NhacPro.net).mp3',
                    },
                    {
                        name: 'Đố Em Biết Anh Đang Nghĩ Gì',
                        path: '../assets/songs/playlist_2/Do Em Biet Anh Dang Nghi Gi - JustaTee Den Bien (NhacPro.net).mp3',
                    },
                    {
                        name: 'Ta Cứ Đi Cùng Nhau',
                        path: '../assets/songs/playlist_2/Ta Cu Di Cung Nhau - Den Linh Cao (NhacPro.net).mp3',
                    },
                    {
                        name: 'Đi Theo Bóng Mặt Trời',
                        path: '../assets/songs/playlist_2/Di Theo Bong Mat Troi - Den Giang Nguyen (NhacPro.net).mp3',
                    },
                    {
                        name: 'Cho Tôi Lang Thang',
                        path: '../assets/songs/playlist_2/Cho Toi Lang Thang - Ngot Den (NhacPro.net).mp3',
                    },
                ],
            },
        ];

        let notifications = [
            {
                time: 'now',
                author: 'Phuong Nguyen',
                content: "Hello I'm PhuongNguyen",
            },
            {
                time: 'now',
                author: 'Phuong Nguyen',
                content: 'Have a good day !',
            },
        ];

        const HTML = {
            song(currentIndex, index, name) {
                const isCurrentSong = index === currentIndex;
                const HTML = `
								<div class="song ${isCurrentSong ? 'active' : ''}" index="${index}">
									<div class="song__action">
										<span class="song__order">
											${++index}
										</span>
										<div class="btn btn-play">
											<img src="assets/images/icon/play-icon-light.png" alt="play">
											<img src="assets/images/icon/pause-icon-light.png" alt="pause">
										</div>
									</div>
									<div class="song__name">
										<span>${name}</span>
									</div>
									<div class="song__duration">
									</div>
								</div>
							`;
                return HTML;
            },

            slide(playList, songs) {
                const { thumbnail, isRandom, isRepeat, title, author, date } = playList;
                const HTML = `
								<div class="playList">
									<div class="playList__control">
										<div class="playList__thumb">
											<img src="${thumbnail}" alt="">
										</div>
										<div class="playList__controlBar">
											<div class="btn btn-toggle btn-random ${isRandom ? 'active' : ''}">
												<img src="assets/images/icon/random-icon.png" class="dark-icon"">
											</div>
											<div class="btn btn-prev">
												<img src="assets/images/icon/prev-icon.png" class="dark-icon"">
											</div>
											<div class="btn btn-play">
												<img src="assets/images/icon/play-icon.png" alt="play" class="dark-icon">
												<img src="assets/images/icon/pause-icon.png" alt="pause" class="dark-icon">
											</div>
											<div class="btn btn-next">
												<img src="assets/images/icon/next-icon.png" class="dark-icon">
											</div>
											<div class="btn btn-toggle btn-repeat ${isRepeat ? 'active' : ''}">
												<img src="assets/images/icon/repeat-icon.png" class="dark-icon">
											</div>
										</div>
									</div>
									<div class="playList__content">
										<div class="playList__heading">
											<div class="playList__title">
												${title}
											</div>
											<div class="playList__info">
												<div class="author">${author}</div>
												<div class="date">${date}</div>
												<div class="number_songs">${playList.songs.length} Songs</div>
											</div>
										</div>
										<div class="playList__songs">
											${songs}
										</div>
									</div>
								</div>
							`;
                return HTML;
            },

            searchItem(index, playList) {
                const { thumbnail, title, author, songs } = playList;
                const HTML = `
								<div class="item show" data-position="${index}">
									<div class="item__thumb">
										<img src="${thumbnail}" alt="">
									</div>
									<div class="item__info">
										<div class="info__title">${title}</div>
										<div class="info__author">${author}</div>
										<div class="info__number">${songs.length} Songs</div>
									</div>
								</div>
							`;
                return HTML;
            },

            notification({ time, author, content }) {
                const HTML = `
								<div class="notification">
									<div class="notification__heading">
										<span class="notification__title">
											MUSICPLAYER
										</span>
										<div class="notification__time">
											${time}
										</div>
									</div>
									<span class="notification__author">
										${author}
									</span>
									<p class="notification__content">${content}</p>
								</div>
							`;
                return HTML;
            },
        };

        function startAnimation() {
            $(window).on('load', () => {
                const timeLine = gsap.timeline();

                timeLine.to('#loading', {
                    opacity: 1,
                    duration: 1,
                });

                timeLine.to('#loading', {
                    opacity: 0,
                    display: 'none',
                    duration: 0.5,
                });

                timeLine.to('#app', {
                    opacity: 1,
                    duration: 1,
                });
            });
        }

        function handleData() {
            /* UPDATE DATA */
            const generaleData = JSON.parse(window.localStorage.getItem('generaleData'));
            const notificationData = JSON.parse(window.localStorage.getItem('notificationData'));
            const playlistData = JSON.parse(window.localStorage.getItem('playListData'));

            if (generaleData) {
                isMute = generaleData.isMute;
                isDarkMode = generaleData.isDarkMode;
                currentVolume = generaleData.currentVolume;
                playlistIndex = generaleData.playlistIndex;
            }

            if (notificationData) {
                notifications = { ...notificationData };
            }

            if (playlistData) {
                $.each(playlistData, (index, data) => {
                    playLists[index] = {
                        ...playLists[index],
                        ...JSON.parse(data),
                    };
                });
            }

            /* SAVE DATA */
            $(window).bind('beforeunload', function () {
                if (!isSaveData) return;

                const generaleSaveData = {
                    isMute,
                    isDarkMode,
                    playlistIndex,
                    currentVolume,
                };

                const playListSaveData = playLists.map(({ currentIndex, isRandom, isRepeat }) => {
                    const data = {
                        currentIndex,
                        isRandom,
                        isRepeat,
                    };

                    return JSON.stringify(data);
                });

                const notificationSaveData = [
                    {
                        time: 'now',
                        author: 'PhuongNguyen',
                        content: 'Welcome back',
                    },
                ];

                window.localStorage.setItem('generaleData', JSON.stringify(generaleSaveData));
                window.localStorage.setItem('playListData', JSON.stringify(playListSaveData));
                window.localStorage.setItem(
                    'notificationData',
                    JSON.stringify(notificationSaveData)
                );
            });
        }

        function render() {
            //render html
            $.each(playLists, (index, playList) => {
                const songsHTML = playList.songs
                    .map((song, indexSong) =>
                        HTML.song(playList.currentIndex, indexSong, song.name)
                    )
                    .join('');
                $slide.append(HTML.slide(playList, songsHTML));

                $searchBox.append(HTML.searchItem(index, playList));
            });

            $.each(notifications, (index, notification) =>
                $notificationsBox.append(HTML.notification(notification))
            );

            // render owlCarousel slide
            $slide.owlCarousel({
                center: true,
                items: 1,
                loop: false,
                margin: 150,
                autoWidth: true,
                dots: true,
                smartSpeed: 300,
                lazyLoad: true,
                startPosition: playlistIndex,
            });

            $('.owl-item', $slide).each(function (index) {
                $(this).attr('data-position', index);
            });
        }

        let $songs;
        let $playBtn;
        let $prevBtn;
        let $nextBtn;
        let $randomBtn;
        let $repeatBtn;
        let $btnToggle;

        function setUp() {
            // get elements after render
            $songs = $('.song');
            $playBtn = $('.btn-play');
            $prevBtn = $('.btn-prev');
            $nextBtn = $('.btn-next');
            $randomBtn = $('.btn-random');
            $repeatBtn = $('.btn-repeat');
            $btnToggle = $('.btn-toggle');

            // check dark mode
            if (isDarkMode) {
                $modeCheck.prop('checked', true);
                $('body').addClass('dark-mode');
            }

            // update audio progress
            handleAudio();
        }

        let $player;
        let currentPLayList;
        let playList;
        let $changePlayList;

        function config() {
            // update current playlist data
            $player = $('.owl-item.center');
            currentPLayList = $player.attr('data-position');
            playList = playLists[currentPLayList];
            playlistIndex = currentPLayList;

            $changePlayList = $('.owl-item,#search__box .item');

            loadCurrentSong();
        }

        function handleEvent() {
            // disable context menu
            $(document).on('contextmenu', (e) => e.preventDefault());

            // slide event
            $slide.on('translated.owl.carousel', () => {
                isPlay = false;
                $('.owl-item').removeClass('playing');
                config();
            });

            $changePlayList.click(function () {
                const isCurrentPlaylist = $(this).attr('data-position') === currentPLayList;
                if (isCurrentPlaylist) return;

                $slide.trigger('to.owl.carousel', $(this).attr('data-position'));
            });

            //normal event
            $settingsToggle.click(() => $settingsBox.toggleClass('active'));
            $('.settings .overlay').click(() => $settingsBox.removeClass('active'));

            $modeCheck.on('input', () => {
                isDarkMode = !isDarkMode;
                $('body').toggleClass('dark-mode');
            });

            $resetBtn.click(() => {
                const isConfirm = confirm('Are You Sure ?');
                if (!isConfirm) return;

                isSaveData = false;
                localStorage.clear();
                location.reload();
            });

            setTimeout(() => {
                $('.notification', $notificationsBox).each((index, notification) => {
                    index++;

                    $(notification).click(() => $(notification).removeClass('active').hide(150));

                    setTimeout(() => {
                        $(notification).addClass('active');
                        setTimeout(() => $(notification).click(), 15000);
                    }, 2000 * index);
                });
            }, 3000);

            //control player
            $audio.bind('timeupdate', () => {
                if (!$audio.get(0).duration) return;

                const currentTime = $audio.get(0).currentTime;
                const durationTime = $audio.get(0).duration;
                const progressPercent = Math.floor((currentTime / durationTime) * 100);

                $currentTime.text(customFunctions.formatTime(currentTime));
                $timeProgress.val(progressPercent);
                $timeProgress.css(
                    'background',
                    `linear-gradient(to right,#000,#000 ${progressPercent}%,${PROGRESS_COLOR} ${progressPercent}%)`
                );
            });

            $timeProgress.on('input', function () {
                seekTime = ($(this).val() / $(this).attr('max')) * $audio.get(0).duration;
                $audio.get(0).currentTime = seekTime;
            });

            $volumeProgress.on('input', function () {
                currentVolume = $(this).val() / $(this).attr('max');
                isMute = false;
                handleAudio();
            });

            $muteBtn.click(() => {
                isMute = !isMute;
                handleAudio();
            });

            $prevBtn.click(() => transferSong('prev'));
            $nextBtn.click(() => transferSong('next'));

            $songs.click(function () {
                playList.currentIndex = $(this).attr('index');
                loadCurrentSong();
            });

            $playBtn.click(() => {
                $audio.trigger(isPlay ? 'pause' : 'play');
                isPlay = !isPlay;
                $player.toggleClass('playing');
            });

            $btnToggle.click(function () {
                $(this).toggleClass('active');
            });

            $repeatBtn.click(() => (playList.isRepeat = !playList.isRepeat));
            $randomBtn.click(() => (playList.isRandom = !playList.isRandom));

            $audio.on('ended', () =>
                playList.isRepeat ? $audio.trigger('play') : transferSong('next')
            );

            $searchInput.on('keyup', function () {
                const searchValue = $(this).val().toLowerCase();

                $('.item', searchBox).removeClass('show');

                $('.info__title, .info__author', searchBox).filter(function () {
                    const text = $(this).text().toLowerCase();
                    const convertedText = customFunctions.normalizeText(text);

                    const isContainText =
                        text.indexOf(searchValue) > -1 || convertedText.indexOf(searchValue) > -1;

                    if (isContainText) {
                        $(this).closest('.item').addClass('show');
                    }
                });
            });
        }

        function loadCurrentSong() {
            const currentSongIndex = playList.currentIndex;
            const currentSong = playList.songs[currentSongIndex];

            playList.playedSongs.push(currentSongIndex);

            const isPlayedAllSongs = playList.playedSongs.length === playList.songs.length;
            if (isPlayedAllSongs) {
                playList.playedSongs = [currentSongIndex];
            }

            $('.song', $player).removeClass('active');
            $(`.song[index='${currentSongIndex}']`, $player).addClass('active');

            $audio.attr('src', currentSong.path);
            $audio.on('loadedmetadata', () => {
                const songDurationTime = customFunctions.formatTime($audio.get(0).duration);
                const $songDurationTime = $('.song.active .song__duration', $player);
                $songDurationTime.text(songDurationTime);
                $durationTime.text(songDurationTime);
                $currentTime.text('00 : 00');
            });

            $audio.trigger(isPlay ? 'play' : 'pause');
            customFunctions.scrollIntoView();
        }

        function transferSong(option) {
            if (playList.isRandom) {
                const numberSongs = playList.songs.length;
                let randomIndex;
                do {
                    randomIndex = Math.floor(Math.random() * numberSongs);
                } while (playList.playedSongs.includes(randomIndex));

                playList.currentIndex = randomIndex;
            } else {
                if (option === 'prev') {
                    playList.currentIndex--;

                    const isFirstSong = playList.currentIndex < 0;
                    if (isFirstSong) {
                        playList.currentIndex = playList.songs.length - 1;
                    }
                }
                if (option === 'next') {
                    playList.currentIndex++;

                    const isLastSong = playList.currentIndex >= playList.songs.length;
                    if (isLastSong) {
                        playList.currentIndex = 0;
                    }
                }
            }

            loadCurrentSong();
            customFunctions.scrollIntoView();
        }

        function handleAudio() {
            $audio.prop('volume', isMute ? 0 : currentVolume);
            $volumeProgress.val(currentVolume * 100);

            const value = $volumeProgress.val();
            const $iconMute = $('img', $muteBtn);
            let imgUrl = 100;

            if (value === 0 || isMute) {
                imgUrl = 0;
            } else if (value <= 50) {
                imgUrl = 50;
            }

            $iconMute.attr('src', `assets/images/icon/${imgUrl}-volume-icon.png`);
            $volumeProgress.css(
                'background',
                `linear-gradient(to right,#000,#000 ${value}%,${PROGRESS_COLOR} ${value}%)`
            );
        }

        const customFunctions = {
            scrollIntoView() {
                setTimeout(() => {
                    $('.song.active', $player).get(0).scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                    });
                }, 300);
            },
            formatTime(time) {
                let minutes = Math.floor(time / 60);
                let seconds = Math.floor(time % 60);

                minutes = minutes > 9 ? minutes : `0${minutes}`;
                seconds = seconds > 9 ? seconds : `0${seconds}`;

                return `${minutes} : ${seconds}`;
            },
            normalizeText(text) {
                return text
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/đ/g, 'd')
                    .replace(/Đ/g, 'D')
                    .toLowerCase();
            },
        };

        (function start() {
            startAnimation();
            handleData();
            render();
            setUp();
            config();
            handleEvent();
        })();
    })();
});
