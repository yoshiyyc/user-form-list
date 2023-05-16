import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

function Form() {
  const [data, setData] = useState({
    id: Date.now(),
    name: "",
    birthday: new Date().getTime(),
    native: true,
    age: 0,
    address: "",
  });

  const [date, setDate] = useState(new Date());
  const [age, setAge] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    id: "",
    name: "",
    birthday: "",
    native: true,
    age: 0,
    address: "",
  });

  const navigate = useNavigate();

  const getAge = (birthday) => {
    let today = new Date();
    let check = new Date(birthday);
    if (check > today) {
      return 0;
    } else {
      return today.getFullYear() - birthday.getFullYear();
    }
  };

  useEffect(() => {
    setAge(getAge(date));
  }, [date]);

  const onSubmit = async (inputData) => {
    try {
      const res = await axios.post("http://localhost:3000/users", {
        ...inputData,
        age: age,
        birthday: date.getTime(),
      });
      console.log(res);
      navigate("/list");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-center mb-3">User Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row mb-3">
          <label htmlFor="name" className="col-sm-2 col-form-label">
            *Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              defaultValue={data.name || ""}
              {...register("name", { required: true })}
            />
            {errors.name && <p className="text-danger">Required</p>}
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="birthday" className="col-sm-2 col-form-label">
            *Birthday
          </label>
          <div className="col-sm-10">
            <input
              type="date"
              className="form-control"
              id="birthday"
              name="birthday"
              defaultValue={`${date.getFullYear().toString()}-${(
                date.getMonth() + 1
              )
                .toString()
                .padStart(2, 0)}-${date.getDate().toString().padStart(2, 0)}`}
              {...register("birthday", { required: true })}
              onChange={(e) => {
                setDate(new Date(e.target.value));
              }}
            />
            {errors.birthday && <p className="text-danger">Required</p>}
          </div>
        </div>
        <fieldset className="row mb-3">
          <legend className="col-form-label col-sm-2 pt-0">*Native</legend>
          <div className="col-sm-10">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="native"
                id="isNative"
                value="true"
                {...register("native", { required: true })}
              />
              <label className="form-check-label" htmlFor="isNative">
                Yes
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="native"
                id="isNotNative"
                value="false"
                {...register("native", { required: true })}
              />
              <label className="form-check-label" htmlFor="isNotNative">
                No
              </label>
            </div>
            {errors.native && <p className="text-danger">Required</p>}
          </div>
        </fieldset>
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
              value={age}
              {...register("age")}
              disabled
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="address" className="col-sm-2 col-form-label">
            Addresss
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              defaultValue={data.address || ""}
              {...register("address")}
            />
          </div>
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
