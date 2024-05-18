import formStyles from "../../../commonCSS/Form.module.css";
import buttonStyles from "../../../commonCSS/Button.module.css";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useService } from "../../../hooks/useService";
import { authServiceFactory } from "../../../services/authService";
import styles from "../UpdateEmail/UpdateEmail.module.css";
import { useFormAuthUser } from "../../../hooks/useFormAuthUser"



const FormKeys = {
  Email: "email",
  Password: "password",
};

export const UpdateEmail = () => {
  const {onUpdateEmailSubmit} = useContext(AuthContext);

  const { values, changeHandler, onFocusField, onBlurField, onSubmit } =
  useFormAuthUser(
    {
      [FormKeys.Email]: { value: "", focusField: false },
      [FormKeys.Password]: { value: "", focusField: false },
    },
    onUpdateEmailSubmit,
    FormKeys,
  );



  // const onBlurField = () => {
  //   setValues((prevValues) => {
  //     const updatedValues = { ...prevValues };
  //     for (let key in updatedValues) {
  //       updatedValues[key].focusField = true ? values[key].value : false;
  //     }

  //     return updatedValues;
  //   });
  // };

  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   const data = {
  //     [FormKeys.Email]: values[FormKeys.Email].value,
  //     [FormKeys.Password]: values[FormKeys.Password].value,
  //   };

  //   onUpdateEmailSubmit(userId, data);

  //   // await authService.updateEmail(userId, data);

  //   // fetchData();
  // };

  return (
    <form method="POST" onSubmit={onSubmit} className={styles["modal-dialog"]}>
      {values && (
        <div className={`${styles["modal-dialog"]} ${styles["slideIn"]}`}>
          <div className={`${formStyles["filed-container"]}`}>
            <div
              onClick={() => onFocusField("email")}
              onBlur={onBlurField}
              className={formStyles["input-field-container-name"]}
            >
              <p
                className={
                  values[FormKeys.Email]["focusField"]
                    ? formStyles["placeholder-on-blur"]
                    : formStyles["placeholder"]
                }
              >
                New Email Address *
              </p>
              {values[FormKeys.Email]["focusField"] && (
                <input
                  className={formStyles["input-spot"]}
                  type="text"
                  name={FormKeys.Email}
                  id="email"
                  value={values[FormKeys.Email].value}
                  onChange={(e) =>
                    changeHandler(FormKeys.Email, e.target.value)
                  }
                  autoFocus
                />
              )}
            </div>
          </div>
          <div className={`${formStyles["filed-container"]}`}>
            <div
              onClick={() => onFocusField("password")}
              onBlur={onBlurField}
              className={formStyles["input-field-container-name"]}
            >
              <p
                className={
                  values[FormKeys.Password]["focusField"]
                    ? formStyles["placeholder-on-blur"]
                    : formStyles["placeholder"]
                }
              >
                Password *
              </p>
              {values[FormKeys.Password]["focusField"] && (
                <input
                  className={`${formStyles["input-spot"]} ${styles["password-input"]}`}
                  type="password"
                  name={FormKeys.Password}
                  id="password"
                  value={values[FormKeys.Password].value}
                  onChange={(e) =>
                    changeHandler(FormKeys.Password, e.target.value)
                  }
                  autoFocus
                />
              )}
            </div>
          </div>
          <div>
            <input
              className={`${buttonStyles["button"]} ${styles["button"]} ${buttonStyles["pink"]} ${buttonStyles["hover"]}`}
              type="submit"
              value="Save"
              // onClick={() => fetchData()}
            />
          </div>
        </div>
      )}
    </form>
  );
};

// import formStyles from "../../../commonCSS/Form.module.css";
// import buttonStyles from "../../../commonCSS/Button.module.css";
// import { useContext } from "react";
// import { AuthContext } from "../../../contexts/AuthContext";
// import { useState, useEffect } from "react";
// import { useService } from "../../../hooks/useService";
// import { authServiceFactory } from "../../../services/authService";
// import styles from "../UpdateEmail/UpdateEmail.module.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faXmark } from "@fortawesome/free-solid-svg-icons";

// const FormKeys = {
//   Email: "email",
//   Password: "password",
// };

// export const UpdateEmail = ({ onUpdateEmailSubmit }) => {
//   const authService = useService(authServiceFactory);
//   const { userId } = useContext(AuthContext);

//   const [values, setValues] = useState({
//     [FormKeys.Email]: { value: "", focusField: false },
//     [FormKeys.Password]: { value: "", focusField: false },
//   });

//   useEffect(() => {
//     authService
//       .getOne(userId)
//       .then((dataFromServer) => {
//         const updatedValues = { ...values };
//         for (let key in FormKeys) {
//           updatedValues[FormKeys[key]] = {
//             value: dataFromServer[FormKeys[key]],
//             focusField: true ? dataFromServer[FormKeys[key]] : false,
//           };
//         }
//         setValues(updatedValues);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   const changeHandler = (fieldKey, newValue) => {
//     setValues((prevValues) => ({
//       ...prevValues,
//       [fieldKey]: { ...prevValues[fieldKey], value: newValue },
//     }));
//   };

//   const onFocusField = (fieldKey) => {
//     setValues((prevValues) => ({
//       ...prevValues,
//       [fieldKey]: { ...prevValues[fieldKey], focusField: true },
//     }));
//   };

//   const onBlurField = () => {
//     setValues((prevValues) => {
//       const updatedValues = { ...prevValues };
//       for (let key in updatedValues) {
//         updatedValues[key].focusField = true ? values[key].value : false;
//       }

//       return updatedValues;
//     });
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     const data = {
//       [FormKeys.Email]: values[FormKeys.Email].value,
//       [FormKeys.Password]: values[FormKeys.Password].value,
//     };

//     onUpdateEmailSubmit();

//     await authService.editEmail(userId, data);
//   };

//   return (
//     <form
//     method="POST"
//     onSubmit={onSubmit}
//     className={styles["modal-dialog"]}
//   >
//       {values && (
//         <div className={`${styles["modal-dialog"]} ${styles["slideIn"]}`}>
//           <div className={`${formStyles["filed-container"]}`}>
//             <div
//               onClick={() => onFocusField("email")}
//               onBlur={onBlurField}
//               className={formStyles["input-field-container-name"]}
//             >
//               <p
//                 className={
//                   values[FormKeys.Email]["focusField"]
//                     ? formStyles["placeholder-on-blur"]
//                     : formStyles["placeholder"]
//                 }
//               >
//                 New Email Address *
//               </p>
//               {values[FormKeys.Email]["focusField"] && (
//                 <input
//                   className={formStyles["input-spot"]}
//                   type="text"
//                   name={FormKeys.Email}
//                   id="email"
//                   value={values[FormKeys.Email].value}
//                   onChange={(e) =>
//                     changeHandler(FormKeys.Email, e.target.value)
//                   }
//                   autoFocus
//                 />
//               )}
//             </div>
//           </div>
//           <div className={`${formStyles["filed-container"]}`}>
//             <div
//               onClick={() => onFocusField("password")}
//               onBlur={onBlurField}
//               className={formStyles["input-field-container-name"]}
//             >
//               <p
//                 className={
//                   values[FormKeys.Password]["focusField"]
//                     ? formStyles["placeholder-on-blur"]
//                     : formStyles["placeholder"]
//                 }
//               >
//                 Password *
//               </p>
//               {values[FormKeys.Password]["focusField"] && (
//                 <input
//                   className={formStyles["input-spot"]}
//                   type="password"
//                   name={FormKeys.Password}
//                   id="password"
//                   value={values[FormKeys.Password].value}
//                   onChange={(e) =>
//                     changeHandler(FormKeys.Password, e.target.value)
//                   }
//                   autoFocus
//                 />
//               )}
//             </div>
//           </div>
//           <div>
//             <input
//               className={`${buttonStyles["button"]} ${buttonStyles["save"]} ${buttonStyles["pink"]} ${buttonStyles["hover"]}`}
//               type="submit"
//               value="Save"
//             />
//           </div>
//         </div>
//       )}
//     </form>
//   );
// };
