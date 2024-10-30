// CSs
import "../Profile/AdminProfile.css";

// hooks
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

// redux
import { useDispatch } from "react-redux";
import artWorkService from "../../../services/artWorkService";
import { resetMessage, updateArtWork } from "../../../slices/artWorkSlice";

// components
import Message from "../../../components/feedback/Message";
import { useArtWorks } from "../../../hooks/useArtWorks";
import { BsXLg } from "react-icons/bs";
import File from "../../../components/inputs/File";

// utils
import { arraysisEquals } from "../../../utils/validation";
import { sendFormData } from "../../../utils/sendData";

//zod
import { zodResolver } from "@hookform/resolvers/zod";
import { artWorkEditValidation } from "../../../utils/validations/artWorkValidation";
import { Spinner } from "@radix-ui/themes";
import errorMap from "zod/locales/en.js";

const ArtWorksEditTest = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { artWork, loading, error, message } = useArtWorks(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: () => {
      return artWorkService.getArtWorkDetails(id);
    },
    resolver: zodResolver(artWorkEditValidation),
  });

  const watchImage = watch("image");
  const watchAudioBr = watch("audioDesc.0");
  const watchAudioEn = watch("audioDesc.1");

  const onSubmit = (e) => {
    const data = {};
    const keys = Object.keys(artWork).filter((item) => {
      return e[item] !== artWork[item];
    });
    keys.forEach((item) => {
      data[item] = e[item];
    });
    
    if (arraysisEquals(data.audioDesc, artWork.audioDesc)) {
      delete data.audioDesc;
    }
    console.log(data)
    const newData = sendFormData(data);
    dispatch(updateArtWork({ newData, id }));

    // setTimeout(() => dispatch(resetMessage()), 4000);
  };
  console.log(errors);
  return (
    <div className="container">
      <div className="edit-profile">
        <h2>Edite os dados da obra</h2>
        <form className={"show"} onSubmit={handleSubmit(onSubmit)}>
          <label>
            <span className="subtitle">Imagem:</span>
            <File>
              <File.ImagePreview
                file={watchImage}
                alt={artWork.title}
                folder={"artworks"}
              />
              <File.Input
                accept="image/png, image/jpeg"
                {...register("image")}
              />
            </File>
          </label>
          <label>
            <File>
              <span className="subtitle">Audios:</span>
              <span>Audio br</span>
              <File.AudioPreview
                file={watchAudioBr}
                type={"br"}
                folder={"artworks"}
              />
              <File.Input accept="audio/mpeg" {...register("audioDesc.0")} />
              <span>Audio en</span>
              <File.AudioPreview
                file={watchAudioEn}
                type={"en"}
                folder={"artworks"}
              />
              <File.Input accept="audio/mpeg" {...register("audioDesc.1")} />
            </File>
          </label>
          <label>
            <File>
              <span className="subtitle">Audios:</span>
              <span>Audio br</span>
              <File.Input accept="audio/mpeg" {...register("audioGuia.0")} />
              <span>Audio en</span>
              <File.Input accept="audio/mpeg" {...register("audioGuia.1")} />
            </File>
          </label>
          <input
            type="text"
            placeholder="Título"
            defaultValue={artWork?.title || ""}
            {...register("title")}
          />
          <input
            type="text"
            placeholder="Descrição"
            {...register("description")}
          />
          <input type="text" placeholder="Autor" {...register("author")} />
          <input type="text" placeholder="Suporte" {...register("suport")} />
          <input
            type="text"
            placeholder="Insira as dimensões da data"
            {...register("dimension")}
          />
          <label htmlFor="year">
            <span>Insira o ano da obra:</span>
          </label>
          <input type="text" id="year" {...register("year")} />
          <label className="checkbox-label">
            <p>Arquivar:</p>
            <input
              className="checkbox"
              type="checkbox"
              {...register("archived")}
            />
          </label>

          {!loading && <input type="submit" value="Atualizar" />}
          {loading && <input type="submit" value="Aguarde..." disabled />}
          {error && <Message msg={error} type={"error"} />}
          {message && <Message msg={message} type={"success"} />}
        </form>
      </div>
    </div>
  );
};

export default ArtWorksEditTest;
