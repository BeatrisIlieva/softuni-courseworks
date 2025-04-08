import { useState, useEffect } from "react";

export const Login = () => {
  //   const [email, setEmail] = useState("Email");
  // const [creditCard, setCreditCard] = useState("");
  //   const [occupation, setOccupation] = useState("engineering");
  //   const [gender, setGender] = useState("male");
  //   const [orderNotes, setOrderNotes] = useState("");
  //   const [password, setPassword] = useState("Password");
  //   const [repeatPassword, setRepeatPassword] = useState("repeatPassword");

//   const [age, setAge] = useState();
  const [hobbies, setHobbies] = useState({
    hiking: false,
    reading: false,
  });

  const [formValues, setFormValues] = useState({
    email: "beatris@icloud.com",
    creditCard: "",
    occupation: "Engineering",
    gender: "male",
    orderNotes: "",
    age: "",
  });
//   useEffect(() => {
//     setEmail("beatris@icloud.com");
//   }, []);

  const onChangeHandler = (e) => {
    
    setFormValues(state => ({...state, [e.target.name]: e.target.value}))
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };


//   const onAgeChange = (e) => {
//     setAge(e.target.value);
//   };

//   const onCreditCardChange = (e) => {
//     setCreditCard(e.target.value);
//   };

//   const onEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const onOccupationChange = (e) => {
//     setOccupation(e.target.value);
//   };

//   const onGenderChange = (e) => {
//     setGender(e.target.value);
//   };

//   const onOrderNotesChange = (e) => {
//     setOrderNotes(e.target.value);
//   };

  const onHobbiesChange = (e) => {
    console.log(e.target.value);
    setHobbies((state) => ({ ...state, [e.target.value]: e.target.checked }));
  };

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={formValues.email}
          onChange={onChangeHandler}
        />
      </form>
      <div>
        <label htmlFor="age">Age</label>
        <input
          type="number"
          name="age"
          id="age"
          value={formValues.age}
          onChange={onChangeHandler}
        />
      </div>
      {Number(formValues.age) >= 18 && (
        <div>
          <label htmlFor="credit-card">Credit Card</label>
          <input
            type="text"
            name="creditCard"
            id="credit-card"
            value={formValues.creditCard}
            onChange={onChangeHandler}
          />
        </div>
      )}

      <div>
        <label htmlFor="occupation">Occupation</label>
        <select
          name="occupation"
          id="occupation"
          value={formValues.occupation}
          onChange={onChangeHandler}
        >
          <option value="it">IT</option>
          <option value="engineering">Engineering</option>
        </select>
      </div>

      <div>
        <label htmlFor="male">Male</label>
        <input
          type="radio"
          name="gender"
          id="male"
          value="male"
          onChange={onChangeHandler}
          checked={formValues.gender === "male"}
        />
        <label htmlFor="female">Female</label>
        <input
          type="radio"
          name="gender"
          id="female"
          value="female"
          onChange={onChangeHandler}
          checked={formValues.gender === "female"}
        />
      </div>

      <div>
        <label htmlFor="order-notes">Order Notes</label>
        <textarea
          name="orderNotes"
          id="order-notes"
          cols="30"
          rows="10"
          value={formValues.orderNotes}
          onChange={onChangeHandler}
        ></textarea>
      </div>

      <div>
        <label>Hobbies</label>
        <label htmlFor="hiking">Hiking</label>
        <input
          type="checkbox"
          name="hiking"
          value="hiking"
          id="hiking"
          onChange={onHobbiesChange}
          checked={hobbies["hiking"]}
        />
        <label htmlFor="reading">Reading</label>
        <input
          type="checkbox"
          name="reading"
          value="reading"
          id="reading"
          onChange={onHobbiesChange}
          checked={hobbies["reading"]}
        />
      </div>

      <div>
        <input type="submit" value="Submit" />
      </div>
    </>
  );
};
