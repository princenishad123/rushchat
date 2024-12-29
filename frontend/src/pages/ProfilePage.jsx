import React, { useState } from "react";
import { IoIosCamera } from "react-icons/io";
import { useAuthStore } from "../store/useAuthCheck";
const ProfilePage = () => {
  const { authUser, uploadImage } = useAuthStore();
  const [image, setImage] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      let base64image = reader.result;
      setSelectedImage(base64image);
    };
  };

  const handleImageUpload = async (e) => {
    await uploadImage({ profilePic: selectedImage });
  };
  return (
    <div className="max-w-lg mx-auto space-y-6 rounded-xl md:shadow-lg min-h-96 py-1 px-6">
      <div className="w-full h-auto content-center">
        <div className="w-20 h-20 overflow-hidden rounded-full mx-auto relative border-2 border-indigo-700 p-1">
          <img
            src={
              selectedImage ||
              authUser?.profilePic ||
              "https://cdn-icons-png.freepik.com/512/219/219988.png"
            }
            alt="profile"
            className="w-full rounded-full"
          />

          <label
            htmlFor="selectImage"
            className="absolute bottom-1 right-1 cursor-pointer "
          >
            <IoIosCamera size={25} />
          </label>
          <input
            type="file"
            accept=".png,.jpg,.jpeg"
            id="selectImage"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
        <p className="text-green-600 mx-auto text-center my-1">Active</p>

        <div className="w-full flex justify-center">
          <button
            onClick={handleImageUpload}
            className="py-1 px-3 bg-gray-100 font-semibold text-sm rounded-full mx-auto"
          >
            Update Profile Image
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Account information</h2>

        <div className="mt-1">
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Full Name</span>
            </div>
            <input
              type="text"
              placeholder="Name"
              defaultValue={authUser?.fullname}
              className="input input-bordered w-full "
              readOnly
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="text"
              placeholder="Email"
              className="input input-bordered w-full "
              defaultValue={authUser?.email}
              readOnly
            />
          </label>

          <button className="py-2 px-4 w-full bg-red-100 rounded-md my-4  transition-all text-red-700 font-semibold">
            Log out
          </button>

          <h2 className="text-red-700 font-semibold">Danger Zone</h2>
          <button className="py-2 px-4 w-full bg-red-100 rounded-md my-4 hover:bg-red-700 hover:text-white transition-all text-red-700 font-semibold">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
