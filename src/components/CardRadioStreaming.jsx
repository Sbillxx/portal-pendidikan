import { Card } from "flowbite-react";
import { memo, useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

const CardRadioStreaming = memo(({ data }) => {
    const { t } = useTranslation();
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [lottieAnimation, setLottieAnimation] = useState(null);

    const streamUrl = "https://c1.alhastream.com/listen/station_4/aac48";

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);

        return () => {
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
        };
    }, []);

    useEffect(() => {
        // Load Lottie animation
        const loadLottie = async () => {
            try {
                const animationData = await window.fs.readFile('play-stream.json', { encoding: 'utf8' });
                setLottieAnimation(JSON.parse(animationData));
            } catch (error) {
                console.error('Failed to load Lottie animation:', error);
            }
        };

        loadLottie();
    }, []);

    const togglePlay = async () => {
        const audio = audioRef.current;
        if (!audio) return;

        try {
            if (isPlaying) {
                audio.pause();
            } else {
                await audio.play();
            }
        } catch (error) {
            // Ignore interrupted play errors
            if (!error.message.includes('interrupted')) {
                console.error('Audio error:', error);
            }
        }
    };

    return (
        <Card className="max-w-sm w-full">
            <audio ref={audioRef} preload="none">
                <source src={streamUrl} type="audio/aac" />
                <source src={streamUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>

            <div className="flex items-center gap-2">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {data.platform}
                </h5>
                {isPlaying && lottieAnimation && (
                    <div className="w-8 h-8">
                        <lottie-player
                            src={`data:application/json,${encodeURIComponent(JSON.stringify(lottieAnimation))}`}
                            background="transparent"
                            speed="1"
                            loop
                            autoplay
                            style={{ width: '32px', height: '32px' }}
                        />
                    </div>
                )}
                {isPlaying && !lottieAnimation && (
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-700"></span>
                    </span>
                )}
            </div>

            <p className="font-normal text-gray-700 dark:text-gray-400">
                Streaming {data.platform} idrisiyyah
            </p>

            <button
                onClick={togglePlay}
                className={isPlaying ? 'card-ls-button-active' : 'card-ls-button'}
            >
                {isPlaying ? 'Pause' : 'Play'}
            </button>

            {/* Load Lottie Player Script */}
            <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
        </Card>
    );
});

export default CardRadioStreaming;