//Styles
import styles from "../../../Admin/pages/AdminDashboard/Dashboard.module.css";

// Components
import Back from "../../../../components/ui/Back";
import { Input } from "../../../../components/ui/Inputs";
import Upload from "../../../../components/ui/Inputs/Upload";
import Message from "../../../../components/ui/Feedback/Message";
import Item from "../../../../components/ui/Item";

// Hooks
import { FieldValue, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Utils
import { sendFormData } from "../../../../utils/sendFormData";
import AdminService from "../../api/AdminService";

//Types
import {
  ValidationError,
  ServerError,
  ServerUpdateResponse,
  ApiError,
} from "../../../../services/api/apiService";
import Mobile from "../../../../components/ui/Mobile";
import DeleteWithConfirmation from "../../../../components/ui/Inputs/Delete";
import { PPCABlackLogo, ProcultBlackLogo } from "../../../../assets";
import { Admin } from "../../types/Admin";
import { useAuth } from "../../hooks/useAuth";
import { Radio } from "../../../../components/ui/Inputs/Radio";

const schemaCommon = z.object({
  name: z.string().optional(),
  image: z
    .union([z.string(), z.instanceof(FileList).transform((list) => list[0])])
    .optional(),
  password: z.string().optional(),
});

const schemaSuper = z.object({
  name: z.string().optional(),
  image: z
    .union([z.string(), z.instanceof(FileList).transform((list) => list[0])])
    .optional(),
  password: z.string().optional(),
  accessLevel: z.enum(["1", "2"]).transform(Number).optional(),
});

const Edit = () => {
  const { currentAdmin } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [dataIsLoading, setdataIsLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const finalSchema =
    currentAdmin?.accessLevel == 1 ? schemaSuper : schemaCommon;
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isDirty, isSubmitting },
    setError,
  } = useForm({
    defaultValues: async () => {
      try {
        const admin = await AdminService.getById<Admin>(id || "");

        return {
          name: admin.name,
          image: admin.image.url,
          email: admin.email,
          password: "",
          accessLevel: admin.accessLevel.toString(),
        };
      } catch (error) {
        if (((error as ApiError).message = "Identificador inválido")) {
          setServerError(true);
        }
      } finally {
        setdataIsLoading(true);
      }
    },
    resolver: zodResolver(finalSchema),
  });

  const [message, setMessage] = useState<
    ServerError | ServerUpdateResponse | null
  >(null);

  const onSubmit = async (
    data: FieldValue<typeof finalSchema> & Record<string, any>
  ) => {
    const newData = Object.keys(dirtyFields).reduce(
      (acc: Record<string, any>, key) => {
        acc[key] = data[key as keyof typeof data];
        return acc;
      },
      {} as Record<string, any>
    );

    const formData = sendFormData(newData as FormData);

    const res = await AdminService.update(formData);

    if ((res as ServerError).errors) {
      (res as ServerError).errors.forEach((error: ValidationError) => {
        setError(error.field as keyof typeof finalSchema.shape, {
          message: error.message,
        });
      });
    } else {
      if (res as ServerUpdateResponse) {
        setMessage(res as ServerUpdateResponse);
        setTimeout(() => {
          navigate(`/admin`);
        }, 2000);
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!dataIsLoading) {
    return <Mobile.Loading />;
  }

  if (currentAdmin?.accessLevel == 2 && currentAdmin?._id != id) {
    navigate("/admin/profile");
  }

  if (serverError) {
    return <Mobile.Error404 />;
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <Back>Editar Administrador</Back>
      </header>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        <section style={{ width: "420px" }}>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <Upload>
              <Upload.Input
                accept="image/png, image/jpeg"
                fileType="image"
                label="Foto de Perfil"
                {...register("image")}
                helperText={errors.image?.message?.toString()}
                disabled={currentAdmin?._id !== id}
              />
            </Upload>
            <Input
              type="text"
              label={"Nome"}
              placeholder="Insira o nome do administrador"
              helperText={errors.name?.message?.toString()}
              {...register("name")}
              disabled={currentAdmin?._id !== id}
            />
            <Input
              type="email"
              label={"Email"}
              placeholder="Insira o email do novo administrador"
              helperText={errors.email?.message?.toString()}
              {...register("email")}
              disabled
            />
            <Input
              type="password"
              label={"Redefinir Senha"}
              placeholder="********"
              helperText={errors.password?.message?.toString()}
              {...register("password")}
              disabled={currentAdmin?._id !== id}
            />
            {currentAdmin?.accessLevel == 1 && (
              <>
                <Radio
                  first={true}
                  firstLabel="Nível de Acesso"
                  label="1 - Super Administrador"
                  value={1}
                  {...register("accessLevel")}
                  disabled={currentAdmin?._id !== id}
                />
                <Radio
                  first={false}
                  label="2 - Administrador Comum"
                  value={2}
                  {...register("accessLevel")}
                  disabled={currentAdmin?._id !== id}
                />{" "}
              </>
            )}
            {isDirty && currentAdmin?._id == id ? (
              <Input
                type="submit"
                value={isSubmitting ? "Salvando..." : "Salvar"}
                disabled={isSubmitting}
              />
            ) : (
              <Input
                type="submit"
                value="Salvar"
                disabled
                style={{
                  border: "none",
                  color: "var(--color-input)",
                  backgroundColor: "var(--color-state)",
                }}
              />
            )}
          </form>
          <Item.Container align="center" justify="center" marginTop="10px">
            {currentAdmin?.accessLevel == 1 && (
              <DeleteWithConfirmation
                id={id || ""}
                onDelete={() => AdminService.delete(id || "")}
                link="admin"
              />
            )}
          </Item.Container>
          <Item.Row width="100%" height="100px" align="center" justify="center">
            {message && <Message msg={message.message} type="success" />}
          </Item.Row>
        </section>
        <section
          style={{
            width: "420px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "50px",
            alignItems: "center",
            height: "600px",
          }}
        >
          <ProcultBlackLogo style={{ width: "70%", height: "40%" }} />
          <PPCABlackLogo style={{ width: "90%", height: "40%" }} />
        </section>
      </div>
    </div>
  );
};

export default Edit;
