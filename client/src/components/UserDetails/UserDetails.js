import styles from "../UserDetails/UserDetails.module.css";
import buttonStyles from "../../commonCSS/Button.module.css";
import colorStyles from "../../commonCSS/Colors.module.css";
import { profileServiceFactory } from "../../services/profileService";
import { UpdateAddressBookForm } from "./UpdateAddressBookForm/UpdateAddressBookForm";
import { UpdateEmailForm } from "./UpdateEmailForm/UpdateEmailForm";
import { UpdatePasswordForm } from "./UpdatePasswordForm/UpdatePasswordForm";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useService } from "../../hooks/useService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { faFileInvoiceDollar } from "@fortawesome/free-solid-svg-icons";
import { authServiceFactory } from "../../services/authService";
import { UpdateProfileForm } from "./UpdateProfileForm/UpdateProfileForm";

export const UserDetails = () => {
  const { userId } = useContext(AuthContext);
  const authService = useService(authServiceFactory);
  const profileService = useService(profileServiceFactory);
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    authService
      .getOne(userId)
      .then((dataFromServer) => {
        setUser(dataFromServer);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [user]);

  useEffect(() => {
    profileService
      .display(userId)
      .then((dataFromServer) => {
        setProfile(dataFromServer);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [profile]);

  const [showUpdateAddressBook, setShowUpdateAddressBook] = useState(false);

  const onUpdateAddressBookClick = async () => {
    document.body.style.overflow = "hidden";
    setShowUpdateAddressBook(true);
  };

  const onUpdateAddressBookSubmit = () => {
    document.body.style.overflow = "visible";
    setShowUpdateAddressBook(false);
  };

  const onCloseUpdateAddressBook = () => {
    document.body.style.overflow = "visible";
    setShowUpdateAddressBook(false);
  };

  const [showUpdateEmail, setShowUpdateEmail] = useState(false);

  const onUpdateEmailClick = async () => {
    setShowUpdateEmail(true);
    setShowUpdatePassword(false);
  };

  const [showUpdatePassword, setShowUpdatePassword] = useState(false);

  const onUpdatePasswordClick = async () => {
    setShowUpdatePassword(true);
    setShowUpdateEmail(false);
  };

  return (
    <section className={styles["user-details-box"]}>
      <h2 className={styles["title"]}>Hi, {profile.firstName}</h2>
      <p className={styles["subtitle"]}>
        You can access all your previous transactions, set default shipping
        addresses for faster checkout as well as save items to your wishlist for
        quick access.
      </p>
      <hr className={styles["horizontal-line"]} />
      <div className={styles["user-details-container"]}>
        <div className={styles["left-container"]}>
          <div className={styles["left-upper-sub-container"]}>
            <h3 className={styles["container-title"]}>Personal Information</h3>
            <UpdateProfileForm />
          </div>
          <div className={styles["left-bottom-sub-container"]}>
            <button
              className={buttonStyles["button"]}
              onClick={() => onUpdateAddressBookClick()}
            >
              <div className={styles["orders-button-container"]}>
                <FontAwesomeIcon
                  icon={faFileInvoiceDollar}
                  className={`${colorStyles["dark-pink"]} ${styles["address-icon"]}`}
                />
                <div>View Order History</div>
              </div>
            </button>
          </div>
        </div>
        <div className={styles["right-container"]}>
          <div className={styles["right-upper-sub-container"]}>
            <div className={styles["login-box"]}>
              <h3 className={styles["container-title-login"]}>
                Login Information
              </h3>
              <h5 className={styles["login-subtitle"]}>Email Address</h5>
              <p className={styles["login-email"]}>{user.email}</p>
              <button
                className={`${styles["update"]} ${buttonStyles["button"]}`}
                onClick={() => onUpdateEmailClick()}
              >
                Update Email Address
              </button>
              <button
                className={`${styles["update"]} ${buttonStyles["button"]}`}
                onClick={() => onUpdatePasswordClick()}
              >
                Change Password
              </button>
              {showUpdateEmail && <UpdateEmailForm />}
              {showUpdatePassword && <UpdatePasswordForm />}
              {showUpdateAddressBook && (
                <UpdateAddressBookForm
                  onCloseUpdateAddressBook={onCloseUpdateAddressBook}
                  onUpdateAddressBookSubmit={onUpdateAddressBookSubmit}
                />
              )}
            </div>
          </div>
          <div className={styles["right-bottom-sub-container"]}>
            <div className={styles["address-box"]}>
              <h3 className={styles["container-title-address"]}>
                Address Book
              </h3>
              <hr className={styles["horizontal-line-address"]} />
              {showUpdateAddressBook && (
                <UpdateAddressBookForm
                  onCloseUpdateAddressBook={onCloseUpdateAddressBook}
                  onUpdateAddressBookSubmit={onUpdateAddressBookSubmit}
                />
              )}
              <button
                className={buttonStyles["button"]}
                onClick={() => onUpdateAddressBookClick()}
              >
                <div className={styles["address-button-container"]}>
                  <FontAwesomeIcon
                    icon={faCirclePlus}
                    className={`${colorStyles["dark-pink"]} ${styles["address-icon"]}`}
                  />
                  <div>Add new address book</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
