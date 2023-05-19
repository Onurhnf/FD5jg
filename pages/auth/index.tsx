import { IAuth } from "@/interfaces/Auth/IAuth.interface";
import { AuthService } from "@/services/Auth/Auth.service";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import validator from "validator";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { login } from "@/store/UserSlice";

export default function AuthPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<Partial<IAuth.IFormData>>({});
  const [formData, setFormData] = useState<IAuth.IFormData>({
    name: "",
    email: "",
    password: "",
  });

  // useEffect(() => {
  //   let isAuthenticated = false;
  //   // Check if user is authenticated
  //   if (localStorage.getItem("pitonToken")) {
  //     isAuthenticated = true;
  //   }

  //   // Redirect to / page if authenticated
  //   if (isAuthenticated) {
  //     router.replace("/");
  //   }
  // }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Validate form data
    const { name, email, password } = formData;
    const errors: Partial<IAuth.IFormData> = {};

    if (!isLogin && validator.isEmpty(name ?? "")) {
      errors.name = "Name is required";
    }

    if (!validator.isEmail(email)) {
      errors.email = "Invalid email address";
    }

    if (validator.isEmpty(password)) {
      errors.password = "Password is required";
    } else if (!validator.isLength(password, { min: 6, max: 20 })) {
      errors.password = "Password must be 6-20 characters long";
    } else if (!validator.isAlphanumeric(password)) {
      errors.password = "Password must be alphanumeric";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      if (!isLogin) {
        const result = await AuthService.Register(formData);
        router.push("/");
        console.log(result);
      } else {
        const result = await AuthService.Login(formData);
        if (result.data.action_login.message === "") {
          if (remember) {
            localStorage.setItem("pitonToken", result.data.action_login.token);
          }
          dispatch(
            login({
              token: result.data.action_login.token,
              isLoggedIn: true,
            })
          );
          router.push("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row ">
      {/* Left Side (Image, visible on medium screens and above) */}
      <div className="hidden md:block h-screen md:w-1/2">
        <div className="relative h-full">
          <Image
            src="/login-image.svg"
            alt="Image"
            fill
            priority
            style={{ objectFit: "cover" }}
            className="object-contain"
          />
        </div>
      </div>

      {/* Right Side (Login/Register Form) */}
      <div className="w-full md:w-1/2 bg-white ">
        <div className="flex flex-col items-center justify-center h-screen ">
          <div className="mb-24">
            <Image
              src="/logo.svg"
              alt="Image"
              width={120}
              height={78}
              className="object-cover"
            />
          </div>
          <div className="mb-20 flex w-50 md:w-[400px]">
            <div className="w-full ">
              <h1 className="text-2xl font-semibold text-gray-400">
                Welcome back!
              </h1>
              <h2 className="text-3xl font-bold">Login to your account</h2>
            </div>
          </div>
          {!isLogin && (
            <div>
              <label className="w-50 md:w-[400px] h-[97px]  font-semibold text-20 ">
                Name
              </label>
              <div className="w-50 md:w-[400px] h-[60px]  bg-gray-400 rounded-md">
                <input
                  className={`bg-gray-100 appearance-none border-2 rounded w-full py-4 px-4 text-20 ${
                    errors.name
                      ? `border-red-500 focus:outline-none focus:bg-white focus:border-red-500`
                      : `border-gray-200 focus:outline-none focus:bg-white focus:border-MainPurple`
                  }`}
                  id="name"
                  type="name"
                  placeholder="john@mail.com"
                  value={formData.name}
                  name="name"
                  onChange={handleInputChange}
                />
                {errors?.name && <p className="text-red-500">{errors?.name}</p>}
              </div>
            </div>
          )}
          <div className="mt-10">
            <label className="w-50 md:w-[400px] h-[97px]  font-semibold text-20">
              E-mail
            </label>
            <div className="w-50 md:w-[400px] h-[60px]  bg-gray-400 rounded-md">
              <input
                className={`bg-gray-100 appearance-none border-2 rounded w-full py-4 px-4 text-20 ${
                  errors.email
                    ? `border-red-500 focus:outline-none focus:bg-white focus:border-red-500`
                    : `border-gray-200 focus:outline-none focus:bg-white focus:border-MainPurple`
                }`}
                id="email"
                type="email"
                placeholder="john@mail.com"
                value={formData.email}
                name="email"
                onChange={handleInputChange}
              />

              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
          </div>
          <div className="mt-10">
            <label className="w-50 md:w-[400px] h-[97px]  font-semibold text-20 ">
              Password
            </label>
            <div className="w-50 md:w-[400px] h-[60px]  bg-gray-400 rounded-md">
              <input
                type="password"
                className={`bg-gray-100 appearance-none border-2 rounded w-full py-4 px-4 text-20 ${
                  errors.password
                    ? `border-red-500 focus:outline-none focus:bg-white focus:border-red-500`
                    : `border-gray-200 focus:outline-none focus:bg-white focus:border-MainPurple`
                }`}
                placeholder="* * * * * *"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div>
              {errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
            </div>
            {isLogin && (
              <div>
                <label className={`text-MainPurple font-bold`}>
                  <input
                    onChange={() => setRemember(!remember)}
                    className={`mr-2 accent-MainPurple`}
                    type="checkbox"
                  />
                  <span className="text-sm">Remember me</span>
                </label>
              </div>
            )}
          </div>

          <div className="mt-10">
            <div className="mt-4">
              <button
                onClick={handleSubmit}
                className={`bg-MainOrange  hover:bg-opacity-90 text-white text-[24px] font-semibold  w-[300px] md:w-[400px] h-[60px] rounded-md`}
              >
                {isLogin ? "Login" : "Register"}
              </button>
            </div>

            <div className="mt-4">
              <button
                onClick={() => {
                  setIsLogin(!isLogin),
                    setFormData({
                      name: "",
                      email: "",
                      password: "",
                    });
                  setErrors({});
                }}
                className={`bg-transparent hover:bg-MainPurple text-MainPurple text-[24px] font-semibold hover:text-white w-[300px] md:w-[400px] h-[60px] border border-MainPurple hover:border-transparent rounded-md`}
              >
                {!isLogin ? "Login" : "Register"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
