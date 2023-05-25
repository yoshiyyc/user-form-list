import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import moment from "moment";

function Form() {
  const [date, setDate] = useState(new Date());

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      birthday: new Date(),
      native: true,
      gender: "",
      age: 0,
      address: "",
      agreement: false,
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (submitData) => {
    console.log(submitData);
    try {
      const res = await axios.post("http://localhost:3000/users", {
        id: Date.now(),
        ...submitData,
        birthday: date,
        age: calcAge(date),
      });
      console.log(res);
      navigate("/list");
    } catch (error) {
      console.log(error);
    }
  };

  const calcAge = (date) => {
    return moment().diff(date, "year");
  };

  return (
    <div>
      <h1 className="text-center mb-3">User Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row mb-3">
          <label htmlFor="name" className="col-sm-2 col-form-label">
            <span className="text-danger">*</span>Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              {...register("name", {
                required: "Required",
              })}
            />
            {errors.name && (
              <p className="text-danger">{errors.name.message}</p>
            )}
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="email" className="col-sm-2 col-form-label">
            <span className="text-danger">*</span>Email
          </label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              {...register("email", {
                required: "Required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-danger">{errors.email.message}</p>
            )}
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="phone" className="col-sm-2 col-form-label">
            <span className="text-danger">*</span>Phone Number
          </label>
          <div className="col-sm-10">
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              {...register("phone", {
                required: "Required",
                minLength: {
                  value: 6,
                  message: "Phone number must be at least 6 digits",
                },
                maxLength: {
                  value: 12,
                  message: "Phone number must be at most 12 digits",
                },
              })}
            />
            {errors.phone && (
              <p className="text-danger">{errors.phone.message}</p>
            )}
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="birthday" className="col-sm-2 col-form-label">
            <span className="text-danger">*</span>Birthday
          </label>
          <div className="col-sm-10">
            <input
              type="date"
              className="form-control"
              id="birthday"
              name="birthday"
              {...register("birthday", { required: "Required" })}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
            {errors.birthday && (
              <p className="text-danger">{errors.birthday.message}</p>
            )}
          </div>
        </div>
        <fieldset className="row mb-3">
          <legend className="col-form-label col-sm-2 pt-0">
            <span className="text-danger">*</span>Native
          </legend>
          <div className="col-sm-10 d-flex">
            <div className="form-check me-3">
              <input
                className="form-check-input"
                type="radio"
                name="native"
                id="isNative"
                value="true"
                {...register("native", { required: "Required" })}
              />
              <label className="form-check-label" htmlFor="isNative">
                Yes
              </label>
            </div>
            <div className="form-check me-3">
              <input
                className="form-check-input"
                type="radio"
                name="native"
                id="isNotNative"
                value="false"
                {...register("native", { required: "Required" })}
              />
              <label className="form-check-label" htmlFor="isNotNative">
                No
              </label>
            </div>
            {errors.native && (
              <p className="text-danger">{errors.native.message}</p>
            )}
          </div>
        </fieldset>
        <div className="row mb-3">
          <label htmlFor="email" className="col-sm-2 col-form-label">
            <span className="text-danger">*</span>Gender
          </label>
          <div className="col-sm-10">
            <select
              className="form-select"
              aria-label="Default select example"
              id="gender"
              name="gender"
              {...register("gender", { required: "Required" })}
            >
              <option value="" disabled>
                Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
            {errors.gender && (
              <p className="text-danger">{errors.gender.message}</p>
            )}
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="age" className="col-sm-2 col-form-label">
            Age
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              id="age"
              name="age"
              value={calcAge(date)}
              {...register("age")}
              disabled
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="address" className="col-sm-2 col-form-label">
            Address
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              {...register("address")}
            />
          </div>
        </div>
        <div className="form-check mt-5 mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="agreement"
            name="agreement"
            {...register("agreement", { required: "Required" })}
          />
          <label className="form-check-label" htmlFor="agreement">
            <span className="text-danger">*</span> I confirm that the
            information provided above is accurate.
            {errors.agreement && (
              <p className="text-danger">{errors.agreement.message}</p>
            )}
          </label>
        </div>
        <div className="d-flex mt-5">
          <button type="submit" className="btn btn-primary ms-auto mx-3">
            Submit
          </button>
          <button type="reset" className="btn btn-outline-secondary">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
