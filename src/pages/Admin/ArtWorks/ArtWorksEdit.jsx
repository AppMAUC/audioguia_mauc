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
import AudioPlayer from 'react-h5-audio-player';
import { useArtWorks } from "../../../hooks/useArtWorks";
import { BsXLg } from "react-icons/bs";

// utils
import { uploads } from "../../../utils/config";
import { arraysisEquals } from "../../../utils/validation";
import { sendFormData } from "../../../utils/sendData"
import { addSuffixToFileName } from "../../../utils/formatFile";

//zod
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
    title: z.string().optional(),
    partialDesc: z.string().optional(),
    completeDesc: z.string().optional(),
    dimension: z.string().optional(),
    author: z.string().optional(),
    archived: z.boolean().optional(),
    year: z.string().optional(),
    suport: z.string().optional(),
    image: z.union([z.string(), z.instanceof(FileList).transform(list => list[0])]).optional(),
    audioDesc: z.array(z.union([
        z.string(),
        z.instanceof(FileList).transform((list, ctx) => {
            const file = list[0];
            const lang = ctx.path[1] === 0 ? 'br' : 'en'; // Determina o idioma baseado no índice
            return file ? addSuffixToFileName(file, lang) : '';
        })
    ])).optional()
});

const ArtWorksEdit = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { artWork, loading, error, message } = useArtWorks(id);

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: () => {
            return artWorkService.getArtWorkDetails(id);
        },
        resolver: zodResolver(schema)
    });

    const watchImage = watch('image');
    const watchAudioBr = watch('audioDesc.0');
    const watchAudioEn = watch('audioDesc.1');

    const previewImage = useMemo(() => {
        if (typeof (watchImage) == 'string') {
            return `${uploads}/images/artworks/${artWork.image}`
        }

        return URL.createObjectURL(new Blob(watchImage));
    }, [watchImage])

    const previewAudioBr = useMemo(() => {
        if (typeof (watchAudioBr) == 'string') {
            return `${uploads}/audios/artworks/${watchAudioBr.match(/\-(br|en)/)[1]}/${watchAudioBr}`;
        }

        return URL.createObjectURL(new Blob(watchAudioBr));
    }, [watchAudioBr]);

    const previewAudioEn = useMemo(() => {
        if (typeof (watchAudioEn) == 'string') {
            return `${uploads}/audios/artworks/${watchAudioEn.match(/\-(br|en)/)[1]}/${watchAudioEn}`;
        }
        return URL.createObjectURL(new Blob(watchAudioEn));
    }, [watchAudioEn]);

    const onSubmit = (e) => {
        const data = {};
        const keys = Object.keys(artWork).filter((item) => {
            return e[item] !== artWork[item]
        })
        keys.forEach(item => {
            data[item] = e[item];
        })

        if (arraysisEquals(data.audioDesc, artWork.audioDesc)) {
            delete data.audioDesc;
        }

        const newData = sendFormData(data)

        dispatch(updateArtWork({ newData, id }));

        setTimeout(() => dispatch(resetMessage()), 4000);
    }
    return (
        <div className="container">
            <div className='edit-profile'>
                <h2>Edite os dados da obra</h2>
                <form className={'show'} onSubmit={handleSubmit(onSubmit)}>
                    <label>
                        <span className="subtitle">Imagem:</span>
                        {previewImage &&
                            <img
                                className="profile-image"
                                src={
                                    previewImage
                                }
                                alt={artWork?.title}
                            />

                        }
                        <input type="file" accept="image/png, image/jpeg" {...register('image')} />
                    </label>
                    <label>
                        <span>Audios:</span>
                        {previewAudioBr && (
                            <AudioPlayer
                                src={previewAudioBr || ''}
                            />
                        )}
                        {previewAudioEn && (
                            <AudioPlayer
                                src={previewAudioEn || ''}
                            />
                        )}
                        <span>Audio br</span>
                        <input type="file" accept="audio/mpeg" {...register('audioDesc.0')} />
                        <span>Audio en</span>
                        <input type="file" accept="audio/mpeg" {...register('audioDesc.1')} />
                    </label>
                    <input
                        type="text"
                        placeholder='Título'
                        defaultValue={artWork?.title || ''}
                        {...register('title')}
                    />
                    <input
                        type="text"
                        placeholder='Descrição Parcial'
                        {...register('partialDesc')}
                    />
                    <input
                        type="text"
                        placeholder='Descrição Completa'
                        {...register('completeDesc')}
                    />
                    <input
                        type="text"
                        placeholder='Autor'
                        {...register('author')}
                    />
                    <input
                        type="text"
                        placeholder='Suporte'
                        {...register('suport')}
                    />
                    <input
                        type="text"
                        placeholder='Insira as dimensões da data'
                        {...register('dimension')}
                    />
                    <label htmlFor="year">
                        <span>Insira o ano da obra:</span>
                    </label>
                    <input
                        type="text"
                        id="year"
                        {...register('year')}
                    />
                    <label className="checkbox-label">
                        <p>Arquivar:</p>
                        <input
                            className="checkbox"
                            type="checkbox"
                            {...register('archived')}
                        />
                    </label>

                    {!loading && <input type="submit" value="Atualizar" />}
                    {loading && <input type="submit" value="Aguarde..." disabled />}
                    {error && <Message msg={error} type={"error"} />}
                    {message && <Message msg={message} type={"success"} />}
                </form>
                {/* <BsXLg onClick={(e) => handleDelete(e, deleteArtWork, resetMessage, '/admin/artworks', id)} /> */}
            </div>
        </div>
    );
};

export default ArtWorksEdit;