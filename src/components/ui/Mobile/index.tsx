import { PropsWithChildren, useEffect, useRef, useState } from "react";
import styles from "./Mobile.module.css";
import Spinner from "react-bootstrap/Spinner";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CloseIcon,
  Error404Image,
  ErrorImage,
  PauseIcon,
  PlayIcon,
  ShareIcon,
} from "../../../assets";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../../../features/Theme/ThemeProvider";
import Button from "../Button";
import { useAuth } from "../../../features/Admin/hooks/useAuth";
import { useTranslation } from "../../../features/Language/useTranslation";

interface ImageProps {
  src: string;
  alt: string;
  isOpen?: boolean;
  onClose?: () => void;
}

const Loading = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <div className={styles.loading} role="status" aria-live="polite">
      <Spinner
        animation="border"
        variant={theme == "dark" ? "light" : "dark"}
      />
      <span className="sr-only">{t('mobile.loading')}</span>
    </div>
  );
};

const Image = ({ src, alt, isOpen, onClose }: ImageProps) => {
  const { t } = useTranslation();

  return (
    <>
      <img
        className={`${styles.image} ${isOpen ? styles.expand : ""}`}
        src={src}
        alt={alt}
      />
      {isOpen && (
        <div className={styles.background}>
          <button
            title={t('mobile.closeImageTitle')}
            tabIndex={1}
            className={styles.close_button}
            onClick={onClose}
          >
            <CloseIcon className={styles.close} />
          </button>
        </div>
      )}
    </>
  );
};

const ImageDefault = ({ src, alt }: ImageProps) => {
  return <img className={`${styles.image_default}`} src={src} alt={alt} />;
};

const Container = ({ children }: PropsWithChildren) => {
  return <div className={styles.container}>{children}</div>;
};

const Author = ({ children }: PropsWithChildren) => {
  return <div className={styles.author}>{children}</div>;
};

const AuthorTitle = ({ children }: PropsWithChildren) => {
  return <h3 className={styles.author_title}>{children}</h3>;
};

const Title = ({
  children,
  style,
}: PropsWithChildren & { style?: React.CSSProperties }) => {
  return (
    <h1 className={styles.h1} style={style}>
      {children}
    </h1>
  );
};

const Title2 = ({ children }: PropsWithChildren) => {
  return <h2 className={styles.h2}>{children}</h2>;
};

const Subtitle = ({ children, ...props }: PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>) => {
  return <h2 className={styles.subtitle} {...props}>{children}</h2>;
};

const Description = ({ children }: PropsWithChildren) => {
  return (
    <p
      className={`${styles.suspense} ${styles.hidden}`}
      style={{ height: "auto" }}
    >
      {children}
    </p>
  );
};

const DescriptionWithLimit = ({
  children,
  style,
}: PropsWithChildren & { style?: React.CSSProperties }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (paragraphRef.current) {
      const isOverflowing =
        paragraphRef.current.scrollHeight > paragraphRef.current.offsetHeight;
      setShowButton(isOverflowing);
    }
  }, [children]);

  return (
    <>
      <p
        ref={paragraphRef}
        id="descricao"
        className={`${styles.suspense} ${open ? "" : styles.hidden}`}
        style={style}
      >
        {children}
      </p>
      {showButton && (
        <button
          onClick={() => setOpen(!open)}
          className={`${styles.suspense_button}`}
          aria-expanded={open}
          aria-controls="descricao"
        >
          <span>{open ? t('mobile.readLess') : t('mobile.readMore')}</span>
          {open ? (
            <ArrowUp className={styles.suspense_icon} />
          ) : (
            <ArrowDown className={styles.suspense_icon} />
          )}
        </button>
      )}
    </>
  );
};

const audioPlayers: HTMLAudioElement[] = [];

const AudioPlayer = ({
  src,
  type,
  ariaLabelPrefix = "Áudio",
}: {
  src: string;
  type: string;
  ariaLabelPrefix?: string;
}) => {
  const { t } = useTranslation();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sliderRef = useRef<HTMLInputElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audioPlayers.includes(audio)) {
      audioPlayers.push(audio);
    }

    const handlePlay = () => {
      audioPlayers.forEach((player) => {
        if (player !== audio && !player.paused) {
          player.pause();
        }
      });
      setIsPlaying(true);
    };

    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  useEffect(() => {
    if (sliderRef.current) {
      const progressPercent = (currentTime / duration) * 100 || 0;
      sliderRef.current.style.background = `linear-gradient(
        to right,
        var(--color-primary) ${progressPercent}%,
        var(--color-state) ${progressPercent}%
      )`;
    }
  }, [currentTime, duration]);

  return (
    <div className={styles.audio_player}>
      <audio
        ref={audioRef}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        src={src}
        typeof={type}
      ></audio>
      <div className={styles.controls}>
        <button
          aria-label={isPlaying
            ? t('mobile.audio.pauseAriaLabel', { prefix: ariaLabelPrefix })
            : t('mobile.audio.playAriaLabel', { prefix: ariaLabelPrefix })
          }
          onClick={handlePlayPause}
          className={styles.play_pause_button}
        >
          {isPlaying ? (
            <PauseIcon className={styles.play_pause_button_icon} />
          ) : (
            <PlayIcon className={styles.play_pause_button_icon} />
          )}
        </button>
        <span className={styles.time}>
          {Math.floor(currentTime / 60)}:
          {("0" + Math.floor(currentTime % 60)).slice(-2)}{" "}
        </span>

        <input
          ref={sliderRef}
          className={styles.slider}
          type="range"
          min="0"
          max={duration.toString()}
          step="0.1"
          value={currentTime}
          onChange={handleSliderChange}
          aria-label={t('mobile.audio.sliderAriaLabel', { prefix: ariaLabelPrefix })}
        />
      </div>
    </div>
  );
};

const Share = () => {
  const { t } = useTranslation();
  const [message, setMessage] = useState(false);

  const handleShareClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(window.location.href);
      setMessage(true);
      setTimeout(() => setMessage(false), 3000);
    } catch (err) {
      console.error(t('mobile.share.copyError'), err);
    }
  };

  return (
    <div className={styles.share_wrapper}>
      <button
        className={styles.button}
        title={t('mobile.share.buttonTitle')}
        onClick={handleShareClick}
        type="button"
      >
        <ShareIcon className={styles.share} />
      </button>
      <span
        className={`${styles.copy_message} ${message ? "" : styles.hidden}`}
        role="alert"
      >
        {t('mobile.share.copySuccess')}
      </span>
    </div>
  );
};

const Link = ({
  children,
  link,
  fontStyle,
  fontSize,
}: PropsWithChildren & {
  link: string;
  fontStyle: "base" | "primary";
  fontSize: "--font-size" | "--title-like-4";
}) => {
  return (
    <NavLink
      to={link}
      className={styles.link}
      style={{
        fontFamily: `var(--font-family-${fontStyle})`,
        fontSize: `var(${fontSize})`,
      }}
    >
      {children}
    </NavLink>
  );
};

const Redirect = ({ children, link }: PropsWithChildren & { link: string }) => {
  return (
    <NavLink to={link} className={styles.redirect}>
      {children}
      <ArrowRight className={styles.redirect_icon} />
    </NavLink>
  );
};

const CustomImage = ({
  src,
  alt,
  width,
  height,
  borderRadius,
}: {
  src: string;
  alt: string;
  width: string;
  height: string;
  borderRadius: string;
}) => {
  return (
    <img
      src={src}
      style={{ width: width, height: height, borderRadius: borderRadius }}
      alt={alt}
      className={`${styles.image_custom}`}
    />
  );
};

const Error = ({
  error = "Tivemos um probleminha técnico, tente novamente ou volte mais tarde...",
  home,
}: {
  error?: string;
  home?: boolean;
}) => {
  const { t } = useTranslation();
  const { auth } = useAuth();
  const navigate = useNavigate();

  return (
    <div className={styles.error} role="alert">
      <ErrorImage className={styles.error_image} />
      <Mobile.Title
        style={{ fontSize: "var(--h1-size)", color: "var(--color-text)" }}
      >
        {t('mobile.error.title')}
      </Mobile.Title>

      <p
        style={{
          width: "70%",
          textAlign: "center",
          fontFamily: "var(--font-family-base)",
          fontSize: "var(--h3-size)",
          fontWeight: "bold",
          color: "var(--color-text-gray)",
          marginBottom: "var(--spacing-5)",
        }}
      >
        {error === "Tivemos um probleminha técnico, tente novamente ou volte mais tarde..."
          ? t('mobile.error.defaultMessage')
          : error}
      </p>
      {!home && (
        <Button onClick={() => navigate(auth ? "/admin/dashboard" : "/")}>
          {t('mobile.error.backButton')}
        </Button>
      )}
    </div>
  );
};

const Error404 = ({
  error = "Não conseguimos encontrar a página que você está procurando...",
  home,
}: {
  error?: string;
  home?: boolean;
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { auth } = useAuth();

  return (
    <div className={styles.error}>
      <Error404Image className={styles.error_image} />
      <Mobile.Title
        style={{ fontSize: "var(--h1-size)", color: "var(--color-text)" }}
      >
        {t('mobile.error404.title')}
      </Mobile.Title>

      <p
        style={{
          width: "70%",
          textAlign: "center",
          fontFamily: "var(--font-family-base)",
          fontSize: "var(--h3-size)",
          fontWeight: "bold",
          color: "var(--color-text-gray)",
          marginBottom: "var(--spacing-5)",
        }}
      >
        {error === "Não conseguimos encontrar a página que você está procurando..."
          ? t('mobile.error404.defaultMessage')
          : error}
      </p>
      {!home && (
        <Button onClick={() => navigate(auth ? "/admin/dashboard" : "/")}>
          {t('mobile.error404.backButton')}
        </Button>
      )}
    </div>
  );
};

const Mobile = {
  Image,
  ImageDefault,
  Container,
  Title,
  Title2,
  Subtitle,
  AudioPlayer,
  Share,
  Link,
  Author,
  CustomImage,
  AuthorTitle,
  Description,
  DescriptionWithLimit,
  Redirect,
  Loading,
  Error,
  Error404,
};

export default Mobile;