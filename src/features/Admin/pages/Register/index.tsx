// styles
import styles from "../../../Admin/pages/AdminDashboard/Dashboard.module.css";

// Components
import Back from "../../../../components/ui/Back";
import { Input } from "../../../../components/ui/Inputs";
import Upload from "../../../../components/ui/Inputs/Upload";
import Message from "../../../../components/ui/Feedback/Message";
import Item from "../../../../components/ui/Item";
import { PPCABlackLogo, ProcultBlackLogo } from "../../../../assets";
import { Radio } from "../../../../components/ui/Inputs/Radio";

// Hooks
import { FieldValue, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// utils
import { sendFormData } from "../../../../utils/sendFormData";
import AdminService from "../../api/AdminService";
import {
  ValidationError,
  ServerCreateResponse,
  ServerError,
} from "../../../../services/api/apiService";

const schema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    image: z.union([
      z.string(),
      z.instanceof(FileList).transform((list) => list[0]),
    ]),
    accessLevel: z.enum(["1", "2"]).transform(Number),
    password: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
      .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
      .regex(/[0-9]/, "A senha deve conter pelo menos um número")
      .regex(
        /[^a-zA-Z0-9]/,
        "A senha deve conter pelo menos um caractere especial"
      ),
    confirmPassword: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
      .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
      .regex(/[0-9]/, "A senha deve conter pelo menos um número")
      .regex(
        /[^a-zA-Z0-9]/,
        "A senha deve conter pelo menos um caractere especial"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    setError,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [message, setMessage] = useState<
    ServerError | ServerCreateResponse | null
  >(null);

  const navigate = useNavigate();

  const onSubmit = async (data: FieldValue<typeof schema>) => {
    const formData = sendFormData(data as FormData);

    const res = await AdminService.create(formData);

    if ((res as ServerError).errors) {
      (res as ServerError).errors.forEach((error: ValidationError) => {
        setError(error.field, {
          message: error.message,
        });
      });
    } else {
      if (res as ServerCreateResponse) {
        setMessage(res as ServerCreateResponse);
        setTimeout(() => {
          navigate(`/admin/profile`);
        }, 2000);
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <Back>Adicionar Administrador</Back>
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
                required
                label="Foto de Perfil"
                helperText={errors.image?.message?.toString()}
                {...register("image")}
              />
            </Upload>
            <Input
              type="text"
              label={"Nome"}
              required
              placeholder="Insira o nome do administrador"
              helperText={errors.name?.message?.toString()}
              {...register("name")}
            />
            <Input
              type="email"
              label={"Email"}
              required
              placeholder="Insira o email do novo administrador"
              helperText={errors.email?.message?.toString()}
              {...register("email")}
            />
            <Input
              type="password"
              label={"Crie sua senha"}
              required
              placeholder='Insira uma senha forte, por exemplo, "Ex@mple1234" '
              helperText={errors.password?.message?.toString()}
              {...register("password")}
            />
            <Input
              type="password"
              label={"Repita sua senha"}
              required
              helperText={errors.confirmPassword?.message?.toString()}
              {...register("confirmPassword")}
            />

            <Radio
              first={true}
              firstLabel="Nível de Acesso"
              label="1 - Super Administrador"
              value={1}
              required
              {...register("accessLevel")}
            />

            <Radio
              first={false}
              label="2 - Administrador Comum"
              defaultChecked
              value={2}
              {...register("accessLevel")}
            />

            {isDirty ? (
              <Input
                type="submit"
                value={isSubmitting ? "Criando..." : "Criar"}
                disabled={isSubmitting}
              />
            ) : (
              <Input
                type="submit"
                value="Criar"
                disabled
                style={{
                  border: "none",
                  color: "var(--color-input)",
                  backgroundColor: "var(--color-state)",
                }}
              />
            )}
            <Item.Row
              width="100%"
              height="100px"
              align="center"
              justify="center"
            >
              {message && <Message msg={message.message} type="success" />}
            </Item.Row>
          </form>
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

export default Register;
