import { Endpoints } from "@/enums/api/Endpoints.enum";
import Http from "@/utils/Http";
import { IAuth } from "@/interfaces/Auth/IAuth.interface";

export const AuthService = {
  /**
   * @param formData
   * @returns Userdata
   */
  Register: async (
    formData: IAuth.IFormData
  ): Promise<{ data: IAuth.IAuthRegisterResponse }> => {
    const result = await Http.POST(Endpoints.Register, { ...formData });
    return result;
  },

  /**
   *
   * @param formData
   * @returns
   */
  Login: async (
    formData: IAuth.IFormData
  ): Promise<{ data: IAuth.IAuthLoginResponse }> => {
    console.log(formData);

    const result = await Http.POST(Endpoints.Login, {
      email: formData.email,
      password: formData.password,
    });
    return result;
  },
};
