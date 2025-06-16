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

interface ImageProps {
  src: string;
  alt: string;
  isOpen?: boolean;
}

const Loading = () => {
  const { theme } = useTheme();

  return (
    <div className={styles.loading}>
      <Spinner
        animation="border"
        variant={theme == "dark" ? "light" : "dark"}
      />
    </div>
  );
};

const Image = ({ src, alt, isOpen }: ImageProps) => {
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
            title="Fechar imagem"
            tabIndex={1}
            className={styles.close_button}
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
    <h1 title="Título" aria-label="Título" className={styles.h1} style={style}>
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
        className={`${styles.suspense} ${open ? "" : styles.hidden}`}
        style={style}
      >
        {children}
      </p>
      {showButton && (
        <button
          onClick={() => setOpen(!open)}
          className={`${styles.suspense_button}`}
        >
          <span>{open ? "Ler menos" : "Ler mais"}</span>
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

const AudioPlayer = ({
  src,
  type,
  ariaLabelPrefix = "Áudio",
}: {
  src: string;
  type: string;
  ariaLabelPrefix?: string;
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sliderRef = useRef<HTMLInputElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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
      setIsPlaying(!isPlaying);
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
        <button aria-label={isPlaying ? `Pausar áudio ${ariaLabelPrefix}` : `Reproduzir áudio ${ariaLabelPrefix}`} onClick={handlePlayPause} className={styles.play_pause_button}>
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

        {/* <label htmlFor="audio-slider" className="sr-only">
          Ajustar progresso do áudio
        </label> */}

        <input
          ref={sliderRef}
          className={styles.slider}
          type="range"
          min="0"
          max={duration.toString()}
          step="0.1"
          value={currentTime}
          onChange={handleSliderChange}
          aria-label={`Barra de progresso do áudio ${ariaLabelPrefix}`}
        />
      </div>

    </div>
  );
};

const Share = () => {
  const [message, setMessage] = useState(false);

  const handleShareClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(window.location.href);
      setMessage(true);
      setTimeout(() => setMessage(false), 3000);
    } catch (err) {
      console.error("Falha ao copiar o link: ", err);
    }
  };

  return (
    <div className={styles.share_wrapper}>
      <button
        className={styles.button}
        title="Share"
        onClick={handleShareClick}
        type="button"
      >
        <ShareIcon className={styles.share} />
      </button>
      <span
        className={`${styles.copy_message} ${message ? "" : styles.hidden}`}
        role="alert"
      >
        Link copiado com sucesso!
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
  const { auth } = useAuth();

  const navigate = useNavigate();
  return (
    <div className={styles.error}>
      <ErrorImage className={styles.error_image} />
      <Mobile.Title
        style={{ fontSize: "var(--h1-size)", color: "var(--color-text)" }}
      >
        Ops, a galeria está vazia.
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
        {error}
      </p>
      {!home && (
        <Button onClick={() => navigate(auth ? "/admin/dashboard" : "/")}>
          Voltar
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
  const navigate = useNavigate();
  const { auth } = useAuth();
  return (
    <div className={styles.error}>
      <Error404Image className={styles.error_image} />
      <Mobile.Title
        style={{ fontSize: "var(--h1-size)", color: "var(--color-text)" }}
      >
        Ops, você se perdeu na exposição.{" "}
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
        {error}
      </p>
      {!home && (
        <Button onClick={() => navigate(auth ? "/admin/dashboard" : "/")}>
          Voltar
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
